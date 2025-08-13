import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import ViewToggle from '@components/molecules/ViewToggle'
import HeroCarousel from '@components/organisms/HeroCarousel'
import ContentRow from '@components/organisms/ContentRow'
import { HobbyTable } from '@components/organisms/HobbyTable'
import VisualMediaModal from '@components/organisms/VisualMediaModal'
import { setMovies, addMovie, updateMovie, removeMovie, setLoading, setError } from '@features/filmFrenzy/filmFrenzySlice'
import { text } from '@constants/language'
import { exportToExcel } from '@utils/exportUtils'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import './FilmFrenzy.css'

const FilmFrenzy = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { movies, loading, error } = useSelector(state => state.filmFrenzy)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [modalMode, setModalMode] = useState('view') // 'view', 'add', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch movies from database
  const fetchMovies = async () => {
    if (!user && !isGuest) return
    
    dispatch(setLoading(true))
    try {
      let query = supabase.from('film_frenzy').select('*')
      
      // Apply user-specific filtering based on role
      if (isSuperAdmin()) {
        // Super admin sees all records
        console.log('Fetching all movies for super admin')
      } else if (isOwner() && user?.id) {
        // Owner sees only their records
        query = query.eq('user_id', user.id)
        console.log('Fetching movies for owner:', user.id)
      } else if (isGuest) {
        // Guests see owner's public records
        query = query.eq('user_id', 'OWNER_USER_ID_HERE') // Replace with actual owner UUID
        console.log('Fetching public movies for guest')
      } else {
        query = query.eq('user_id', user?.id)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      
      dispatch(setMovies(data || []))
    } catch (error) {
      console.error('Error fetching movies:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [user, isGuest])

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.verse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.part?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genres?.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Remove duplicates for search results
  const deduplicatedMovies = searchTerm 
    ? filteredMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      )
    : filteredMovies

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleAddMovie = () => {
    setSelectedMovie(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleSaveMovie = async (movieData) => {
    try {
      dispatch(setLoading(true))
      
      if (modalMode === 'add') {
        const { data, error } = await supabase
          .from('film_frenzy')
          .insert([{ ...movieData, user_id: user?.id }])
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(addMovie(data[0]))
      } else if (modalMode === 'edit') {
        const { data, error } = await supabase
          .from('film_frenzy')
          .update(movieData)
          .eq('id', selectedMovie.id)
          .select()
        
        if (error) throw error
        if (data?.[0]) dispatch(updateMovie(data[0]))
      }
      
      setIsModalOpen(false)
      setSelectedMovie(null)
    } catch (error) {
      console.error('Error saving movie:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteMovie = async (movieId) => {
    try {
      dispatch(setLoading(true))
      
      const { error } = await supabase
        .from('film_frenzy')
        .delete()
        .eq('id', movieId)
      
      if (error) throw error
      
      dispatch(removeMovie(movieId))
      setIsModalOpen(false)
      setSelectedMovie(null)
    } catch (error) {
      console.error('Error deleting movie:', error)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleExport = () => {
    exportToExcel(filteredMovies, 'film_frenzy_data')
  }

  const handleAction = (movie, action) => {
    switch (action) {
      case 'view':
        handleMovieClick(movie)
        break
      case 'edit':
        handleEditMovie(movie)
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
      field: 'imdb_rating',
      label: 'IMDB',
      type: 'text',
      sortable: true,
      width: '80px'
    },
    {
      field: 'star_rating',
      label: 'Rating',
      type: 'rating',
      sortable: true,
      width: '120px'
    },
    {
      field: 'date',
      label: 'Released',
      type: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'actions',
      label: 'Actions',
      type: 'actions',
      sortable: false,
      width: '120px'
    }
  ]

  // Group movies for grid view display
  const topRatedMovies = deduplicatedMovies
    .filter(movie => (movie.imdb_rating && movie.imdb_rating >= 7) || (movie.star_rating && movie.star_rating >= 3)) // More inclusive criteria
    .sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0))
    .slice(0, 10)

  const recentMovies = deduplicatedMovies
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)

  // For hero carousel - use featured items if available, otherwise use recent items
  const heroItems = topRatedMovies.length > 0 ? topRatedMovies : recentMovies

  const topGenres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror']
  const genreRows = topGenres.map(genre => ({
    title: genre,
    items: deduplicatedMovies
      .filter(movie => movie.genres?.includes(genre))
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 10)
  })).filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="film-frenzy-loading">
        <Icon name="loading" size={48} />
        <p>Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="film-frenzy-error">
        <Icon name="warning" size={48} />
        <p>Error loading movies: {error}</p>
      </div>
    )
  }

  return (
    <div className="film-frenzy-page">
      {/* Page Title */}
      <div className="film-frenzy-header">
        <div className="film-frenzy-title">
          <h1>{text.categories.filmFrenzy.title}</h1>
          <p>{text.categories.filmFrenzy.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="film-frenzy-content">
        {viewMode === 'grid' ? (
          searchTerm ? (
            /* Search Results */
            <div className="film-frenzy-search-results">
              <div className="film-frenzy-controls">
                <div className="film-frenzy-controls__left">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search movies, franchises, directors..."
                    className="film-frenzy-search"
                  />
                </div>
                
                <div className="film-frenzy-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="film-frenzy-action film-frenzy-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="film-frenzy-action film-frenzy-action--add"
                    onClick={handleAddMovie}
                    title="Add Movie"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="film-frenzy-action film-frenzy-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>
              
              <h2>Search Results ({deduplicatedMovies.length})</h2>
              <ContentRow
                title="Results"
                items={deduplicatedMovies}
                onItemClick={handleMovieClick}
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
                  onPlay={handleMovieClick}
                  onInfo={handleMovieClick}
                  onAdd={() => handleAddMovie()}
                />
              )}

              {/* Actions Bar - Below Hero Carousel */}
              <div className="film-frenzy-controls">
                <div className="film-frenzy-controls__left">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search movies, franchises, directors..."
                    className="film-frenzy-search"
                  />
                </div>
                
                <div className="film-frenzy-controls__right">
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                  
                  <button
                    className="film-frenzy-action film-frenzy-action--upload"
                    onClick={() => {/* TODO: Implement bulk upload */}}
                    title="Bulk Upload"
                  >
                    <Icon name="upload" size={20} />
                  </button>
                  
                  <button
                    className="film-frenzy-action film-frenzy-action--add"
                    onClick={handleAddMovie}
                    title="Add Movie"
                  >
                    <Icon name="plus" size={20} />
                  </button>

                  <button
                    className="film-frenzy-action film-frenzy-action--export"
                    onClick={handleExport}
                    title="Export to Excel"
                  >
                    <Icon name="file-excel" size={20} />
                  </button>
                </div>
              </div>

              {/* Content Rows */}
              <div className="film-frenzy-rows">
                {recentMovies.length > 0 && (
                  <ContentRow
                    title="Recently Added"
                    items={recentMovies}
                    onItemClick={handleMovieClick}
                  />
                )}

                {topRatedMovies.length > 0 && (
                  <ContentRow
                    title="Top Rated"
                    items={topRatedMovies}
                    onItemClick={handleMovieClick}
                  />
                )}

                {genreRows.map((row) => (
                  <ContentRow
                    key={row.title}
                    title={row.title}
                    items={row.items}
                    onItemClick={handleMovieClick}
                  />
                ))}
              </div>
            </>
          )
        ) : (
          /* Table View */
          <>
            <div className="film-frenzy-controls">
              <div className="film-frenzy-controls__left">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search movies, franchises, directors..."
                  className="film-frenzy-search"
                />
              </div>
              
              <div className="film-frenzy-controls__right">
                <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                
                <button
                  className="film-frenzy-action film-frenzy-action--upload"
                  onClick={() => {/* TODO: Implement bulk upload */}}
                  title="Bulk Upload"
                >
                  <Icon name="upload" size={20} />
                </button>
                
                <button
                  className="film-frenzy-action film-frenzy-action--add"
                  onClick={handleAddMovie}
                  title="Add Movie"
                >
                  <Icon name="plus" size={20} />
                </button>

                <button
                  className="film-frenzy-action film-frenzy-action--export"
                  onClick={handleExport}
                  title="Export to Excel"
                >
                  <Icon name="file-excel" size={20} />
                </button>
              </div>
            </div>
            
            <div className="film-frenzy-table-container">
              <HobbyTable
                items={deduplicatedMovies}
                columns={tableColumns}
                onItemClick={handleMovieClick}
                onAction={handleAction}
                emptyMessage="No movies found"
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
        item={selectedMovie}
        onSave={handleSaveMovie}
        onDelete={handleDeleteMovie}
        type="movie"
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'verse', label: 'Universe/Franchise', type: 'text' },
          { name: 'part', label: 'Part/Chapter', type: 'text' },
          { name: 'genres', label: 'Genres', type: 'tags' },
          { name: 'language', label: 'Language', type: 'text' },
          { name: 'date', label: 'Release Date', type: 'month' },
          { name: 'imdb_rating', label: 'IMDB Rating', type: 'number', min: 0, max: 10, step: 0.1 },
          { name: 'star_rating', label: 'Personal Rating', type: 'rating' },
          { name: 'watch_download_link', label: 'Watch/Download Link', type: 'url' },
          { name: 'poster_image_url', label: 'Poster Image', type: 'image' },
          { name: 'comment', label: 'Comments', type: 'textarea' }
        ]}
      />
    </div>
  )
}

export default FilmFrenzy 