import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ShutterTales.css'
import { text } from '@constants/language'
import SearchBar from '@components/molecules/SearchBar'
import Button from '@components/atoms/Button'
import Icon from '@components/atoms/Icon'
import { setPhotos, setLoading, setError } from '@features/shutterTales/shutterTalesSlice'
import { supabase } from '@utils/supabase'
import VisualMediaModal from '@components/organisms/VisualMediaModal'

const ShutterTales = () => {
  const dispatch = useDispatch()
  const { photos, loading, error } = useSelector(state => state.shutterTales)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModal, setSelectedModal] = useState(null)
  const [filteredPhotos, setFilteredPhotos] = useState([])
  
  // Hero banner image options - predefined list for selection
  const heroOptions = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop&auto=format',
      title: 'Mountain Peak at Dawn'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=800&fit=crop&auto=format',
      title: 'Ocean Waves at Sunset'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=800&fit=crop&auto=format',
      title: 'Autumn Forest Path'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=800&fit=crop&auto=format',
      title: 'Neon Reflections'
    }
  ]
  
  const [selectedHero, setSelectedHero] = useState(() => {
    // Load saved hero from localStorage or default to first option
    const savedHero = localStorage.getItem('shutter-tales-hero')
    return savedHero ? JSON.parse(savedHero) : heroOptions[0]
  })

  const fetchPhotos = async () => {
    dispatch(setLoading(true))
    try {
      const { data, error } = await supabase
        .from('shutter_tales')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      const photosData = data || []
      dispatch(setPhotos(photosData))
      // Always initialize filtered photos when data is first loaded
      setFilteredPhotos(photosData)
    } catch (err) {
      console.error('Error fetching photos:', err)
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }



  useEffect(() => {
    fetchPhotos()
  }, [])

  // Search when data loads or search query changes
  useEffect(() => {
    if (photos.length > 0) {
      console.log('🔄 Search query changed:', searchQuery)
      
      if (!searchQuery.trim()) {
        console.log('📷 Clearing search - showing all photos:', photos.length)
        setFilteredPhotos(photos)
        return
      }

      const filtered = photos.filter(photo =>
        photo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      console.log('🎯 Search results:', filtered.length, 'out of', photos.length)
      setFilteredPhotos(filtered)
    }
  }, [searchQuery, photos])

  const openModal = (photo) => {
    setSelectedModal(photo)
  }

  const closeModal = () => {
    setSelectedModal(null)
  }

  const handleAddNew = () => {
    setSelectedModal({ isNew: true })
  }

  const handleSave = async (data, mode) => {
    try {
      if (mode === 'add') {
        const { error } = await supabase
          .from('shutter_tales')
          .insert([{
            user_id: 'bf7f746f-bba4-40bb-87a3-dab4574589a1', // Replace with actual user ID
            ...data
          }])
        
        if (error) throw error
      } else if (mode === 'edit') {
        const { error } = await supabase
          .from('shutter_tales')
          .update(data)
          .eq('id', data.id)
        
        if (error) throw error
      }
      
      await fetchPhotos() // Refresh the list
      return true
    } catch (error) {
      console.error('Error saving photo:', error)
      return false
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('shutter_tales')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await fetchPhotos() // Refresh the list
      return true
    } catch (error) {
      console.error('Error deleting photo:', error)
      return false
    }
  }

  const handleSetCover = (photo) => {
    // Find the hero option that matches this photo or set as the first option
    const newHeroOption = {
      id: photo.id,
      url: photo.image_url,
      title: photo.name
    }
    setSelectedHero(newHeroOption)
    localStorage.setItem('shutter-tales-hero', JSON.stringify(newHeroOption))
    setSelectedModal(null) // Close modal
  }

  const handleHeroSelect = (hero) => {
    setSelectedHero(hero)
    localStorage.setItem('shutter-tales-hero', JSON.stringify(hero))
  }

  if (loading && photos.length === 0) {
    return (
      <div className="shutter-tales shutter-tales--loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="shutter-tales">
      {/* Hero Banner with transparent header effect */}
      <div className="shutter-tales__hero" style={{ backgroundImage: `url(${selectedHero.url})` }}>
        <div className="shutter-tales__hero-overlay">
          <div className="shutter-tales__hero-content">
            <h1 className="shutter-tales__hero-title">{text.categories.shutterTales.title}</h1>
            <p className="shutter-tales__hero-subtitle">Capturing moments, creating memories</p>
            
            {/* Hero Image Selector */}
            <div className="shutter-tales__hero-selector">
              <span className="shutter-tales__hero-selector-label">Choose Cover:</span>
              <div className="shutter-tales__hero-options">
                {heroOptions.map(option => (
                  <button
                    key={option.id}
                    className={`shutter-tales__hero-option ${selectedHero.id === option.id ? 'active' : ''}`}
                    onClick={() => handleHeroSelect(option)}
                    style={{ backgroundImage: `url(${option.url})` }}
                    title={option.title}
                  />
                ))}
              </div>
            </div>

            {/* Search and Actions Bar */}
            <div className="shutter-tales__hero-actions">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search photography..."
                className="shutter-tales__search"
              />
              <Button
                variant="primary"
                onClick={handleAddNew}
                className="shutter-tales__add-btn"
              >
                <Icon name="add" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="shutter-tales__content">
        {error && (
          <div className="shutter-tales__error">
            <p>Error: {error}</p>
            <Button onClick={fetchPhotos}>Retry</Button>
          </div>
        )}

        {filteredPhotos.length === 0 && !loading ? (
          <div className="shutter-tales__empty">
            <Icon name="camera" size="48" />
            <h3>
              {searchQuery.trim() ? 
                `No photos found for "${searchQuery}"` : 
                text.categories.shutterTales.emptyState
              }
            </h3>
            {!searchQuery.trim() && (
              <Button variant="primary" onClick={handleAddNew}>
                <Icon name="add" />
                Add Your First Photo
              </Button>
            )}
            {searchQuery.trim() && (
              <Button variant="secondary" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="shutter-tales__gallery">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className={`shutter-tales__photo-card ${getCardSize(index)}`}
                onClick={() => openModal(photo)}
              >
                <div className="shutter-tales__photo-container">
                  <img 
                    src={photo.image_url} 
                    alt={photo.name}
                    className="shutter-tales__photo-image"
                    loading="lazy"
                  />
                  <div className="shutter-tales__photo-overlay">
                    <div className="shutter-tales__photo-info">
                      <h4 className="shutter-tales__photo-name">{photo.name}</h4>
                      <p className="shutter-tales__photo-location">
                        <Icon name="location" />
                        {photo.location}
                      </p>
                      <div className="shutter-tales__photo-tags">
                        <span className="tag">{photo.genre}</span>
                        <span className="tag">{photo.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedModal && (
        <VisualMediaModal
          isOpen={true}
          onClose={closeModal}
          initialMode={selectedModal.isNew ? 'add' : 'view'}
          item={selectedModal}
          onSave={handleSave}
          onDelete={handleDelete}
          onSetCover={handleSetCover}
          type="photo"
          fields={[
            { name: 'name', label: 'Photo Name', type: 'text', required: true },
            { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'genre', label: 'Genre', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'date', label: 'Date', type: 'text', placeholder: 'MM/YY' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'upload_image', label: 'Upload Photo', type: 'image' }
          ]}
        />
      )}
    </div>
  )
}

// Helper function to create mixed layout sizing
const getCardSize = (index) => {
  const patterns = ['large', 'medium', 'medium', 'small', 'small', 'medium', 'large', 'small']
  return `card-${patterns[index % patterns.length]}`
}

export default ShutterTales 