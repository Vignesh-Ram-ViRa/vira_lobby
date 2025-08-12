import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@components/atoms/Icon'
import Button from '@components/atoms/Button'
import './HeroCarousel.css'

const HeroCarousel = ({ 
  items = [], 
  onPlay, 
  onInfo, 
  onAdd,
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const featuredItems = items.slice(0, 5) // Show max 5 featured items

  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredItems.length, autoPlayInterval])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
    setIsAutoPlaying(false)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (featuredItems.length === 0) {
    return (
      <div className="hero-carousel hero-carousel--empty">
        <div className="hero-carousel__empty-state">
          <Icon name="play" size={64} />
          <h2>No content available</h2>
          <p>Add some content to see it featured here</p>
        </div>
      </div>
    )
  }

  const currentItem = featuredItems[currentIndex]

  return (
    <div className="hero-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="hero-carousel__slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Image */}
          <div className="hero-carousel__background">
            <img 
              src={currentItem.poster_image_url || currentItem.cover_image_url} 
              alt={currentItem.title}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'flex'
              }}
            />
            <div className="hero-carousel__background-fallback">
              <Icon name="play" size={120} />
            </div>
            <div className="hero-carousel__overlay" />
          </div>

          {/* Content */}
          <div className="hero-carousel__content">
            <motion.div
              className="hero-carousel__info"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="hero-carousel__badge">
                {currentItem.verse || 'Featured'}
              </div>
              
              <h1 className="hero-carousel__title">{currentItem.title}</h1>
              
              {currentItem.description && (
                <p className="hero-carousel__description">
                  {currentItem.description.length > 200 
                    ? `${currentItem.description.substring(0, 200)}...`
                    : currentItem.description
                  }
                </p>
              )}

              {/* Metadata */}
              <div className="hero-carousel__metadata">
                {currentItem.genres && (
                  <div className="hero-carousel__genres">
                    {currentItem.genres.slice(0, 3).map((genre, index) => (
                      <span key={index} className="hero-carousel__genre">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                {currentItem.star_rating && (
                  <div className="hero-carousel__rating">
                    {'★'.repeat(currentItem.star_rating)}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="hero-carousel__actions">
                <Button
                  variant="primary"
                  onClick={() => onPlay && onPlay(currentItem)}
                  icon={<Icon name="play" size={20} />}
                  className="hero-carousel__play-btn"
                >
                  Play
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => onInfo && onInfo(currentItem)}
                  icon={<Icon name="info" size={20} />}
                  className="hero-carousel__info-btn"
                >
                  More Info
                </Button>

                <button
                  className="hero-carousel__add-btn"
                  onClick={() => onAdd && onAdd(currentItem)}
                  title="Add to My List"
                >
                  <Icon name="plus" size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {featuredItems.length > 1 && (
        <>
          <button
            className="hero-carousel__nav hero-carousel__nav--prev"
            onClick={handlePrevious}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Icon name="chevron-left" size={32} />
          </button>

          <button
            className="hero-carousel__nav hero-carousel__nav--next"
            onClick={handleNext}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Icon name="chevron-right" size={32} />
          </button>

          {/* Dots Indicator */}
          <div className="hero-carousel__indicators">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel__dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HeroCarousel 