import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@components/atoms/Icon';
import { openModal } from '@features/scribbles/scribblesSlice';
import './StackedGallery.css';

const StackedGallery = ({ artworks = [], isLoading = false }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const [dragOffset, setDragOffset] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && artworks.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change artwork every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, artworks.length]);

  // Handle mouse interactions
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsAutoPlaying(true);
    }
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setDragStart({ x: e.clientX, index: currentIndex });
    setDragOffset(0);
    galleryRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dragDistance = e.clientX - dragStart.x;
    setDragOffset(dragDistance);
    
    // Determine if we should change slides based on drag distance
    const threshold = 100;
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Dragging right - go to previous
        goToPrevious();
      } else {
        // Dragging left - go to next
        goToNext();
      }
      setDragStart({ x: e.clientX, index: currentIndex });
      setDragOffset(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
    galleryRef.current.style.cursor = 'grab';
    setIsAutoPlaying(true);
  };

  // Add global mouse events
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart, currentIndex]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleArtworkClick = (artwork) => {
    dispatch(openModal({ mode: 'view', artwork }));
  };

  if (isLoading) {
    return (
      <div className="stacked-gallery loading">
        <div className="loading-placeholder">
          <Icon name="image" />
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return (
      <div className="stacked-gallery empty">
        <div className="empty-state">
          <Icon name="palette" />
          <p>No artworks to display</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="stacked-gallery"
      ref={galleryRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Main artwork display */}
      <div className="gallery-container">
        {artworks.map((artwork, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index === (currentIndex - 1 + artworks.length) % artworks.length;
          const isNext = index === (currentIndex + 1) % artworks.length;
          const isFarLeft = index === (currentIndex - 2 + artworks.length) % artworks.length;
          const isFarRight = index === (currentIndex + 2) % artworks.length;
          
          let className = 'artwork-card';
          if (isActive) className += ' active';
          else if (isPrevious) className += ' previous';
          else if (isNext) className += ' next';
          else if (isFarLeft) className += ' far-left';
          else if (isFarRight) className += ' far-right';
          else className += ' hidden';

          return (
            <div
              key={artwork.id}
              className={className}
              onClick={() => handleArtworkClick(artwork)}
              style={{ 
                '--index': index,
                transform: isActive && isDragging ? `translateX(${dragOffset}px)` : undefined
              }}
            >
              <div className="artwork-image-container">
                <img 
                  src={artwork.image_url} 
                  alt={artwork.name}
                  className="artwork-image"
                  loading="lazy"
                />
                <div className="artwork-overlay">
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artwork.name}</h3>
                    <p className="artwork-meta">
                      {artwork.genre} • {artwork.category}
                    </p>
                    <p className="artwork-date">{artwork.date}</p>
                  </div>
                  <button className="expand-btn" title="View Details">
                    <Icon name="open_in_full" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation controls */}
        <button 
          className="nav-btn prev-btn"
          onClick={goToPrevious}
          title="Previous artwork"
        >
          <Icon name="chevron_left" />
        </button>

        <button 
          className="nav-btn next-btn"
          onClick={goToNext}
          title="Next artwork"
        >
          <Icon name="chevron_right" />
        </button>

        {/* Auto-play control */}
        <button 
          className={`play-pause-btn ${isAutoPlaying ? 'playing' : 'paused'}`}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <Icon name={isAutoPlaying ? 'pause' : 'play_arrow'} />
        </button>
      </div>

      {/* Thumbnail navigation */}
      <div className="thumbnail-nav">
        {artworks.map((artwork, index) => (
          <button
            key={artwork.id}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            title={artwork.name}
          >
            <img 
              src={artwork.image_url} 
              alt={artwork.name}
              className="thumbnail-image"
            />
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="progress-indicator">
        <div className="progress-dots">
          {artworks.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Gallery info */}
      <div className="gallery-info">
        <span className="artwork-counter">
          {currentIndex + 1} / {artworks.length}
        </span>
      </div>
    </div>
  );
};

export default StackedGallery; 