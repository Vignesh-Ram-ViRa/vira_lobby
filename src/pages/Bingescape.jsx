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
import { setLoading, setError } from '@features/bingescape/bingescapeSlice'
import './Bingescape.css'

const Bingescape = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { loading } = useSelector(state => state.bingescape)
  
  const [shows, setShows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedShow, setSelectedShow] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('view')

  // Field configuration for the modal
  const modalFields = [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'Enter title...' },
    { key: 'verse', label: 'Verse/Universe', type: 'text', placeholder: 'e.g., Marvel, DC, Standalone...' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description...' },
    { key: 'season', label: 'Season', type: 'text', placeholder: 'e.g., Season 1, Complete Series...' },
    { key: 'genres', label: 'Genres', type: 'genres', placeholder: 'Action, Drama, Comedy (comma separated)' },
    { key: 'language', label: 'Language', type: 'text', placeholder: 'English, Spanish, etc.' },
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

  // Fetch shows from database
  const fetchShows = async () => {
    dispatch(setLoading(true))
    try {
      let query = supabase.from('bingescape').select('*')

      if (isSuperAdmin()) {
        console.log('Fetching all shows for super admin')
      } else if (isOwner() && user?.id) {
        query = query.eq('user_id', user.id)
        console.log('Fetching shows for owner:', user.id)
      } else if (isGuest) {
        console.log('Fetching public shows for guest')
        // TODO: Replace with actual owner's UUID
        // query = query.eq('user_id', 'owner-uuid-here')
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching shows:', error)
        dispatch(setError(error.message))
      } else {
        setShows(data || [])
      }
    } catch (error) {
      console.error('Error fetching shows:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchShows()
  }, [user, isGuest])

  // Filter shows based on search
  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (show.verse && show.verse.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (show.description && show.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (show.genres && show.genres.some(genre => 
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  )

  // Group shows by categories for content rows
  const getShowsByGenre = (genre) => {
    return filteredShows.filter(show => 
      show.genres && show.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    ).slice(0, 10)
  }

  const getShowsByVerse = (verse) => {
    return filteredShows.filter(show => 
      show.verse && show.verse.toLowerCase().includes(verse.toLowerCase())
    ).slice(0, 10)
  }

  const getFeaturedShows = () => {
    return filteredShows
      .filter(show => show.star_rating >= 3)
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 5)
  }

  const getRecentShows = () => {
    return filteredShows
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
  }

  // Handle show interactions
  const handleShowClick = (show) => {
    setSelectedShow(show)
    setModalMode('view')
    setShowModal(true)
  }

  const handlePlayShow = (show) => {
    if (show.watch_download_link) {
      window.open(show.watch_download_link, '_blank')
    }
  }

  const handleAddShow = () => {
    setSelectedShow(null)
    setModalMode('add')
    setShowModal(true)
  }

  const handleModalSave = async (formData, mode) => {
    try {
      if (mode === 'add') {
        const { data, error } = await supabase
          .from('bingescape')
          .insert([{ ...formData, user_id: user?.id }])
          .select()

        if (error) throw error
        setShows(prev => [data[0], ...prev])
      } else {
        const { data, error } = await supabase
          .from('bingescape')
          .update(formData)
          .eq('id', selectedShow.id)
          .select()

        if (error) throw error
        setShows(prev => prev.map(show => 
          show.id === selectedShow.id ? data[0] : show
        ))
      }
      return true
    } catch (error) {
      console.error('Error saving show:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleModalDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('bingescape')
        .delete()
        .eq('id', id)

      if (error) throw error
      setShows(prev => prev.filter(show => show.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting show:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleExport = () => {
    if (filteredShows.length === 0) return
    
    const exportData = filteredShows.map(show => ({
      Title: show.title,
      Verse: show.verse || '',
      Description: show.description || '',
      Season: show.season || '',
      Genres: show.genres ? show.genres.join(', ') : '',
      Language: show.language || '',
      'Start Date': show.start_date || '',
      'End Date': show.end_date || '',
      'Star Rating': show.star_rating || '',
      'Watch Link': show.watch_download_link || '',
      Comment: show.comment || ''
    }))
    
    exportBooksToExcel(exportData, 'bingescape-export')
  }

  const handleViewChange = (newViewMode) => {
    setViewMode(newViewMode)
  }

  // Content rows data
  const contentRows = [
    {
      title: 'Featured Shows',
      items: getFeaturedShows()
    },
    {
      title: 'Recently Added',
      items: getRecentShows()
    },
    {
      title: 'Crime & Mystery',
      items: getShowsByGenre('Crime')
    },
    {
      title: 'Fantasy Adventures',
      items: getShowsByGenre('Fantasy')
    },
    {
      title: 'Marvel Universe',
      items: getShowsByVerse('Marvel')
    },
    {
      title: 'Comedy Series',
      items: getShowsByGenre('Comedy')
    }
  ].filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="bingescape-page">
        <div className="bingescape-loading">
          <div className="loading-spinner"></div>
          <p>Loading your shows...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bingescape-page">
      {/* Hero Section */}
      <HeroCarousel
        items={getFeaturedShows()}
        onPlay={handlePlayShow}
        onInfo={handleShowClick}
        onAdd={(show) => console.log('Add to list:', show)}
      />

      {/* Controls */}
      <div className="bingescape-controls">
        <div className="bingescape-controls__left">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search shows, genres, or series..."
            className="bingescape-search"
          />
          
          <ViewToggle
            currentView={viewMode}
            onViewChange={handleViewChange}
          />
        </div>

        <div className="bingescape-controls__right">
          <motion.button
            className="bingescape-action bingescape-action--add"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddShow}
            title="Add Show"
          >
            <Icon name="plus" size={20} />
          </motion.button>

          <motion.button
            className="bingescape-action bingescape-action--upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Bulk upload')}
            title="Bulk Upload"
          >
            <Icon name="upload" size={16} />
          </motion.button>

          <motion.button
            className="bingescape-action bingescape-action--export"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            disabled={filteredShows.length === 0}
            title="Export to Excel"
          >
            <Icon name="file-excel" size={16} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="bingescape-content">
          {filteredShows.length === 0 ? (
            <div className="bingescape-empty">
              <Icon name="play" size={64} />
              <h3>No shows found</h3>
              <p>Start building your binge-watching collection!</p>
            </div>
          ) : searchQuery ? (
            // When searching, show results without categories
            <ContentRow
              title={`Search Results for "${searchQuery}"`}
              items={filteredShows.slice(0, 20)} // Limit search results
              onItemClick={handleShowClick}
              itemType="poster"
            />
          ) : (
            // When not searching, show organized content rows
            contentRows.map((row, index) => (
              <ContentRow
                key={index}
                title={row.title}
                items={row.items}
                onItemClick={handleShowClick}
                itemType="poster"
              />
            ))
          )}
        </div>
      ) : (
        <div className="bingescape-list">
          {/* TODO: Implement list view similar to Bookworm */}
          <p>List view coming soon...</p>
        </div>
      )}

      {/* Modal */}
      <VisualMediaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedShow}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
        initialMode={modalMode}
        fields={modalFields}
        title="Show"
      />
    </div>
  )
}

export default Bingescape 