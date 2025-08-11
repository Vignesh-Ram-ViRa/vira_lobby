import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@components/atoms/Icon'
import SearchBar from '@components/molecules/SearchBar'
import { text } from '@constants/language'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import { setBooks, setLoading, setError } from '@features/bookworm/bookwormSlice'
import './Bookworm.css'

const Bookworm = () => {
  const dispatch = useDispatch()
  const { user, isGuest } = useAuth()
  const { books, loading, searchQuery, viewMode } = useSelector(state => state.bookworm)
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)

  // Fetch books from database
  const fetchBooks = async () => {
    if (!user && !isGuest) return
    
    dispatch(setLoading(true))
    try {
      const { data, error } = await supabase
        .from('bookworm')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
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

  // Create a single book spine component
  const BookSpine = ({ book, index }) => (
    <motion.div
      className={`book-spine book-spine--${book.genres?.[0]?.toLowerCase() || 'default'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        transition: { duration: 0.2 }
      }}
      onClick={() => handleBookClick(book)}
      style={{ 
        '--book-height': `${Math.random() * 60 + 180}px`,
        '--book-hue': Math.random() * 360
      }}
    >
      <div className="book-spine__content">
        <div className="book-spine__title">{book.title}</div>
        <div className="book-spine__author">{book.authors?.[0] || 'Unknown'}</div>
        <div className="book-spine__rating">
          {book.star_rating ? '★'.repeat(book.star_rating) : ''}
        </div>
      </div>
      <div className="book-spine__decoration" />
    </motion.div>
  )

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

  return (
    <div className="bookworm-page">
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
          placeholder="Search your library..."
          filters={searchFilters}
          className="bookworm-search"
        />
        
        <div className="bookworm-actions">
          <motion.button
            className="bookworm-action bookworm-action--primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
          >
            <Icon name="plus" size={18} />
            Add Book
          </motion.button>
          
          <motion.button
            className="bookworm-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="download" size={18} />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="bookworm-content">
        {loading ? (
          <div className="bookworm-loading">
            <motion.div 
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              📖
            </motion.div>
            <p>Loading your library...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          books.length === 0 ? <EmptyBookshelf /> : (
            <div className="no-results">
              <Icon name="search" size={48} />
              <h3>No books found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )
        ) : (
          <motion.div 
            className="bookshelf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Bookshelf Shelves */}
            {Array.from({ length: Math.ceil(filteredBooks.length / 8) }, (_, shelfIndex) => (
              <div key={shelfIndex} className="bookshelf__shelf">
                <div className="bookshelf__books">
                  {filteredBooks
                    .slice(shelfIndex * 8, (shelfIndex + 1) * 8)
                    .map((book, bookIndex) => (
                      <BookSpine
                        key={book.id}
                        book={book}
                        index={shelfIndex * 8 + bookIndex}
                      />
                    ))
                  }
                </div>
                <div className="bookshelf__wood" />
              </div>
            ))}
          </motion.div>
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
    </div>
  )
}

export default Bookworm 