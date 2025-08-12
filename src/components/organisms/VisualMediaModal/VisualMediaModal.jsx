import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import Button from '@components/atoms/Button'
import ImageUpload from '@components/molecules/ImageUpload'
import './VisualMediaModal.css'

const VisualMediaModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
  initialMode = 'view', // 'view', 'edit', 'add'
  fields = [], // Array of field configurations
  title = 'Details'
}) => {
  const [mode, setMode] = useState(initialMode)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Reset mode when modal opens with different initial mode
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setFormData(item || {})
      setErrors({})
    }
  }, [isOpen, initialMode, item])

  const handleClose = () => {
    setMode('view')
    setFormData({})
    setErrors({})
    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleImageUpload = (imageUrl) => {
    // Update the appropriate image field based on the item type
    const imageField = formData.poster_image_url !== undefined ? 'poster_image_url' : 'cover_image_url'
    handleInputChange(imageField, imageUrl)
  }

  const handleGenreChange = (field, value) => {
    const genres = value.split(',').map(g => g.trim()).filter(g => g)
    handleInputChange(field, genres)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const success = await onSave(formData, mode)
      if (success) {
        handleClose()
      }
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }
    
    setIsLoading(true)
    try {
      const success = await onDelete(item.id)
      if (success) {
        handleClose()
      }
    } catch (error) {
      console.error('Error deleting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderField = (field) => {
    const value = formData[field.name] || ''
    const isReadOnly = mode === 'view'

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className="form-textarea"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            readOnly={isReadOnly}
          />
        )
      
      case 'select':
        return (
          <select
            className="form-select"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={isReadOnly}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case 'number':
        return (
          <input
            type="number"
            className="form-input"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            readOnly={isReadOnly}
          />
        )
      
      case 'month':
        return (
          <input
            type="month"
            className="form-input"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            readOnly={isReadOnly}
          />
        )
      
      case 'url':
        return (
          <input
            type="url"
            className="form-input"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            readOnly={isReadOnly}
          />
        )
      
      case 'rating':
        return (
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                className={`rating-star ${rating <= (value || 0) ? 'filled' : ''}`}
                onClick={() => !isReadOnly && handleInputChange(field.name, rating)}
                disabled={isReadOnly}
              >
                <Icon name="star" size={20} />
              </button>
            ))}
          </div>
        )
      
      case 'tags':
      case 'genres':
        return (
          <input
            type="text"
            className="form-input"
            value={Array.isArray(value) ? value.join(', ') : value}
            onChange={(e) => handleGenreChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            readOnly={isReadOnly}
          />
        )
      
      default:
        return (
          <input
            type="text"
            className="form-input"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            readOnly={isReadOnly}
          />
        )
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="modal-overlay">
        <motion.div
          className="visual-media-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modal Header */}
          <div className="visual-media-modal__header">
            <div className="visual-media-modal__title">
              <h2>{mode === 'add' ? `Add New ${title}` : `${title} Details`}</h2>
              {mode === 'view' && (
                <div className="visual-media-modal__actions">
                  <button
                    className="visual-media-modal__action"
                    onClick={() => setMode('edit')}
                    title="Edit"
                  >
                    <Icon name="edit" size={18} />
                  </button>
                  <button
                    className="visual-media-modal__action visual-media-modal__action--danger"
                    onClick={handleDelete}
                    title="Delete"
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>
              )}
            </div>
            <button
              className="visual-media-modal__close"
              onClick={handleClose}
            >
              <Icon name="x" size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="visual-media-modal__content">
            <div className="visual-media-modal__layout">
              {/* Image Upload/Preview */}
              <div className="visual-media-modal__image">
                {mode === 'view' ? (
                  /* View Mode - Show Image Preview */
                  <div className="image-preview">
                    {formData.poster_image_url || formData.cover_image_url ? (
                      <img
                        src={formData.poster_image_url || formData.cover_image_url}
                        alt={formData.title || 'Cover Image'}
                        className="image-preview__img"
                        onError={(e) => {
                          e.target.src = `https://source.unsplash.com/400x600/?${formData.genres?.[0] || 'media'}&sig=${formData.id || 'default'}`
                        }}
                      />
                    ) : (
                      <div className="image-preview__placeholder">
                        <Icon name="image-off" size={48} />
                        <p>No image available</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Edit/Add Mode - Show Upload Component */
                  <ImageUpload
                    currentImageUrl={formData.poster_image_url || formData.cover_image_url || ''}
                    onImageUpload={handleImageUpload}
                    disabled={false}
                  />
                )}
              </div>

              {/* Form Fields */}
              <div className="visual-media-modal__form">
                {fields.filter(field => field.type !== 'image').map(field => (
                  <div key={field.name} className="form-group">
                    <label className="form-label">{field.label}</label>
                    {renderField(field)}
                    {errors[field.name] && (
                      <span className="form-error">{errors[field.name]}</span>
                    )}
                  </div>
                ))}

                {/* Watch/Read Link */}
                {formData.watch_download_link && mode === 'view' && (
                  <div className="visual-media-modal__link">
                    <a
                      href={formData.watch_download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visual-media-modal__watch-link"
                    >
                      <Icon name="external-link" size={16} />
                      Watch/Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          {mode !== 'view' && (
            <div className="visual-media-modal__footer">
              <Button
                variant="secondary"
                onClick={() => mode === 'add' ? handleClose() : setMode('view')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isLoading}
                loading={isLoading}
              >
                {mode === 'add' ? 'Add' : 'Save'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default VisualMediaModal 