import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import ViewToggle from '@components/molecules/ViewToggle'
import BookModal from '@components/organisms/BookModal'
import { text } from '@constants/language'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import { exportBooksToExcel, exportBooksToCSV, exportBooksToJSON } from '@utils/exportUtils'
import { setBooks, setLoading, setError, setSearchQuery, setViewMode } from '@features/bookworm/bookwormSlice'
import './Bookworm.css'

const Bookworm = () => {
  const dispatch = useDispatch()
  const { user, isGuest, isOwner, isSuperAdmin } = useAuth()
  const { books, loading, searchQuery, viewMode } = useSelector(state => state.bookworm)
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)

  // Handle view mode change
  const handleViewChange = (newViewMode) => {
    dispatch(setViewMode(newViewMode))
  }

  // Fetch books from database
  const fetchBooks = async () => {
    if (!user && !isGuest) return
    
    dispatch(setLoading(true))
    try {
      let query = supabase.from('bookworm').select('*')
      
      // Apply user-specific filtering based on role
      if (isSuperAdmin()) {
        // Super admin sees all records
        console.log('Fetching all books for super admin')
      } else if (isOwner() && user?.id) {
        // Owner sees only their records
        query = query.eq('user_id', user.id)
        console.log('Fetching books for owner:', user.id)
      } else if (isGuest) {
        // Guests see owner's public records
        // TODO: Replace with actual owner's UUID
        query = query.eq('user_id', 'your-user-id-here')
        console.log('Fetching public books for guest')
      } else {
        // Regular authenticated users see their own records
        query = query.eq('user_id', user?.id)
        console.log('Fetching books for user:', user?.id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      
      console.log('Fetched books:', data?.length || 0, 'records')
      dispatch(setBooks(data || []))
    } catch (error) {
      dispatch(setError(error.message))
      console.error('Error fetching books:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [user, isGuest])

  // Filter books based on search query
  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      book.title?.toLowerCase().includes(searchLower) ||
      book.authors?.some(author => author.toLowerCase().includes(searchLower)) ||
      book.genres?.some(genre => genre.toLowerCase().includes(searchLower)) ||
      book.series?.toLowerCase().includes(searchLower)
    )
  })

  // Sample search filters for the search bar
  const searchFilters = [
    {
      key: 'genre',
      label: 'Genre',
      type: 'multiselect',
      options: [
        { value: 'fiction', label: 'Fiction' },
        { value: 'non-fiction', label: 'Non-Fiction' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'sci-fi', label: 'Science Fiction' },
        { value: 'romance', label: 'Romance' },
        { value: 'mystery', label: 'Mystery' },
        { value: 'biography', label: 'Biography' }
      ]
    },
    {
      key: 'rating',
      label: 'Rating',
      type: 'range',
      min: 1,
      max: 5,
      step: 1
    },
    {
      key: 'language',
      label: 'Language',
      type: 'select',
      options: [
        { value: 'english', label: 'English' },
        { value: 'spanish', label: 'Spanish' },
        { value: 'french', label: 'French' },
        { value: 'german', label: 'German' }
      ]
    }
  ]

  // Handle book click
  const handleBookClick = (book) => {
    setSelectedBook(book)
    setShowViewModal(true)
  }

  // Handle edit book
  const handleEditBook = (book) => {
    setSelectedBook(book)
    setShowAddModal(true) // Use the same modal but in edit mode
  }

  // Handle export
  const handleExport = () => {
    const booksToExport = filteredBooks.length > 0 ? filteredBooks : books
    
    if (booksToExport.length === 0) {
      dispatch(setError('No books to export'))
      return
    }

    // For now, export to Excel (can be enhanced with format selection)
    const result = exportBooksToExcel(booksToExport, 'my_bookworm_collection')
    
    if (result.success) {
      // Could show a success toast here
      console.log(result.message)
    } else {
      dispatch(setError(result.error))
    }
  }

  // Create a single book cover component
  const BookCover = ({ book, index }) => {
    const [imageError, setImageError] = React.useState(false)
    
    const genreHue = React.useMemo(() => {
      if (!book.genres || book.genres.length === 0) return 200
      const genre = book.genres[0]
      return (genre.charCodeAt(0) * 137) % 360
    }, [book.genres])

    const handleImageError = () => {
      setImageError(true)
    }

    return (
      <motion.div
        className="book-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ 
          scale: 1.08, 
          y: -12,
          rotateY: 5,
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          transition: { duration: 0.3 }
        }}
        onClick={() => handleBookClick(book)}
        onContextMenu={(e) => {
          e.preventDefault()
          handleEditBook(book)
        }}
        style={{ '--book-hue': genreHue }}
        title="Click to view • Right-click to edit"
      >
        <div className="book-cover__image">
          {book.cover_image_url && !imageError ? (
            <img 
              src={book.cover_image_url} 
              alt={book.title}
              onError={handleImageError}
            />
          ) : (
            <div className="book-cover__placeholder" style={{ backgroundColor: `hsl(${genreHue}, 60%, 70%)` }}>
              <Icon name="book" size={32} />
              <div className="book-cover__placeholder-title">{book.title}</div>
            </div>
          )}
        </div>
        
        <div className="book-cover__info">
          <div className="book-cover__title">{book.title}</div>
          {book.authors && book.authors.length > 0 && (
            <div className="book-cover__author">{book.authors[0]}</div>
          )}
          {book.star_rating && (
            <div className="book-cover__rating">
              {'★'.repeat(book.star_rating)}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Empty state when no books
  const EmptyBookshelf = () => (
    <motion.div 
      className="empty-bookshelf"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="empty-bookshelf__illustration">📚</div>
      <h3>Your Digital Library Awaits</h3>
      <p>Start building your personal collection of literary adventures!</p>
      <motion.button
        className="empty-bookshelf__cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddModal(true)}
      >
        <Icon name="plus" size={20} />
        Add Your First Book
      </motion.button>
    </motion.div>
  )

  const renderEmptyState = () => {
    if (books.length === 0) {
      return <EmptyBookshelf />
    } else {
      return (
        <div className="no-results">
          <Icon name="search" size={48} />
          <h3>No books found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )
    }
  }

  return (
    <div className="bookworm-page">
      <div className="bookworm-container">
        {/* Header */}
        <div className="bookworm-header">
        <motion.div 
          className="bookworm-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bookworm-title__main">
            <Icon name="book" size={32} />
            <h1>{text.categories.bookworm.title}</h1>
          </div>
          <p>{text.categories.bookworm.description}</p>
        </motion.div>

        <motion.div 
          className="bookworm-stats"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bookworm-stat">
            <span className="bookworm-stat__value">{books.length}</span>
            <span className="bookworm-stat__label">Books</span>
          </div>
          <div className="bookworm-stat">
            <span className="bookworm-stat__value">{new Set(books.flatMap(b => b.genres || [])).size}</span>
            <span className="bookworm-stat__label">Genres</span>
          </div>
          <div className="bookworm-stat">
            <span className="bookworm-stat__value">
              {books.length > 0 ? (books.reduce((sum, b) => sum + (b.star_rating || 0), 0) / books.length).toFixed(1) : '0.0'}★
            </span>
            <span className="bookworm-stat__label">Avg Rating</span>
          </div>
        </motion.div>
      </div>

      {/* Search and Actions */}
      <motion.div 
        className="bookworm-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(query) => dispatch(setSearchQuery(query))}
          placeholder="Search your library..."
          filters={searchFilters}
          className="bookworm-search"
        />
        
        <ViewToggle
          currentView={viewMode}
          onViewChange={handleViewChange}
        />

        <div className="bookworm-actions">
          <motion.button
            className="bookworm-action bookworm-action--add"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddModal(true)}
            title="Add Book"
          >
            <Icon name="plus" size={24} />
          </motion.button>

          <motion.button
            className="bookworm-action bookworm-action--upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {/* TODO: Implement bulk upload */}}
            title="Bulk Upload"
          >
            <Icon name="upload" size={20} />
          </motion.button>
          
          <motion.button
            className="bookworm-action bookworm-action--export"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            disabled={filteredBooks.length === 0}
            title="Export to Excel"
          >
            <Icon name="file-excel" size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="bookworm-content">
        {loading ? (
          <div className="bookworm-loading">
            <div className="loading-spinner"></div>
            <p>Loading your library...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {viewMode === 'grid' ? (
              // Grid View (Bookshelf)
              <div className="bookshelves">
                {Array.from({ length: Math.ceil(filteredBooks.length / 6) }, (_, shelfIndex) => (
                  <motion.div
                    key={shelfIndex}
                    className="bookshelf"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: shelfIndex * 0.1 }}
                  >
                    <div className="bookshelf__wood"></div>
                    <div className="bookshelf__books">
                      {filteredBooks
                        .slice(shelfIndex * 6, (shelfIndex + 1) * 6)
                        .map((book, bookIndex) => (
                          <BookCover
                            key={book.id}
                            book={book}
                            index={shelfIndex * 6 + bookIndex}
                          />
                        ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // List View
              <div className="books-list">
                <div className="books-list__header">
                  <div className="books-list__col books-list__col--title">Title</div>
                  <div className="books-list__col books-list__col--author">Author</div>
                  <div className="books-list__col books-list__col--genre">Genre</div>
                  <div className="books-list__col books-list__col--rating">Rating</div>
                  <div className="books-list__col books-list__col--date">Date</div>
                  <div className="books-list__col books-list__col--actions">Actions</div>
                </div>
                <div className="books-list__body">
                  {filteredBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      className="books-list__row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => handleBookClick(book)}
                    >
                      <div className="books-list__col books-list__col--title">
                        <div className="book-list-title">{book.title}</div>
                        {book.series && <div className="book-list-series">{book.series}</div>}
                      </div>
                      <div className="books-list__col books-list__col--author">
                        {book.authors && book.authors.length > 0 ? book.authors[0] : 'Unknown'}
                      </div>
                      <div className="books-list__col books-list__col--genre">
                        {book.genres && book.genres.length > 0 ? book.genres.slice(0, 2).join(', ') : 'N/A'}
                      </div>
                      <div className="books-list__col books-list__col--rating">
                        {book.star_rating ? '★'.repeat(book.star_rating) : 'Not rated'}
                      </div>
                      <div className="books-list__col books-list__col--date">
                        {book.end_date || book.start_date || 'N/A'}
                      </div>
                      <div className="books-list__col books-list__col--actions">
                        <button 
                          className="book-list-action"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditBook(book)
                          }}
                          title="Edit"
                        >
                          <Icon name="edit" size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Add Button for Mobile */}
      <motion.button
        className="bookworm-fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAddModal(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Icon name="plus" size={24} />
      </motion.button>

      {/* Modals */}
      <BookModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setSelectedBook(null)
        }}
        book={selectedBook}
        mode={selectedBook ? "edit" : "add"}
      />

      <BookModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false)
          setSelectedBook(null)
        }}
        book={selectedBook}
        mode="view"
      />
      </div>
    </div>
  )
}

export default Bookworm 