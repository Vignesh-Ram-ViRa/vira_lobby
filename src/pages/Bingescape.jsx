import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import ViewToggle from '@components/molecules/ViewToggle'
import HeroCarousel from '@components/organisms/HeroCarousel'
import ContentRow from '@components/organisms/ContentRow'
import { HobbyTable } from '@components/organisms/HobbyTable'
import VisualMediaModal from '@components/organisms/VisualMediaModal'
import { setSeries, addSeries, updateSeries, removeSeries, setLoading, setError } from '@features/bingescape/bingescapeSlice'
import { text } from '@constants/language'
import { exportToExcel } from '@utils/exportUtils'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import './Bingescape.css'

const Bingescape = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { series, loading, error } = useSelector(state => state.bingescape)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedShow, setSelectedShow] = useState(null)
  const [modalMode, setModalMode] = useState('view') // 'view', 'add', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch shows from database
  const fetchShows = async () => {
    if (!user && !isGuest) return
    
    dispatch(setLoading(true))
    try {
      let query = supabase.from('bingescape').select('*')
      
      // Apply user-specific filtering based on role
      if (isSuperAdmin()) {
        // Super admin sees all records
        console.log('Fetching all shows for super admin')
      } else if (isOwner() && user?.id) {
        // Owner sees only their records
        query = query.eq('user_id', user.id)
        console.log('Fetching shows for owner:', user.id)
      } else if (isGuest) {
        // Guests see owner's public records
        query = query.eq('user_id', 'OWNER_USER_ID_HERE') // Replace with actual owner UUID
        console.log('Fetching public shows for guest')
      } else {
        query = query.eq('user_id', user?.id)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      
      dispatch(setSeries(data || []))
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

  // Filter shows based on search term
  const filteredShows = series.filter(show =>
    show.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.verse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.genres?.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Remove duplicates for search results
  const deduplicatedShows = searchTerm 
    ? filteredShows.filter((show, index, self) => 
        index === self.findIndex(s => s.id === show.id)
      )
    : filteredShows

  const handleShowClick = (show) => {
    setSelectedShow(show)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleAddShow = () => {
    setSelectedShow(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleEditShow = (show) => {
    setSelectedShow(show)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleSaveShow = async (showData) => {
    try {
      dispatch(setLoading(true))
      
      if (modalMode === 'add') {
        const { data, error } = await supabase
          .from('bingescape')
          .insert([{ ...showData, user_id: user?.id }])
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(addSeries(data[0]))
      } else if (modalMode === 'edit') {
        const { data, error } = await supabase
          .from('bingescape')
          .update(showData)
          .eq('id', selectedShow.id)
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(updateSeries(data[0]))
      }
      
      setIsModalOpen(false)
      setSelectedShow(null)
    } catch (error) {
      console.error('Error saving show:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteShow = async (showId) => {
    try {
      dispatch(setLoading(true))
      
      const { error } = await supabase
        .from('bingescape')
        .delete()
        .eq('id', showId)
      
      if (error) throw error
      
      dispatch(removeSeries(showId))
      setIsModalOpen(false)
      setSelectedShow(null)
    } catch (error) {
      console.error('Error deleting show:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleExport = () => {
    exportToExcel(filteredShows, 'bingescape_data')
  }

  const handleAction = (show, action) => {
    switch (action) {
      case 'view':
        handleShowClick(show)
        break
      case 'edit':
        handleEditShow(show)
        break
      default:
        break
    }
  }

  // Table columns configuration
  const tableColumns = [
    {
      field: 'poster_image_url',
      label: 'Poster',
      type: 'image',
      sortable: false,
      width: '80px'
    },
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

  // Group shows for grid view display
  const featuredShows = deduplicatedShows
    .filter(show => show.star_rating >= 3) // Lowered from 4 to 3 to be more inclusive
    .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
    .slice(0, 10)

  const recentShows = deduplicatedShows
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)

  // For hero carousel - use featured items if available, otherwise use recent items
  const heroItems = featuredShows.length > 0 ? featuredShows : recentShows

  const topGenres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Fantasy', 'Sci-Fi']
  const genreRows = topGenres.map(genre => ({
    title: genre,
    items: deduplicatedShows
      .filter(show => show.genres?.includes(genre))
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 10)
  })).filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="bingescape-loading">
        <Icon name="loading" size={48} />
        <p>Loading shows...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bingescape-error">
        <Icon name="warning" size={48} />
        <p>Error loading shows: {error}</p>
      </div>
    )
  }

  return (
    <div className="bingescape-page">
      {/* Page Title */}
      <div className="bingescape-header">
        <div className="bingescape-title">
          <h1>{text.categories.bingescape.title}</h1>
          <p>{text.categories.bingescape.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="bingescape-content">
        {viewMode === 'grid' ? (
          searchTerm ? (
            /* Search Results */
            <div className="bingescape-search-results">
              <div className="bingescape-controls">
                <div className="bingescape-controls__left">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search shows, series, documentaries..."
                    className="bingescape-search"
                  />
                </div>
                
                <div className="bingescape-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="bingescape-action bingescape-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="bingescape-action bingescape-action--add"
                    onClick={handleAddShow}
                    title="Add Show"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="bingescape-action bingescape-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>
              
              <h2>Search Results ({deduplicatedShows.length})</h2>
              <ContentRow
                title="Results"
                items={deduplicatedShows}
                onItemClick={handleShowClick}
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
                  onPlay={handleShowClick}
                  onInfo={handleShowClick}
                  onAdd={() => handleAddShow()}
                />
              )}

              {/* Actions Bar - Below Hero Carousel */}
              <div className="bingescape-controls">
                <div className="bingescape-controls__left">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search shows, series, documentaries..."
                    className="bingescape-search"
                  />
                </div>
                
                <div className="bingescape-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="bingescape-action bingescape-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="bingescape-action bingescape-action--add"
                    onClick={handleAddShow}
                    title="Add Show"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="bingescape-action bingescape-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>

              {/* Content Rows */}
              <div className="bingescape-rows">
                {recentShows.length > 0 && (
                  <ContentRow
                    title="Recently Added"
                    items={recentShows}
                    onItemClick={handleShowClick}
                  />
                )}

                {featuredShows.length > 0 && (
                  <ContentRow
                    title="Highly Rated"
                    items={featuredShows}
                    onItemClick={handleShowClick}
                  />
                )}

                {genreRows.map((row) => (
                  <ContentRow
                    key={row.title}
                    title={row.title}
                    items={row.items}
                    onItemClick={handleShowClick}
                  />
                ))}
              </div>
            </>
          )
        ) : (
          /* Table View */
          <>
            <div className="bingescape-controls">
              <div className="bingescape-controls__left">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search shows, series, documentaries..."
                  className="bingescape-search"
                />
              </div>
              
              <div className="bingescape-controls__right">
                <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                
                <button
                  className="bingescape-action bingescape-action--upload"
                  onClick={() => {/* TODO: Implement bulk upload */}}
                  title="Bulk Upload"
                >
                  <Icon name="upload" size={20} />
                </button>
                
                <button
                  className="bingescape-action bingescape-action--add"
                  onClick={handleAddShow}
                  title="Add Show"
                >
                  <Icon name="plus" size={20} />
                </button>

                <button
                  className="bingescape-action bingescape-action--export"
                  onClick={handleExport}
                  title="Export to Excel"
                >
                  <Icon name="file-excel" size={20} />
                </button>
              </div>
            </div>
            
            <div className="bingescape-table-container">
              <HobbyTable
                items={deduplicatedShows}
                columns={tableColumns}
                onItemClick={handleShowClick}
                onAction={handleAction}
                emptyMessage="No shows found"
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
        item={selectedShow}
        onSave={handleSaveShow}
        onDelete={handleDeleteShow}
        type="show"
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'verse', label: 'Universe/Franchise', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
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

export default Bingescape 