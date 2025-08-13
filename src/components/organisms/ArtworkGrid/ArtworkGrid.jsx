import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@components/atoms/Icon';
import { openModal } from '@features/scribbles/scribblesSlice';
import './ArtworkGrid.css';

const ArtworkGrid = ({ artworks = [], layout = 'masonry', isLoading = false }) => {
  const dispatch = useDispatch();
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const gridRef = useRef(null);

  // Handle artwork interactions
  const handleArtworkClick = (artwork) => {
    dispatch(openModal({ mode: 'view', artwork }));
  };

  const handleEditClick = (e, artwork) => {
    e.stopPropagation();
    dispatch(openModal({ mode: 'edit', artwork }));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="artwork-grid loading">
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="loading-card">
              <div className="loading-image"></div>
              <div className="loading-content">
                <div className="loading-title"></div>
                <div className="loading-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!artworks || artworks.length === 0) {
    return (
      <div className="artwork-grid empty">
        <div className="empty-state">
          <Icon name="palette" />
          <h3>No Artworks Found</h3>
          <p>Create your first artwork or adjust your search filters</p>
        </div>
      </div>
    );
  }

  // Render artwork card
  const renderArtworkCard = (artwork, index) => {
    const isHovered = hoveredArtwork === artwork.id;
    
    return (
      <div
        key={artwork.id}
        className={`artwork-card layout-${layout} ${isHovered ? 'hovered' : ''}`}
        onClick={() => handleArtworkClick(artwork)}
        onMouseEnter={() => setHoveredArtwork(artwork.id)}
        onMouseLeave={() => setHoveredArtwork(null)}
        style={{
          '--card-index': index,
          '--grid-row-span': layout === 'bento' ? getBentoRowSpan(index) : 'auto',
          '--grid-col-span': layout === 'bento' ? getBentoColSpan(index) : 'auto'
        }}
      >
        <div className="artwork-image-container">
          <img 
            src={artwork.image_url} 
            alt={artwork.name}
            className="artwork-image"
            loading="lazy"
          />
          
          {/* Hover overlay */}
          <div className="artwork-overlay">
            <div className="overlay-content">
              <div className="artwork-info">
                <h4 className="artwork-title">{artwork.name}</h4>
                <p className="artwork-genre">{artwork.genre}</p>
                <p className="artwork-category">{artwork.category}</p>
                <p className="artwork-date">{artwork.date}</p>
              </div>
              
              <div className="artwork-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleArtworkClick(artwork)}
                  title="View Details"
                >
                  <Icon name="visibility" />
                </button>
                <button 
                  className="action-btn edit-btn"
                  onClick={(e) => handleEditClick(e, artwork)}
                  title="Edit Artwork"
                >
                  <Icon name="edit" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick info badge */}
          <div className="quick-info">
            <span className="genre-badge">{artwork.genre}</span>
          </div>
        </div>

        {/* Card content (visible on some layouts) */}
        <div className="card-content">
          <h4 className="card-title">{artwork.name}</h4>
          <p className="card-meta">{artwork.category} • {artwork.date}</p>
          {layout === 'stack' && (
            <p className="card-description">
              {artwork.description?.slice(0, 100)}...
            </p>
          )}
        </div>
      </div>
    );
  };

  // Bento box layout helpers
  const getBentoRowSpan = (index) => {
    const patterns = [2, 1, 1, 2, 1, 2, 1, 1]; // Varying heights
    return patterns[index % patterns.length];
  };

  const getBentoColSpan = (index) => {
    const patterns = [1, 2, 1, 1, 1, 1, 2, 1]; // Varying widths
    return patterns[index % patterns.length];
  };

  return (
    <div className={`artwork-grid layout-${layout}`} ref={gridRef}>
      <div className={`grid-container ${layout}-layout`}>
        {artworks.map((artwork, index) => renderArtworkCard(artwork, index))}
      </div>
      
      {/* Layout-specific decorations */}
      {layout === 'stack' && (
        <div className="stack-decoration">
          <div className="floating-elements">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`floating-element element-${i + 1}`}>
                <Icon name="auto_awesome" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkGrid; 