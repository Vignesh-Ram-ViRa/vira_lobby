import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@components/atoms/Icon'
import { text } from '@constants/language'
import './HobbyTile.css'

const HobbyTile = ({ 
  hobby, 
  count = 0, 
  topGenres = [], 
  averageRating = 0, 
  recentActivity = null,
  isLoading = false 
}) => {
  const navigate = useNavigate()

  const getHobbyIcon = (hobbyKey) => {
    const iconMap = {
      bookworm: 'book',
      bingescape: 'device-desktop',
      filmFrenzy: 'play-circle',
      otakuHub: 'heart',
      wanderlog: 'location',
      scribbles: 'paintbrush',
      shutterTales: 'device-camera',
      spotLight: 'star'
    }
    return iconMap[hobbyKey] || 'circle'
  }

  const getHobbyRoute = (hobbyKey) => {
    const routeMap = {
      bookworm: '/bookworm',
      bingescape: '/bingescape',
      filmFrenzy: '/film-frenzy',
      otakuHub: '/otaku-hub',
      wanderlog: '/wanderlog',
      scribbles: '/scribbles',
      shutterTales: '/shutter-tales',
      spotLight: '/spot-light'
    }
    return routeMap[hobbyKey] || '/'
  }

  const handleTileClick = () => {
    navigate(getHobbyRoute(hobby))
  }

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return text.dashboard.tiles.noData
    return genres.slice(0, 3).join(', ')
  }

  const formatRating = (rating) => {
    if (!rating || rating === 0) return '—'
    return `${rating.toFixed(1)}★`
  }

  const formatRecentActivity = (activity) => {
    if (!activity) return text.dashboard.tiles.noData
    
    const date = new Date(activity.created_at)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  if (isLoading) {
    return (
      <div className="hobby-tile hobby-tile--loading">
        <div className="hobby-tile__header">
          <div className="hobby-tile__icon hobby-tile__icon--loading" />
          <div className="hobby-tile__title hobby-tile__title--loading" />
        </div>
        <div className="hobby-tile__stats">
          <div className="hobby-tile__stat hobby-tile__stat--loading" />
          <div className="hobby-tile__stat hobby-tile__stat--loading" />
          <div className="hobby-tile__stat hobby-tile__stat--loading" />
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`hobby-tile hobby-tile--${hobby}`}
      onClick={handleTileClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleTileClick()
        }
      }}
      aria-label={`Navigate to ${text.categories[hobby]?.title || hobby}`}
    >
      <div className="hobby-tile__header">
        <div className="hobby-tile__icon">
          <Icon name={getHobbyIcon(hobby)} size={24} />
        </div>
        <div className="hobby-tile__content">
          <h3 className="hobby-tile__title">
            {text.categories[hobby]?.title || hobby}
          </h3>
          <p className="hobby-tile__description">
            {text.categories[hobby]?.description || ''}
          </p>
        </div>
      </div>

      <div className="hobby-tile__stats">
        <div className="hobby-tile__stat">
          <span className="hobby-tile__stat-label">
            {text.dashboard.tiles.totalCount}
          </span>
          <span className="hobby-tile__stat-value">
            {count.toLocaleString()}
          </span>
        </div>

        <div className="hobby-tile__stat">
          <span className="hobby-tile__stat-label">
            {text.dashboard.tiles.topGenres}
          </span>
          <span className="hobby-tile__stat-value">
            {formatGenres(topGenres)}
          </span>
        </div>

        <div className="hobby-tile__stat">
          <span className="hobby-tile__stat-label">
            {text.dashboard.tiles.averageRating}
          </span>
          <span className="hobby-tile__stat-value">
            {formatRating(averageRating)}
          </span>
        </div>

        <div className="hobby-tile__stat">
          <span className="hobby-tile__stat-label">
            {text.dashboard.tiles.recentActivity}
          </span>
          <span className="hobby-tile__stat-value">
            {formatRecentActivity(recentActivity)}
          </span>
        </div>
      </div>

      <div className="hobby-tile__footer">
        <Icon name="chevron-right" size={16} />
      </div>
    </div>
  )
}

export default HobbyTile 