import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import ViewToggle from '@components/molecules/ViewToggle'
import HeroCarousel from '@components/organisms/HeroCarousel'
import ContentRow from '@components/organisms/ContentRow'
import { HobbyTable } from '@components/organisms/HobbyTable'
import VisualMediaModal from '@components/organisms/VisualMediaModal'
import { setAnime, addAnime, updateAnime, removeAnime, setLoading, setError } from '@features/otakuHub/otakuHubSlice'
import { text } from '@constants/language'
import { exportToExcel } from '@utils/exportUtils'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import './OtakuHub.css'

const OtakuHub = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { anime, loading, error } = useSelector(state => state.otakuHub)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedAnime, setSelectedAnime] = useState(null)
  const [modalMode, setModalMode] = useState('view') // 'view', 'add', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch anime from database
  const fetchAnime = async () => {
    if (!user && !isGuest) return
    
    dispatch(setLoading(true))
    try {
      let query = supabase.from('otaku_hub').select('*')
      
      // Apply user-specific filtering based on role
      if (isSuperAdmin()) {
        // Super admin sees all records
        console.log('Fetching all anime for super admin')
      } else if (isOwner() && user?.id) {
        // Owner sees only their records
        query = query.eq('user_id', user.id)
        console.log('Fetching anime for owner:', user.id)
      } else if (isGuest) {
        // Guests see owner's public records
        query = query.eq('user_id', 'OWNER_USER_ID_HERE') // Replace with actual owner UUID
        console.log('Fetching public anime for guest')
      } else {
        query = query.eq('user_id', user?.id)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      
      dispatch(setAnime(data || []))
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

  // Filter anime based on search term
  const filteredAnime = anime.filter(show =>
    show.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.verse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.genres?.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Remove duplicates for search results
  const deduplicatedAnime = searchTerm 
    ? filteredAnime.filter((show, index, self) => 
        index === self.findIndex(s => s.id === show.id)
      )
    : filteredAnime

  const handleAnimeClick = (show) => {
    setSelectedAnime(show)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleAddAnime = () => {
    setSelectedAnime(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleEditAnime = (show) => {
    setSelectedAnime(show)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleSaveAnime = async (animeData) => {
    try {
      dispatch(setLoading(true))
      
      if (modalMode === 'add') {
        const { data, error } = await supabase
          .from('otaku_hub')
          .insert([{ ...animeData, user_id: user?.id }])
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(addAnime(data[0]))
      } else if (modalMode === 'edit') {
        const { data, error } = await supabase
          .from('otaku_hub')
          .update(animeData)
          .eq('id', selectedAnime.id)
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(updateAnime(data[0]))
      }
      
      setIsModalOpen(false)
      setSelectedAnime(null)
    } catch (error) {
      console.error('Error saving anime:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteAnime = async (animeId) => {
    try {
      dispatch(setLoading(true))
      
      const { error } = await supabase
        .from('otaku_hub')
        .delete()
        .eq('id', animeId)
      
      if (error) throw error
      
      dispatch(removeAnime(animeId))
      setIsModalOpen(false)
      setSelectedAnime(null)
    } catch (error) {
      console.error('Error deleting anime:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleExport = () => {
    exportToExcel(filteredAnime, 'otaku_hub_data')
  }

  const handleAction = (show, action) => {
    switch (action) {
      case 'view':
        handleAnimeClick(show)
        break
      case 'edit':
        handleEditAnime(show)
        break
      default:
        break
    }
  }

  // Table columns configuration
  const tableColumns = [
    {
      field: 'title',
      label: 'Title',
      type: 'text',
      sortable: true,
      width: 'auto'
    },
    {
      field: 'verse',
      label: 'Universe',
      type: 'text',
      sortable: true,
      width: '150px'
    },
    {
      field: 'genres',
      label: 'Genres',
      type: 'genres',
      sortable: false,
      width: '180px'
    },
    {
      field: 'season',
      label: 'Season',
      type: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'star_rating',
      label: 'Rating',
      type: 'rating',
      sortable: true,
      width: '120px'
    },
    {
      field: 'created_at',
      label: 'Added',
      type: 'date',
      sortable: true,
      width: '120px'
    },
    {
      field: 'actions',
      label: 'Actions',
      type: 'actions',
      sortable: false,
      width: '120px'
    }
  ]

  // Group anime for grid view display
  const featuredAnime = deduplicatedAnime
    .filter(show => show.star_rating >= 3) // Lowered from 4 to 3 to be more inclusive
    .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
    .slice(0, 10)

  const recentAnime = deduplicatedAnime
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)

  // For hero carousel - use featured items if available, otherwise use recent items
  const heroItems = featuredAnime.length > 0 ? featuredAnime : recentAnime

  const topGenres = ['Action', 'Drama', 'Comedy', 'Romance', 'Fantasy', 'Slice of Life']
  const genreRows = topGenres.map(genre => ({
    title: genre,
    items: deduplicatedAnime
      .filter(show => show.genres?.includes(genre))
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 10)
  })).filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="otaku-hub-loading">
        <Icon name="loading" size={48} />
        <p>Loading anime...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="otaku-hub-error">
        <Icon name="warning" size={48} />
        <p>Error loading anime: {error}</p>
      </div>
    )
  }

  return (
    <div className="otaku-hub-page">
      {/* Page Title */}
      <div className="otaku-hub-header">
        <div className="otaku-hub-title">
          <h1>{text.categories.otakuHub.title}</h1>
          <p>{text.categories.otakuHub.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="otaku-hub-content">
        {viewMode === 'grid' ? (
          searchTerm ? (
            /* Search Results */
            <div className="otaku-hub-search-results">
              <div className="otaku-hub-controls">
                <div className="otaku-hub-controls__left">
                  <SearchBar
                    searchQuery={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search anime, manga, studios..."
                    className="otaku-hub-search"
                  />
                </div>
                
                <div className="otaku-hub-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="otaku-hub-action otaku-hub-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="otaku-hub-action otaku-hub-action--add"
                    onClick={handleAddAnime}
                    title="Add Anime"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="otaku-hub-action otaku-hub-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>
              
              <h2>Search Results ({deduplicatedAnime.length})</h2>
              <ContentRow
                title="Results"
                items={deduplicatedAnime}
                onItemClick={handleAnimeClick}
                showTitle={false}
              />
            </div>
          ) : (
            /* Regular Grid View */
            <>
              {/* Hero Carousel */}
              {heroItems.length > 0 && (
                <HeroCarousel
                  items={heroItems.slice(0, 5)}
                  onPlay={handleAnimeClick}
                  onInfo={handleAnimeClick}
                  onAdd={() => handleAddAnime()}
                />
              )}

              {/* Actions Bar - Below Hero Carousel */}
              <div className="otaku-hub-controls">
                <div className="otaku-hub-controls__left">
                  <SearchBar
                    searchQuery={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search anime, manga, studios..."
                    className="otaku-hub-search"
                  />
                </div>
                
                <div className="otaku-hub-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="otaku-hub-action otaku-hub-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="otaku-hub-action otaku-hub-action--add"
                    onClick={handleAddAnime}
                    title="Add Anime"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="otaku-hub-action otaku-hub-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>

              {/* Content Rows */}
              <div className="otaku-hub-rows">
                {recentAnime.length > 0 && (
                  <ContentRow
                    title="Recently Added"
                    items={recentAnime}
                    onItemClick={handleAnimeClick}
                  />
                )}

                {featuredAnime.length > 0 && (
                  <ContentRow
                    title="Top Rated"
                    items={featuredAnime}
                    onItemClick={handleAnimeClick}
                  />
                )}

                {genreRows.map((row) => (
                  <ContentRow
                    key={row.title}
                    title={row.title}
                    items={row.items}
                    onItemClick={handleAnimeClick}
                  />
                ))}
              </div>
            </>
          )
        ) : (
          /* Table View */
          <>
            <div className="otaku-hub-controls">
              <div className="otaku-hub-controls__left">
                <SearchBar
                  searchQuery={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search anime, manga, studios..."
                  className="otaku-hub-search"
                />
              </div>
              
              <div className="otaku-hub-controls__right">
                <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                
                <button
                  className="otaku-hub-action otaku-hub-action--upload"
                  onClick={() => {/* TODO: Implement bulk upload */}}
                  title="Bulk Upload"
                >
                  <Icon name="upload" size={20} />
                </button>
                
                <button
                  className="otaku-hub-action otaku-hub-action--add"
                  onClick={handleAddAnime}
                  title="Add Anime"
                >
                  <Icon name="plus" size={20} />
                </button>

                <button
                  className="otaku-hub-action otaku-hub-action--export"
                  onClick={handleExport}
                  title="Export to Excel"
                >
                  <Icon name="file-excel" size={20} />
                </button>
              </div>
            </div>
            
            <div className="otaku-hub-table-container">
              <HobbyTable
                items={deduplicatedAnime}
                columns={tableColumns}
                onItemClick={handleAnimeClick}
                onAction={handleAction}
                emptyMessage="No anime found"
                emptyIcon="play"
              />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <VisualMediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        item={selectedAnime}
        onSave={handleSaveAnime}
        onDelete={handleDeleteAnime}
        type="anime"
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'verse', label: 'Universe/Series', type: 'text' },
          { name: 'season', label: 'Season', type: 'text' },
          { name: 'genres', label: 'Genres', type: 'tags' },
          { name: 'language', label: 'Language', type: 'text' },
          { name: 'start_date', label: 'Start Date', type: 'month' },
          { name: 'end_date', label: 'End Date', type: 'month' },
          { name: 'star_rating', label: 'Rating', type: 'rating' },
          { name: 'watch_download_link', label: 'Watch/Download Link', type: 'url' },
          { name: 'poster_image_url', label: 'Poster Image', type: 'image' },
          { name: 'comment', label: 'Comments', type: 'textarea' }
        ]}
      />
    </div>
  )
}

export default OtakuHub 