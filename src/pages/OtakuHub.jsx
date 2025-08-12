import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import ViewToggle from '@components/molecules/ViewToggle'
import HeroCarousel from '@components/organisms/HeroCarousel'
import ContentRow from '@components/organisms/ContentRow'
import VisualMediaModal from '@components/organisms/VisualMediaModal'
import { text } from '@constants/language'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import { exportBooksToExcel } from '@utils/exportUtils'
import { setLoading, setError } from '@features/otakuHub/otakuHubSlice'
import './OtakuHub.css'

const OtakuHub = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { loading } = useSelector(state => state.otakuHub)
  
  const [anime, setAnime] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedAnime, setSelectedAnime] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('view')

  // Field configuration for the modal
  const modalFields = [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'Enter anime title...' },
    { key: 'verse', label: 'Verse/Type', type: 'text', placeholder: 'e.g., Anime, Manhwa, Western...' },
    { key: 'season', label: 'Season', type: 'text', placeholder: 'e.g., Season 1, Complete Series...' },
    { key: 'genres', label: 'Genres', type: 'genres', placeholder: 'Action, Fantasy, Comedy (comma separated)' },
    { key: 'language', label: 'Language', type: 'text', placeholder: 'Japanese, English, etc.' },
    { key: 'start_date', label: 'Start Date', type: 'text', placeholder: 'MM/YY format' },
    { key: 'end_date', label: 'End Date', type: 'text', placeholder: 'MM/YY format' },
    { key: 'star_rating', label: 'Star Rating', type: 'number', placeholder: '1-5', min: 1, max: 5 },
    { key: 'watch_download_link', label: 'Watch/Download Link', type: 'text', placeholder: 'https://...' },
    { key: 'poster_image_url', label: 'Poster Image URL', type: 'text', placeholder: 'https://...' },
    { key: 'comment', label: 'Comment', type: 'textarea', placeholder: 'Your thoughts...' }
  ]

  // Get user ID based on role
  const getUserId = () => {
    if (isSuperAdmin()) {
      return null // Super admin can see all records
    }
    if (isOwner() && user?.id) {
      return user.id
    }
    if (isGuest) {
      // For guests, show owner's public records
      return null // Placeholder for owner's UUID
    }
    return user?.id
  }

  // Fetch anime from database
  const fetchAnime = async () => {
    dispatch(setLoading(true))
    try {
      let query = supabase.from('otaku_hub').select('*')

      if (isSuperAdmin()) {
        console.log('Fetching all anime for super admin')
      } else if (isOwner() && user?.id) {
        query = query.eq('user_id', user.id)
        console.log('Fetching anime for owner:', user.id)
      } else if (isGuest) {
        console.log('Fetching public anime for guest')
        // TODO: Replace with actual owner's UUID
        // query = query.eq('user_id', 'owner-uuid-here')
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching anime:', error)
        dispatch(setError(error.message))
      } else {
        setAnime(data || [])
      }
    } catch (error) {
      console.error('Error fetching anime:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [user, isGuest])

  // Filter anime based on search
  const filteredAnime = anime.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (show.verse && show.verse.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (show.genres && show.genres.some(genre => 
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  )

  // Group anime by categories for content rows
  const getAnimeByGenre = (genre) => {
    return filteredAnime.filter(show => 
      show.genres && show.genres.includes(genre)
    ).slice(0, 10)
  }

  const getAnimeByVerse = (verse) => {
    return filteredAnime.filter(show => 
      show.verse && show.verse.toLowerCase().includes(verse.toLowerCase())
    ).slice(0, 10)
  }

  const getAnimeByComment = (comment) => {
    return filteredAnime.filter(show => 
      show.comment && show.comment.toLowerCase().includes(comment.toLowerCase())
    ).slice(0, 10)
  }

  const getFeaturedAnime = () => {
    return filteredAnime
      .filter(show => show.star_rating >= 3)
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 5)
  }

  const getRecentAnime = () => {
    return filteredAnime
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
  }

  // Handle anime interactions
  const handleAnimeClick = (show) => {
    setSelectedAnime(show)
    setModalMode('view')
    setShowModal(true)
  }

  const handlePlayAnime = (show) => {
    if (show.watch_download_link) {
      window.open(show.watch_download_link, '_blank')
    }
  }

  const handleAddAnime = () => {
    setSelectedAnime(null)
    setModalMode('add')
    setShowModal(true)
  }

  const handleModalSave = async (formData, mode) => {
    try {
      if (mode === 'add') {
        const { data, error } = await supabase
          .from('otaku_hub')
          .insert([{ ...formData, user_id: user?.id }])
          .select()

        if (error) throw error
        setAnime(prev => [data[0], ...prev])
      } else {
        const { data, error } = await supabase
          .from('otaku_hub')
          .update(formData)
          .eq('id', selectedAnime.id)
          .select()

        if (error) throw error
        setAnime(prev => prev.map(show => 
          show.id === selectedAnime.id ? data[0] : show
        ))
      }
      return true
    } catch (error) {
      console.error('Error saving anime:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleModalDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('otaku_hub')
        .delete()
        .eq('id', id)

      if (error) throw error
      setAnime(prev => prev.filter(show => show.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting anime:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleExport = () => {
    if (filteredAnime.length === 0) return
    
    const exportData = filteredAnime.map(show => ({
      Title: show.title,
      Verse: show.verse || '',
      Season: show.season || '',
      Genres: show.genres ? show.genres.join(', ') : '',
      Language: show.language || '',
      'Start Date': show.start_date || '',
      'End Date': show.end_date || '',
      'Star Rating': show.star_rating || '',
      'Watch Link': show.watch_download_link || '',
      Comment: show.comment || ''
    }))
    
    exportBooksToExcel(exportData, 'otaku-hub-export')
  }

  const handleViewChange = (newViewMode) => {
    setViewMode(newViewMode)
  }

  // Content rows data
  const contentRows = [
    {
      title: 'Featured Anime',
      items: getFeaturedAnime()
    },
    {
      title: 'Recently Added',
      items: getRecentAnime()
    },
    {
      title: 'Highly Rated ⭐',
      items: getAnimeByComment('good')
    },
    {
      title: 'Shounen Adventures',
      items: getAnimeByGenre('Action')
    },
    {
      title: 'Fantasy Worlds',
      items: getAnimeByGenre('Fantasy')
    },
    {
      title: 'Western Animation',
      items: getAnimeByVerse('Western')
    },
    {
      title: 'Isekai & Magic',
      items: getAnimeByGenre('Isekai')
    },
    {
      title: 'Supernatural Powers',
      items: getAnimeByGenre('Supernatural')
    }
  ].filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="otaku-hub-page">
        <div className="otaku-hub-loading">
          <div className="loading-spinner"></div>
          <p>Loading your anime collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="otaku-hub-page">
      {/* Hero Section */}
      <HeroCarousel
        items={getFeaturedAnime()}
        onPlay={handlePlayAnime}
        onInfo={handleAnimeClick}
        onAdd={(show) => console.log('Add to list:', show)}
      />

      {/* Controls */}
      <div className="otaku-hub-controls">
        <div className="otaku-hub-controls__left">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search anime, genres, or series..."
            className="otaku-hub-search"
          />
          
          <ViewToggle
            currentView={viewMode}
            onViewChange={handleViewChange}
          />
        </div>

        <div className="otaku-hub-controls__right">
          <motion.button
            className="otaku-hub-action otaku-hub-action--add"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddAnime}
            title="Add Anime"
          >
            <Icon name="plus" size={20} />
          </motion.button>

          <motion.button
            className="otaku-hub-action otaku-hub-action--upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Bulk upload')}
            title="Bulk Upload"
          >
            <Icon name="upload" size={20} />
          </motion.button>

          <motion.button
            className="otaku-hub-action otaku-hub-action--export"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            disabled={filteredAnime.length === 0}
            title="Export to Excel"
          >
            <Icon name="file-excel" size={20} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="otaku-hub-content">
          {filteredAnime.length === 0 ? (
            <div className="otaku-hub-empty">
              <Icon name="play" size={64} />
              <h3>No anime found</h3>
              <p>Start building your otaku collection!</p>
            </div>
          ) : searchQuery ? (
            // When searching, show results without categories
            <ContentRow
              title={`Search Results for "${searchQuery}"`}
              items={filteredAnime.slice(0, 20)} // Limit search results
              onItemClick={handleAnimeClick}
              itemType="poster"
            />
          ) : (
            // When not searching, show organized content rows
            contentRows.map((row, index) => (
              <ContentRow
                key={index}
                title={row.title}
                items={row.items}
                onItemClick={handleAnimeClick}
                itemType="poster"
              />
            ))
          )}
        </div>
      ) : (
        <div className="otaku-hub-list">
          {/* TODO: Implement list view similar to Bookworm */}
          <p>List view coming soon...</p>
        </div>
      )}

      {/* Modal */}
      <VisualMediaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedAnime}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
        initialMode={modalMode}
        fields={modalFields}
        title="Anime"
      />
    </div>
  )
}

export default OtakuHub 