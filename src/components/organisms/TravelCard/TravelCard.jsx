import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TravelCard.css';
import Icon from '../../atoms/Icon';
import { openModal, openGalleryModal } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';

const TravelCard = ({ trip }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    city,
    country,
    area,
    attractions = [],
    highlight,
    date,
    star_rating,
    cover_image_url,
    sample_images = []
  } = trip;

  const handleView = () => {
    dispatch(openModal({ mode: 'view', trip }));
  };

  const handleEdit = () => {
    dispatch(openModal({ mode: 'edit', trip }));
  };

  const handleImageGallery = (e) => {
    e.stopPropagation();
    if (sample_images.length > 0) {
      dispatch(openGalleryModal({ 
        images: sample_images, 
        index: 0 
      }));
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        className={`travel-card-star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  const formatLocation = () => {
    if (area && area !== city) {
      return `${city}, ${area}`;
    }
    return `${city}, ${country}`;
  };

  const visibleAttractions = attractions.slice(0, 3);
  const remainingCount = attractions.length - 3;

  return (
    <div 
      className="travel-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleView}
    >
      <div className="travel-card-image-container">
        {!imageError && cover_image_url ? (
          <img
            src={cover_image_url}
            alt={`${city}, ${country}`}
            className="travel-card-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="travel-card-image-placeholder">
            <Icon name="location" />
            <span>No Image</span>
          </div>
        )}
        
        <div className="travel-card-overlay">
          <div className="travel-card-gradient" />
          
          <div className="travel-card-content">
            <div className="travel-card-header">
              <h3 className="travel-card-location">{formatLocation()}</h3>
              <div className="travel-card-date-rating">
                {date && <span className="travel-card-date">{date}</span>}
                <div className="travel-card-rating">
                  {renderStars(star_rating)}
                </div>
              </div>
            </div>

            <div className="travel-card-attractions">
              {visibleAttractions.map((attraction, index) => (
                <span key={index} className="travel-card-attraction-tag">
                  {attraction}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="travel-card-attraction-more">
                  +{remainingCount} more
                </span>
              )}
            </div>

            {isHovered && highlight && (
              <div className="travel-card-highlight">
                <p>{highlight}</p>
              </div>
            )}

            <div className="travel-card-footer">
              {sample_images.length > 0 && (
                <button
                  onClick={handleImageGallery}
                  className="travel-card-gallery-btn"
                  title={`${sample_images.length} photos`}
                >
                  <Icon name="image" />
                  <span>{sample_images.length}</span>
                </button>
              )}
            </div>
          </div>

          <div className="travel-card-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
              className="travel-card-action-btn"
              title={LANGUAGE.wanderlog.viewTrip}
            >
              <Icon name="eye" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="travel-card-action-btn"
              title={LANGUAGE.wanderlog.editTrip}
            >
              <Icon name="edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard; 