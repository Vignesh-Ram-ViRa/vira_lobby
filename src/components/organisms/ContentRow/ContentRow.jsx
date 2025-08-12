import React, { useState, useRef } from 'react'
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
  const rowRef = useRef(null)

  const updateScrollButtons = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setScrollPosition(scrollLeft)
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount

      rowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleItemClick = (item, index) => {
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
      <h2 className="content-row__title">{title}</h2>
      
      <div className="content-row__wrapper">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            className="content-row__nav content-row__nav--left"
            onClick={() => scroll('left')}
          >
            <Icon name="chevron-left" size={32} />
          </button>
        )}

        {/* Content Container */}
        <div
          ref={rowRef}
          className="content-row__container"
          onScroll={updateScrollButtons}
        >
          <div className="content-row__items">
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                className={`content-row__item content-row__item--${itemType}`}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleItemClick(item, index)}
                onHoverStart={() => handleItemHover(item, index, true)}
                onHoverEnd={() => handleItemHover(item, index, false)}
              >
                <div className="content-row__item-image">
                  <img
                    src={item.poster_image_url || item.cover_image_url}
                    alt={item.title}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
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

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            className="content-row__nav content-row__nav--right"
            onClick={() => scroll('right')}
          >
            <Icon name="chevron-right" size={32} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ContentRow 