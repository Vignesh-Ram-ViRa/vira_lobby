import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import './ContentRow.css'

const ContentRow = ({ 
  title, 
  items = [], 
  onItemClick, 
  onItemHover,
  itemType = 'poster' // 'poster' or 'backdrop' 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const rowRef = useRef(null)

  useEffect(() => {
    // Initial scroll button state check
    updateScrollButtons()
    
    // Show scroll indicator for a few seconds on mount if scrollable
    if (canScrollRight) {
      setShowScrollIndicator(true)
      const timer = setTimeout(() => setShowScrollIndicator(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [items])

  const updateScrollButtons = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setScrollPosition(scrollLeft)
      setCanScrollLeft(scrollLeft > 5) // Small threshold for smoother UX
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75 // Slightly less aggressive scrolling
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount

      rowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
    }
  }

  // Touch/drag scrolling for better mobile experience
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, scrollLeft: rowRef.current.scrollLeft })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return
    e.preventDefault()
    const walk = (e.clientX - dragStart.x) * 2 // Multiply for faster scrolling
    rowRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  const handleItemClick = (item, index) => {
    // Prevent click during drag
    if (isDragging) return
    if (onItemClick) {
      onItemClick(item, index)
    }
  }

  const handleItemHover = (item, index, isHovered) => {
    if (onItemHover) {
      onItemHover(item, index, isHovered)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="content-row">
      <div className="content-row__header">
        <h2 className="content-row__title">{title}</h2>
        
        {/* Scroll Indicator */}
        {showScrollIndicator && canScrollRight && (
          <motion.div 
            className="content-row__scroll-hint"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span>Scroll for more</span>
            <Icon name="chevron-right" size={16} />
          </motion.div>
        )}
      </div>
      
      <div className="content-row__wrapper">
        {/* Left Arrow - Always visible when scrollable */}
        <motion.button
          className="content-row__nav content-row__nav--left"
          onClick={() => scroll('left')}
          animate={{ 
            opacity: canScrollLeft ? 1 : 0.3,
            scale: canScrollLeft ? 1 : 0.8
          }}
          whileHover={{ scale: canScrollLeft ? 1.1 : 0.8 }}
          whileTap={{ scale: canScrollLeft ? 0.95 : 0.8 }}
          disabled={!canScrollLeft}
        >
          <Icon name="chevron-left" size={24} />
        </motion.button>

        {/* Content Container */}
        <div
          ref={rowRef}
          className={`content-row__container ${isDragging ? 'content-row__container--dragging' : ''}`}
          onScroll={updateScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="content-row__items">
            {/* Progress indicator */}
            <div className="content-row__progress">
              <div 
                className="content-row__progress-bar"
                style={{
                  width: `${((scrollPosition / (rowRef.current?.scrollWidth - rowRef.current?.clientWidth || 1)) * 100)}%`
                }}
              />
            </div>
            
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                className={`content-row__item content-row__item--${itemType}`}
                whileHover={{ scale: isDragging ? 1 : 1.05, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleItemClick(item, index)}
                onHoverStart={() => handleItemHover(item, index, true)}
                onHoverEnd={() => handleItemHover(item, index, false)}
                style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
              >
                <div className="content-row__item-image">
                  <img
                    src={item.poster_image_url || item.cover_image_url}
                    alt={item.title}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                    draggable={false} // Prevent default image drag
                  />
                  
                  {/* Fallback with Unsplash */}
                  <div className="content-row__item-fallback">
                    <div 
                      className="content-row__fallback-bg"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1489599735734-79b4169f88c4?w=300&h=400&fit=crop&auto=format&q=80&seed=${item.id || Math.random()})`
                      }}
                    />
                    <div className="content-row__fallback-content">
                      <Icon name="play" size={32} />
                      <span>{item.title}</span>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="content-row__item-overlay">
                    <div className="content-row__item-actions">
                      <button 
                        className="content-row__action content-row__action--play"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle play action - open watch link
                          if (item.watch_download_link) {
                            window.open(item.watch_download_link, '_blank')
                          }
                        }}
                        title="Play/Watch"
                      >
                        <Icon name="play" size={16} />
                      </button>
                      
                      <button 
                        className="content-row__action content-row__action--add"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle add to favorites/watchlist
                          console.log('Added to watchlist:', item.title)
                          // TODO: Implement add to favorites functionality
                        }}
                        title="Add to Watchlist"
                      >
                        <Icon name="plus" size={16} />
                      </button>
                      
                      <button 
                        className="content-row__action content-row__action--info"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleItemClick(item, index)
                        }}
                        title="More Info"
                      >
                        <Icon name="info" size={16} />
                      </button>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="content-row__item-info">
                      <h4 className="content-row__item-title">{item.title}</h4>
                      
                      <div className="content-row__item-metadata">
                        {item.star_rating && (
                          <span className="content-row__item-rating">
                            {'★'.repeat(item.star_rating)}
                          </span>
                        )}
                        
                        {item.genres && item.genres.length > 0 && (
                          <span className="content-row__item-genres">
                            {item.genres.slice(0, 2).join(' • ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Always visible when scrollable */}
        <motion.button
          className="content-row__nav content-row__nav--right"
          onClick={() => scroll('right')}
          animate={{ 
            opacity: canScrollRight ? 1 : 0.3,
            scale: canScrollRight ? 1 : 0.8
          }}
          whileHover={{ scale: canScrollRight ? 1.1 : 0.8 }}
          whileTap={{ scale: canScrollRight ? 0.95 : 0.8 }}
          disabled={!canScrollRight}
        >
          <Icon name="chevron-right" size={24} />
        </motion.button>
      </div>
    </div>
  )
}

export default ContentRow 