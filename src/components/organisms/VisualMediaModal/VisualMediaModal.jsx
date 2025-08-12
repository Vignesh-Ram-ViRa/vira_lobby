import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import Button from '@components/atoms/Button'
import { text } from '@constants/language'
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

  const handleGenreChange = (value) => {
    const genres = value.split(',').map(g => g.trim()).filter(g => g)
    handleInputChange('genres', genres)
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
    const value = formData[field.key] || ''
    const isReadOnly = mode === 'view'

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className="form-textarea"
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
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
            onChange={(e) => handleInputChange(field.key, e.target.value)}
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
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            readOnly={isReadOnly}
          />
        )
      
      case 'genres':
        return (
          <input
            type="text"
            className="form-input"
            value={Array.isArray(value) ? value.join(', ') : value}
            onChange={(e) => handleGenreChange(e.target.value)}
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
            onChange={(e) => handleInputChange(field.key, e.target.value)}
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
              {/* Cover Image */}
              <div className="visual-media-modal__image">
                <img
                  src={formData.poster_image_url || formData.cover_image_url}
                  alt={formData.title}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'flex'
                  }}
                />
                <div className="visual-media-modal__image-fallback">
                  <Icon name="play" size={48} />
                  <span>No Image</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="visual-media-modal__form">
                {fields.map(field => (
                  <div key={field.key} className="form-group">
                    <label className="form-label">{field.label}</label>
                    {renderField(field)}
                    {errors[field.key] && (
                      <span className="form-error">{errors[field.key]}</span>
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