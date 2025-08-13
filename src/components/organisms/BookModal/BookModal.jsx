import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Icon } from '@components/atoms/Icon'
import Button from '@components/atoms/Button'
import { text } from '@constants/language'
import { supabase } from '@utils/supabase'
import { useAuth } from '@hooks/useAuth'
import { uploadImage } from '@utils/supabase'
import { addBook, updateBook, removeBook, setError } from '@features/bookworm/bookwormSlice'
import './BookModal.css'

const BookModal = ({ 
  isOpen, 
  onClose, 
  book = null, 
  mode: initialMode = 'add' // 'add', 'edit', 'view'
}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [mode, setMode] = useState(initialMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    series: '',
    authors: [],
    genres: [],
    language: 'English',
    start_date: '',
    end_date: '',
    star_rating: 0,
    read_download_link: '',
    pricing: 'Free',
    cover_image_url: '',
    comment: ''
  })

  const [errors, setErrors] = useState({})
  const [authorInput, setAuthorInput] = useState('')
  const [genreInput, setGenreInput] = useState('')

  // Reset mode when modal opens with different initial mode
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
    }
  }, [isOpen, initialMode])

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (book && (mode === 'edit' || mode === 'view')) {
        setFormData({
          title: book.title || '',
          series: book.series || '',
          authors: book.authors || [],
          genres: book.genres || [],
          language: book.language || 'English',
          start_date: book.start_date || '',
          end_date: book.end_date || '',
          star_rating: book.star_rating || 0,
          read_download_link: book.read_download_link || '',
          pricing: book.pricing || 'Free',
          cover_image_url: book.cover_image_url || '',
          comment: book.comment || ''
        })
      } else {
        // Reset form for add mode
        setFormData({
          title: '',
          series: '',
          authors: [],
          genres: [],
          language: 'English',
          start_date: '',
          end_date: '',
          star_rating: 0,
          read_download_link: '',
          pricing: 'Free',
          cover_image_url: '',
          comment: ''
        })
      }
      setErrors({})
      setAuthorInput('')
      setGenreInput('')
    }
  }, [isOpen, book, mode])

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  // Add author
  const addAuthor = () => {
    if (authorInput.trim() && !formData.authors.includes(authorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        authors: [...prev.authors, authorInput.trim()]
      }))
      setAuthorInput('')
    }
  }

  // Remove author
  const removeAuthor = (authorToRemove) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter(author => author !== authorToRemove)
    }))
  }

  // Add genre
  const addGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, genreInput.trim()]
      }))
      setGenreInput('')
    }
  }

  // Remove genre
  const removeGenre = (genreToRemove) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter(genre => genre !== genreToRemove)
    }))
  }

  // Handle image upload
  const handleImageUpload = async (file) => {
    // Simple file validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      dispatch(setError('Please select a valid image file (JPEG, PNG, WebP, or GIF)'))
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      dispatch(setError('Image size must be less than 5MB'))
      return
    }

    setImageUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      
      setFormData(prev => ({
        ...prev,
        cover_image_url: imageUrl
      }))
    } catch (error) {
      console.error('Image upload failed:', error)
      dispatch(setError(error.message || 'Failed to upload image'))
    } finally {
      setImageUploading(false)
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (formData.authors.length === 0) {
      newErrors.authors = 'At least one author is required'
    }
    
    if (formData.star_rating < 1 || formData.star_rating > 5) {
      newErrors.star_rating = 'Rating must be between 1 and 5'
    }

    if (formData.read_download_link && !isValidUrl(formData.read_download_link)) {
      newErrors.read_download_link = 'Please enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const bookData = {
        ...formData,
        user_id: user?.id
      }

      if (mode === 'add') {
        const { data, error } = await supabase
          .from('bookworm')
          .insert([bookData])
          .select()
          .single()

        if (error) throw error
        dispatch(addBook(data))
      } else if (mode === 'edit') {
        const { data, error } = await supabase
          .from('bookworm')
          .update(bookData)
          .eq('id', book.id)
          .select()
          .single()

        if (error) throw error
        dispatch(updateBook(data))
      }

      onClose()
    } catch (error) {
      console.error('Error saving book:', error)
      dispatch(setError(error.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return
    
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('bookworm')
        .delete()
        .eq('id', book.id)

      if (error) throw error
      
      dispatch(removeBook(book.id))
      onClose()
    } catch (error) {
      console.error('Error deleting book:', error)
      dispatch(setError(error.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="book-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="book-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="book-modal__header">
              <div className="book-modal__title">
                <Icon 
                  name={mode === 'view' ? 'eye' : mode === 'edit' ? 'edit' : 'plus'} 
                  size={24} 
                />
                <h2>
                  {mode === 'view' ? 'Book Details' : 
                   mode === 'edit' ? 'Edit Book' : 'Add New Book'}
                </h2>
              </div>
              
              <div className="book-modal__actions">
                {mode === 'view' && book && (
                  <>
                    <button 
                      className="book-modal__action book-modal__action--edit"
                      onClick={() => {
                        setMode('edit')
                        setFormData(book)
                      }}
                      type="button"
                      title="Edit Book"
                    >
                      <Icon name="edit" size={18} />
                    </button>
                    <button 
                      className="book-modal__action book-modal__action--delete"
                      onClick={handleDelete}
                      type="button"
                      title="Delete Book"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </>
                )}
                <button 
                  className="book-modal__close"
                  onClick={onClose}
                  type="button"
                >
                  <Icon name="x" size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="book-modal__content">
              <form onSubmit={handleSubmit} className="book-form">
                {/* Image Upload Section */}
                <div className="book-form__image-section">
                  <div className="book-cover-upload">
                    {formData.cover_image_url ? (
                      <div className="book-cover-preview">
                        <img 
                          src={formData.cover_image_url} 
                          alt="Book cover"
                          className="book-cover-image"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'flex'
                          }}
                        />
                        <div className="book-cover-fallback" style={{ display: 'none' }}>
                          <Icon name="image-off" size={32} />
                          <span>Image not available</span>
                        </div>
                        {mode !== 'view' && (
                          <div className="book-cover-actions">
                            <button
                              type="button"
                              className="book-cover-change"
                              onClick={() => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'
                                input.onchange = (e) => {
                                  const file = e.target.files[0]
                                  if (file) handleImageUpload(file)
                                }
                                input.click()
                              }}
                            >
                              <Icon name="edit" size={16} />
                            </button>
                            <button
                              type="button"
                              className="book-cover-remove"
                              onClick={() => handleInputChange('cover_image_url', '')}
                            >
                              <Icon name="x" size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      mode !== 'view' && (
                        <div className="book-cover-placeholder">
                          {imageUploading ? (
                            <div className="book-cover-uploading">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Icon name="loading" size={24} />
                              </motion.div>
                              <span>Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <Icon name="image" size={32} />
                              <span>Click to upload cover</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0]
                                  if (file) handleImageUpload(file)
                                }}
                                className="book-cover-input"
                              />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="book-form__fields">
                  {/* Title */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="book" size={16} />
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`form-input ${errors.title ? 'form-input--error' : ''}`}
                      placeholder="Enter book title"
                      readOnly={mode === 'view'}
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                  </div>

                  {/* Series */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="layers" size={16} />
                      Series
                    </label>
                    <input
                      type="text"
                      value={formData.series}
                      onChange={(e) => handleInputChange('series', e.target.value)}
                      className="form-input"
                      placeholder="Enter series name (optional)"
                      readOnly={mode === 'view'}
                    />
                  </div>

                  {/* Authors */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="user" size={16} />
                      Authors *
                    </label>
                    {mode !== 'view' && (
                      <div className="form-input-group">
                        <input
                          type="text"
                          value={authorInput}
                          onChange={(e) => setAuthorInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAuthor())}
                          className="form-input"
                          placeholder="Enter author name and press Enter"
                        />
                        <button type="button" onClick={addAuthor} className="form-add-btn">
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                    )}
                    <div className="form-tags">
                      {formData.authors.map((author, index) => (
                        <span key={index} className="form-tag">
                          {author}
                          {mode !== 'view' && (
                            <button
                              type="button"
                              onClick={() => removeAuthor(author)}
                              className="form-tag-remove"
                            >
                              <Icon name="x" size={12} />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {errors.authors && <span className="form-error">{errors.authors}</span>}
                  </div>

                  {/* Genres */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="tag" size={16} />
                      Genres
                    </label>
                    {mode !== 'view' && (
                      <div className="form-input-group">
                        <input
                          type="text"
                          value={genreInput}
                          onChange={(e) => setGenreInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                          className="form-input"
                          placeholder="Enter genre and press Enter"
                        />
                        <button type="button" onClick={addGenre} className="form-add-btn">
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                    )}
                    <div className="form-tags">
                      {formData.genres.map((genre, index) => (
                        <span key={index} className="form-tag form-tag--genre">
                          {genre}
                          {mode !== 'view' && (
                            <button
                              type="button"
                              onClick={() => removeGenre(genre)}
                              className="form-tag-remove"
                            >
                              <Icon name="x" size={12} />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Language & Dates */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Icon name="globe" size={16} />
                        Language
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="form-select"
                        disabled={mode === 'view'}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Icon name="calendar" size={16} />
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={formData.start_date}
                        onChange={(e) => handleInputChange('start_date', e.target.value)}
                        className="form-input"
                        readOnly={mode === 'view'}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Icon name="calendar" size={16} />
                        End Date
                      </label>
                      <input
                        type="month"
                        value={formData.end_date}
                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                        className="form-input"
                        readOnly={mode === 'view'}
                      />
                    </div>
                  </div>

                  {/* Rating & Pricing */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Icon name="star" size={16} />
                        Rating *
                      </label>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-rating__star ${
                              star <= formData.star_rating ? 'star-rating__star--active' : ''
                            }`}
                            onClick={() => mode !== 'view' && handleInputChange('star_rating', star)}
                            disabled={mode === 'view'}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {errors.star_rating && <span className="form-error">{errors.star_rating}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Icon name="dollar-sign" size={16} />
                        Pricing
                      </label>
                      <select
                        value={formData.pricing}
                        onChange={(e) => handleInputChange('pricing', e.target.value)}
                        className="form-select"
                        disabled={mode === 'view'}
                      >
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  {/* Read/Download Link */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="link" size={16} />
                      Read/Download Link
                    </label>
                    
                    {mode === 'view' && formData.read_download_link ? (
                      <div className="form-link-display">
                        <a 
                          href={formData.read_download_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="form-clickable-link"
                        >
                          <Icon name="external-link" size={16} />
                          {formData.read_download_link}
                        </a>
                      </div>
                    ) : (
                      <input
                        type="url"
                        value={formData.read_download_link}
                        onChange={(e) => handleInputChange('read_download_link', e.target.value)}
                        className={`form-input ${errors.read_download_link ? 'form-input--error' : ''}`}
                        placeholder="https://example.com/book"
                        readOnly={mode === 'view'}
                      />
                    )}
                    {errors.read_download_link && <span className="form-error">{errors.read_download_link}</span>}
                  </div>

                  {/* Comment */}
                  <div className="form-group">
                    <label className="form-label">
                      <Icon name="message-square" size={16} />
                      Comment
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="form-textarea"
                      placeholder="Your thoughts about this book..."
                      rows={4}
                      readOnly={mode === 'view'}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="book-modal__footer">
              {mode === 'view' ? (
                <div className="book-modal__view-actions">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div className="book-modal__form-actions">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  
                  {mode === 'edit' && (
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      disabled={isSubmitting}
                    >
                      <Icon name="trash" size={16} />
                      Delete
                    </Button>
                  )}
                  
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting || imageUploading}
                    loading={isSubmitting || imageUploading}
                  >
                    <Icon name={mode === 'edit' ? 'save' : 'plus'} size={16} />
                    {imageUploading ? 'Uploading...' : (mode === 'edit' ? 'Save Changes' : 'Add Book')}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookModal 