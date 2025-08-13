import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SpotLight.css'
import { text } from '@constants/language'
import SearchBar from '@components/molecules/SearchBar'
import Button from '@components/atoms/Button'
import Icon from '@components/atoms/Icon'
import { setPortfolio, setLoading, setError } from '@features/spotLight/spotLightSlice'
import { supabase } from '@utils/supabase'
import VisualMediaModal from '@components/organisms/VisualMediaModal'

const SpotLight = () => {
  const dispatch = useDispatch()
  const { portfolio, loading, error } = useSelector(state => state.spotLight)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModal, setSelectedModal] = useState(null)
  const [filteredPortfolio, setFilteredPortfolio] = useState([])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [coverImage, setCoverImage] = useState(null)
  const [featuredImages, setFeaturedImages] = useState([])

  useEffect(() => {
    fetchPortfolio()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      // Show search bar after scrolling 60% of viewport height
      setShowSearchBar(scrollY > windowHeight * 0.6)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchPortfolio = async () => {
    dispatch(setLoading(true))
    try {
      const { data, error } = await supabase
        .from('spot_light')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      const portfolioData = data || []
      dispatch(setPortfolio(portfolioData))
      // Always initialize filtered portfolio when data is first loaded
      setFilteredPortfolio(portfolioData)
    } catch (err) {
      console.error('Error fetching portfolio:', err)
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const setupLayoutImages = () => {
    if (portfolio.length === 0) return
    
    // Check for saved cover image preference
    const savedCoverId = localStorage.getItem('spot-light-cover')
    let coverImage = portfolio[0] // Default to first image
    
    if (savedCoverId) {
      const savedCover = portfolio.find(item => item.id === savedCoverId)
      if (savedCover) {
        coverImage = savedCover
        // Reorder portfolio to put saved cover first
        const reorderedPortfolio = [savedCover, ...portfolio.filter(p => p.id !== savedCoverId)]
        setFilteredPortfolio(reorderedPortfolio)
      }
    }
    
    // Set cover image
    setCoverImage(coverImage)
    
    // Set next 6 images as featured tiled images (excluding cover)
    const remainingImages = portfolio.filter(p => p.id !== coverImage.id)
    setFeaturedImages(remainingImages.slice(0, 6))
  }

  // Search when data loads or search query changes
  useEffect(() => {
    if (portfolio.length > 0) {
      console.log('🔄 Search query changed:', searchQuery)
      
      if (!searchQuery.trim()) {
        console.log('⭐ Clearing search - showing all portfolio items:', portfolio.length)
        setFilteredPortfolio(portfolio)
        setupLayoutImages()
        return
      }

      const filtered = portfolio.filter(item =>
        item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      console.log('🎯 Search results:', filtered.length, 'out of', portfolio.length)
      setFilteredPortfolio(filtered)
      setupLayoutImages()
    }
  }, [searchQuery, portfolio])

  const openModal = (item) => {
    setSelectedModal(item)
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
          .from('spot_light')
          .insert([{
            user_id: 'bf7f746f-bba4-40bb-87a3-dab4574589a1', // Replace with actual user ID
            ...data
          }])
        
        if (error) throw error
      } else if (mode === 'edit') {
        const { error } = await supabase
          .from('spot_light')
          .update(data)
          .eq('id', data.id)
        
        if (error) throw error
      }
      
      await fetchPortfolio() // Refresh the list
      return true
    } catch (error) {
      console.error('Error saving portfolio item:', error)
      return false
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('spot_light')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await fetchPortfolio() // Refresh the list
      return true
    } catch (error) {
      console.error('Error deleting portfolio item:', error)
      return false
    }
  }

  const handleSetCover = (item) => {
    // Save cover selection to localStorage
    localStorage.setItem('spot-light-cover', item.id)
    
    // Set the selected item as the first in the portfolio to make it the cover
    const newPortfolio = [item, ...portfolio.filter(p => p.id !== item.id)]
    dispatch(setPortfolio(newPortfolio))
    setupLayoutImages()
    setSelectedModal(null) // Close modal
  }

  // Get remaining images for masonry grid (excluding cover and featured)
  const masonryImages = filteredPortfolio.slice(7)

  if (loading && portfolio.length === 0) {
    return (
      <div className="spot-light spot-light--loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="spot-light">
      {/* Sticky Search Bar - appears on scroll */}
      <div className={`spot-light__sticky-search ${showSearchBar ? 'visible' : ''}`}>
        <div className="spot-light__sticky-content">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search portfolio..."
            className="spot-light__search"
          />
          <Button
            variant="primary"
            onClick={handleAddNew}
            className="spot-light__add-btn"
          >
            <Icon name="add" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="spot-light__desktop-layout">
        {/* Left Cover Image */}
        {coverImage && (
          <div className="spot-light__cover-section">
            <div className="spot-light__cover-image" onClick={() => openModal(coverImage)}>
              <img src={coverImage.image_url} alt="Portfolio Cover" />
              <div className="spot-light__cover-overlay">
                <div className="spot-light__cover-content">
                  <h1 className="spot-light__title">{text.categories.spotLight.title}</h1>
                  <p className="spot-light__subtitle">Personal Portfolio & Visual Story</p>
                  <div className="spot-light__cover-info">
                    <span className="spot-light__featured-label">Featured Work</span>
                    <p className="spot-light__location">
                      <Icon name="location" />
                      {coverImage.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Tiled Layout */}
        <div className="spot-light__featured-section">
          {/* Search Bar for Desktop */}
          <div className="spot-light__desktop-search">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search portfolio..."
              className="spot-light__search"
            />
            <Button
              variant="primary"
              onClick={handleAddNew}
              className="spot-light__add-btn"
            >
              <Icon name="add" />
            </Button>
          </div>
          
          <div className="spot-light__featured-grid">
            {featuredImages.map((item, index) => (
              <div
                key={item.id}
                className={`spot-light__featured-item item-${index + 1}`}
                onClick={() => openModal(item)}
              >
                <img src={item.image_url} alt={item.description || 'Portfolio item'} />
                <div className="spot-light__featured-overlay">
                  <div className="spot-light__featured-info">
                    <span className="spot-light__category">{item.category}</span>
                    <span className="spot-light__genre">{item.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="spot-light__mobile-layout">
        <div className="spot-light__mobile-hero">
          {coverImage && (
            <div className="spot-light__mobile-cover" onClick={() => openModal(coverImage)}>
              <img src={coverImage.image_url} alt="Portfolio Cover" />
              <div className="spot-light__mobile-overlay">
                <h1 className="spot-light__title">{text.categories.spotLight.title}</h1>
                <p className="spot-light__subtitle">Personal Portfolio</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="spot-light__mobile-search">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search portfolio..."
            className="spot-light__search"
          />
          <Button
            variant="primary"
            onClick={handleAddNew}
            className="spot-light__add-btn"
          >
            <Icon name="add" />
          </Button>
        </div>
      </div>

      {/* Masonry Grid Section */}
      <div className="spot-light__masonry-section">
        {error && (
          <div className="spot-light__error">
            <p>Error: {error}</p>
            <Button onClick={fetchPortfolio}>Retry</Button>
          </div>
        )}

        {masonryImages.length === 0 && filteredPortfolio.length <= 7 && !loading ? (
          <div className="spot-light__empty">
            <Icon name="star" size="48" />
            <h3>
              {searchQuery.trim() ? 
                `No portfolio items found for "${searchQuery}"` : 
                text.categories.spotLight.emptyState
              }
            </h3>
            {!searchQuery.trim() && (
              <Button variant="primary" onClick={handleAddNew}>
                <Icon name="add" />
                Add Your Work
              </Button>
            )}
            {searchQuery.trim() && (
              <Button variant="secondary" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="spot-light__masonry">
            {masonryImages.map((item, index) => (
              <div 
                key={item.id}
                className={`spot-light__masonry-item ${getMasonrySize(index)}`}
                onClick={() => openModal(item)}
              >
                <img src={item.image_url} alt={item.description || 'Portfolio item'} />
                <div className="spot-light__masonry-overlay">
                  <div className="spot-light__masonry-info">
                    <p className="spot-light__masonry-location">
                      <Icon name="location" />
                      {item.location}
                    </p>
                    <div className="spot-light__masonry-tags">
                      <span className="tag">{item.genre}</span>
                      <span className="tag">{item.category}</span>
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
          type="portfolio"
          fields={[
            { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'genre', label: 'Genre', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'date', label: 'Date', type: 'text', placeholder: 'MM/YY' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'upload_image', label: 'Upload Image', type: 'image' }
          ]}
        />
      )}
    </div>
  )
}

// Helper function for masonry sizing
const getMasonrySize = (index) => {
  const patterns = ['tall', 'wide', 'square', 'tall', 'square', 'wide']
  return patterns[index % patterns.length]
}

export default SpotLight 