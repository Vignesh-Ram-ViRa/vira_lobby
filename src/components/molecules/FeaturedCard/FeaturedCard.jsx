import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@components/atoms/Icon'
import { text } from '@constants/language'
import './FeaturedCard.css'

const FeaturedCard = ({ 
  hobby,
  count = 0,
  topGenres = [],
  averageRating = 0,
  recentActivity = null,
  className = '',
  variant = 'large' // 'large', 'medium'
}) => {
  const navigate = useNavigate()

  const getHobbyConfig = (hobbyKey) => {
    const configs = {
      bookworm: {
        icon: 'book',
        route: '/bookworm',
        gradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
        illustration: '📚',
        pattern: 'books'
      },
      bingescape: {
        icon: 'device-desktop',
        route: '/bingescape',
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
        illustration: '📺',
        pattern: 'screens'
      },
      filmFrenzy: {
        icon: 'play-circle',
        route: '/film-frenzy',
        gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6EE5DD 100%)',
        illustration: '🎬',
        pattern: 'film'
      },
      otakuHub: {
        icon: 'heart',
        route: '/otaku-hub',
        gradient: 'linear-gradient(135deg, #FF69B4 0%, #FFB3E6 100%)',
        illustration: '🎌',
        pattern: 'anime'
      },
      wanderlog: {
        icon: 'location',
        route: '/wanderlog',
        gradient: 'linear-gradient(135deg, #32CD32 0%, #7FFF7F 100%)',
        illustration: '🗺️',
        pattern: 'travel'
      },
      scribbles: {
        icon: 'paintbrush',
        route: '/scribbles',
        gradient: 'linear-gradient(135deg, #FF7F50 0%, #FFA07A 100%)',
        illustration: '🎨',
        pattern: 'art'
      },
      shutterTales: {
        icon: 'device-camera',
        route: '/shutter-tales',
        gradient: 'linear-gradient(135deg, #9370DB 0%, #B19CD9 100%)',
        illustration: '📸',
        pattern: 'camera'
      },
      spotLight: {
        icon: 'star',
        route: '/spot-light',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFF700 100%)',
        illustration: '⭐',
        pattern: 'stars'
      }
    }
    return configs[hobbyKey] || configs.bookworm
  }

  const config = getHobbyConfig(hobby)
  const categoryText = text.categories[hobby] || {}

  const handleCardClick = () => {
    navigate(config.route)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  }

  return (
    <motion.div
      className={`featured-card featured-card--${variant} featured-card--${hobby} ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={handleCardClick}
      style={{ '--hobby-gradient': config.gradient }}
    >
      {/* Background Effects */}
      <div className="featured-card__background">
        <div className="featured-card__gradient" />
        <div className="featured-card__pattern" data-pattern={config.pattern} />
        <div className="featured-card__glow" />
        <div className="featured-card__noise" />
      </div>

      {/* Floating Elements */}
      <div className="featured-card__decorations">
        <motion.div 
          className="featured-card__float featured-card__float--1"
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="featured-card__float featured-card__float--2"
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="featured-card__float featured-card__float--3"
          animate={{ 
            y: [-5, 15, -5],
            rotate: [0, 8, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="featured-card__content">
        <div className="featured-card__header">
          <motion.div 
            className="featured-card__icon"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name={config.icon} size={32} />
          </motion.div>
          
          <div className="featured-card__title-section">
            <motion.h2 
              className="featured-card__title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {categoryText.title}
            </motion.h2>
            <motion.p 
              className="featured-card__description"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {categoryText.description}
            </motion.p>
          </div>

          <motion.div 
            className="featured-card__illustration"
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ duration: 0.3 }}
          >
            {config.illustration}
          </motion.div>
        </div>

        <div className="featured-card__stats">
          <motion.div 
            className="featured-card__stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="featured-card__stat-value">{count}</span>
            <span className="featured-card__stat-label">Items</span>
          </motion.div>

          <motion.div 
            className="featured-card__stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="featured-card__stat-value">
              {averageRating > 0 ? `${averageRating.toFixed(1)}★` : '—'}
            </span>
            <span className="featured-card__stat-label">Rating</span>
          </motion.div>

          <motion.div 
            className="featured-card__stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="featured-card__stat-value">
              {topGenres.length}
            </span>
            <span className="featured-card__stat-label">Genres</span>
          </motion.div>
        </div>

        <motion.div 
          className="featured-card__genres"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {topGenres.slice(0, 3).map((genre, index) => (
            <span key={genre} className="featured-card__genre-tag">
              {genre}
            </span>
          ))}
          {topGenres.length === 0 && (
            <span className="featured-card__genre-tag featured-card__genre-tag--empty">
              No genres yet
            </span>
          )}
        </motion.div>
      </div>

      {/* Action Indicator */}
      <motion.div 
        className="featured-card__action"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <Icon name="chevron-right" size={20} />
      </motion.div>

      {/* Interactive Ripple Effect */}
      <div className="featured-card__ripple" />
    </motion.div>
  )
}

export default FeaturedCard 