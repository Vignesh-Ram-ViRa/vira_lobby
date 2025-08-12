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
import { setLoading, setError } from '@features/filmFrenzy/filmFrenzySlice'
import './FilmFrenzy.css'

const FilmFrenzy = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { loading } = useSelector(state => state.filmFrenzy)
  
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('view')

  // Field configuration for the modal
  const modalFields = [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'Enter movie title...' },
    { key: 'verse', label: 'Verse/Universe', type: 'text', placeholder: 'e.g., Marvel, DC, Standalone...' },
    { key: 'part', label: 'Part/Number', type: 'text', placeholder: 'e.g., Part 1, Episode 2...' },
    { key: 'genres', label: 'Genres', type: 'genres', placeholder: 'Action, Drama, Comedy (comma separated)' },
    { key: 'language', label: 'Language', type: 'text', placeholder: 'English, Spanish, etc.' },
    { key: 'date', label: 'Release Date', type: 'text', placeholder: 'MM/YY format' },
    { key: 'imdb_rating', label: 'IMDB Rating', type: 'number', placeholder: '0.0-10.0', min: 0, max: 10, step: 0.1 },
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

  // Fetch movies from database
  const fetchMovies = async () => {
    dispatch(setLoading(true))
    try {
      let query = supabase.from('film_frenzy').select('*')

      if (isSuperAdmin()) {
        console.log('Fetching all movies for super admin')
      } else if (isOwner() && user?.id) {
        query = query.eq('user_id', user.id)
        console.log('Fetching movies for owner:', user.id)
      } else if (isGuest) {
        console.log('Fetching public movies for guest')
        // TODO: Replace with actual owner's UUID
        // query = query.eq('user_id', 'owner-uuid-here')
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching movies:', error)
        dispatch(setError(error.message))
      } else {
        setMovies(data || [])
      }
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

  // Filter movies based on search
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (movie.verse && movie.verse.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (movie.part && movie.part.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (movie.genres && movie.genres.some(genre => 
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  )

  // Group movies by categories for content rows
  const getMoviesByGenre = (genre) => {
    return filteredMovies.filter(movie => 
      movie.genres && movie.genres.includes(genre)
    ).slice(0, 10)
  }

  const getMoviesByIMDBRating = (minRating) => {
    return filteredMovies.filter(movie => 
      movie.imdb_rating && movie.imdb_rating >= minRating
    ).sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0)).slice(0, 10)
  }

  const getFeaturedMovies = () => {
    return filteredMovies
      .filter(movie => movie.star_rating >= 3)
      .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
      .slice(0, 5)
  }

  const getRecentMovies = () => {
    return filteredMovies
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
  }

  // Handle movie interactions
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setModalMode('view')
    setShowModal(true)
  }

  const handlePlayMovie = (movie) => {
    if (movie.watch_download_link) {
      window.open(movie.watch_download_link, '_blank')
    }
  }

  const handleAddMovie = () => {
    setSelectedMovie(null)
    setModalMode('add')
    setShowModal(true)
  }

  const handleModalSave = async (formData, mode) => {
    try {
      if (mode === 'add') {
        const { data, error } = await supabase
          .from('film_frenzy')
          .insert([{ ...formData, user_id: user?.id }])
          .select()

        if (error) throw error
        setMovies(prev => [data[0], ...prev])
      } else {
        const { data, error } = await supabase
          .from('film_frenzy')
          .update(formData)
          .eq('id', selectedMovie.id)
          .select()

        if (error) throw error
        setMovies(prev => prev.map(movie => 
          movie.id === selectedMovie.id ? data[0] : movie
        ))
      }
      return true
    } catch (error) {
      console.error('Error saving movie:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleModalDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('film_frenzy')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMovies(prev => prev.filter(movie => movie.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting movie:', error)
      dispatch(setError(error.message))
      return false
    }
  }

  const handleExport = () => {
    if (filteredMovies.length === 0) return
    
    const exportData = filteredMovies.map(movie => ({
      Title: movie.title,
      Verse: movie.verse || '',
      Part: movie.part || '',
      Genres: movie.genres ? movie.genres.join(', ') : '',
      Language: movie.language || '',
      Date: movie.date || '',
      'IMDB Rating': movie.imdb_rating || '',
      'Star Rating': movie.star_rating || '',
      'Watch Link': movie.watch_download_link || '',
      Comment: movie.comment || ''
    }))
    
    exportBooksToExcel(exportData, 'film-frenzy-export')
  }

  const handleViewChange = (newViewMode) => {
    setViewMode(newViewMode)
  }

  // Content rows data
  const contentRows = [
    {
      title: 'Featured Movies',
      items: getFeaturedMovies()
    },
    {
      title: 'Recently Added',
      items: getRecentMovies()
    },
    {
      title: 'Highly Rated (IMDB 7+)',
      items: getMoviesByIMDBRating(7.0)
    },
    {
      title: 'Action & Adventure',
      items: getMoviesByGenre('Action')
    },
    {
      title: 'Fantasy & Sci-Fi',
      items: getMoviesByGenre('Fantasy')
    },
    {
      title: 'Disney Collection',
      items: filteredMovies.filter(movie => 
        movie.watch_download_link && movie.watch_download_link.includes('Disney')
      ).slice(0, 10)
    },
    {
      title: 'Thriller & Mystery',
      items: getMoviesByGenre('Thriller')
    }
  ].filter(row => row.items.length > 0)

  if (loading) {
    return (
      <div className="film-frenzy-page">
        <div className="film-frenzy-loading">
          <div className="loading-spinner"></div>
          <p>Loading your movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="film-frenzy-page">
      {/* Hero Section */}
      <HeroCarousel
        items={getFeaturedMovies()}
        onPlay={handlePlayMovie}
        onInfo={handleMovieClick}
        onAdd={(movie) => console.log('Add to list:', movie)}
      />

      {/* Controls */}
      <div className="film-frenzy-controls">
        <div className="film-frenzy-controls__left">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search movies, genres, or series..."
            className="film-frenzy-search"
          />
          
          <ViewToggle
            currentView={viewMode}
            onViewChange={handleViewChange}
          />
        </div>

        <div className="film-frenzy-controls__right">
          <motion.button
            className="film-frenzy-action film-frenzy-action--add"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddMovie}
            title="Add Movie"
          >
            <Icon name="plus" size={20} />
          </motion.button>

          <motion.button
            className="film-frenzy-action film-frenzy-action--upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Bulk upload')}
            title="Bulk Upload"
          >
            <Icon name="upload" size={20} />
          </motion.button>

          <motion.button
            className="film-frenzy-action film-frenzy-action--export"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            disabled={filteredMovies.length === 0}
            title="Export to Excel"
          >
            <Icon name="file-excel" size={20} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="film-frenzy-content">
          {filteredMovies.length === 0 ? (
            <div className="film-frenzy-empty">
              <Icon name="play" size={64} />
              <h3>No movies found</h3>
              <p>Start building your cinema collection!</p>
            </div>
          ) : searchQuery ? (
            // When searching, show results without categories
            <ContentRow
              title={`Search Results for "${searchQuery}"`}
              items={filteredMovies.slice(0, 20)} // Limit search results
              onItemClick={handleMovieClick}
              itemType="poster"
            />
          ) : (
            // When not searching, show organized content rows
            contentRows.map((row, index) => (
              <ContentRow
                key={index}
                title={row.title}
                items={row.items}
                onItemClick={handleMovieClick}
                itemType="poster"
              />
            ))
          )}
        </div>
      ) : (
        /* List View */
        <div className="film-frenzy-list">
          <div className="film-frenzy-list-header">
            <div className="film-frenzy-list-header__cell">Poster</div>
            <div className="film-frenzy-list-header__cell">Title</div>
            <div className="film-frenzy-list-header__cell">Genre</div>
            <div className="film-frenzy-list-header__cell">IMDB</div>
            <div className="film-frenzy-list-header__cell">Rating</div>
            <div className="film-frenzy-list-header__cell">Actions</div>
          </div>
          <div className="film-frenzy-list-body">
            {filteredMovies.length === 0 ? (
              <div className="film-frenzy-list-empty">
                <Icon name="play" size={48} />
                <p>No movies found</p>
              </div>
            ) : (
              filteredMovies.map((movie, index) => (
                <div key={movie.id} className="film-frenzy-list-item">
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__poster">
                    <img
                      src={movie.poster_image_url}
                      alt={movie.title}
                      className="film-frenzy-list-item__image"
                      onError={(e) => {
                        e.target.src = `https://source.unsplash.com/random/100x150/?${movie.genres?.[0] || 'movie'},${movie.title.replace(/\s/g, '')}&sig=${movie.id}`
                      }}
                    />
                  </div>
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__title">
                    <div className="film-frenzy-list-item__main-title">{movie.title}</div>
                    {movie.verse && (
                      <div className="film-frenzy-list-item__subtitle">{movie.verse}</div>
                    )}
                  </div>
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__genre">
                    {movie.genres?.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="film-frenzy-list-item__tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__imdb">
                    {movie.imdb_rating ? `${movie.imdb_rating}/10` : '-'}
                  </div>
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__rating">
                    <div className="film-frenzy-list-item__stars">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name={i < (movie.star_rating || 0) ? 'star' : 'star-outline'}
                          size={14}
                          className={i < (movie.star_rating || 0) ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="film-frenzy-list-item__cell film-frenzy-list-item__actions">
                    <button
                      className="film-frenzy-list-item__action"
                      onClick={() => handleMovieClick(movie)}
                      title="View Details"
                    >
                      <Icon name="info" size={16} />
                    </button>
                    {movie.watch_download_link && (
                      <button
                        className="film-frenzy-list-item__action"
                        onClick={() => window.open(movie.watch_download_link, '_blank')}
                        title="Watch"
                      >
                        <Icon name="play" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      <VisualMediaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedMovie}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
        initialMode={modalMode}
        fields={modalFields}
        title="Movie"
      />
    </div>
  )
}

export default FilmFrenzy 