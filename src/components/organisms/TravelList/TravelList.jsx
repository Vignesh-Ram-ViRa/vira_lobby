import React from 'react';
import { useDispatch } from 'react-redux';
import './TravelList.css';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import { openModal, openGalleryModal } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';

const TravelList = ({ trips }) => {
  const dispatch = useDispatch();

  const handleView = (trip) => {
    dispatch(openModal({ mode: 'view', trip }));
  };

  const handleEdit = (trip) => {
    dispatch(openModal({ mode: 'edit', trip }));
  };

  const handleImageGallery = (trip, e) => {
    e.stopPropagation();
    if (trip.sample_images && trip.sample_images.length > 0) {
      dispatch(openGalleryModal({ 
        images: trip.sample_images, 
        index: 0 
      }));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        className={`travel-list-star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  const formatLocation = (trip) => {
    if (trip.area && trip.area !== trip.city) {
      return `${trip.city}, ${trip.area}, ${trip.country}`;
    }
    return `${trip.city}, ${trip.country}`;
  };

  return (
    <div className="travel-list">
      <div className="travel-list-container">
        {trips.length === 0 ? (
          <div className="travel-list-empty">
            <Icon name="location" />
            <p>No trips found</p>
          </div>
        ) : (
          <div className="travel-list-items">
            {trips.map(trip => (
              <div 
                key={trip.id} 
                className="travel-list-item"
                onClick={() => handleView(trip)}
              >
                <div className="travel-list-image">
                  {trip.cover_image_url ? (
                    <img 
                      src={trip.cover_image_url} 
                      alt={formatLocation(trip)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="travel-list-image-placeholder">
                      <Icon name="location" />
                    </div>
                  )}
                </div>

                <div className="travel-list-content">
                  <div className="travel-list-header">
                    <h3 className="travel-list-location">{formatLocation(trip)}</h3>
                    <div className="travel-list-meta">
                      {trip.date && (
                        <span className="travel-list-date">{trip.date}</span>
                      )}
                      <div className="travel-list-rating">
                        {renderStars(trip.star_rating)}
                      </div>
                    </div>
                  </div>

                  <div className="travel-list-attractions">
                    {trip.attractions && trip.attractions.slice(0, 4).map((attraction, index) => (
                      <span key={index} className="travel-list-attraction-tag">
                        {attraction}
                      </span>
                    ))}
                    {trip.attractions && trip.attractions.length > 4 && (
                      <span className="travel-list-attraction-more">
                        +{trip.attractions.length - 4} more
                      </span>
                    )}
                  </div>

                  {trip.highlight && (
                    <p className="travel-list-highlight">{trip.highlight}</p>
                  )}

                  <div className="travel-list-footer">
                    <div className="travel-list-gallery-info">
                      {trip.sample_images && trip.sample_images.length > 0 && (
                        <button
                          onClick={(e) => handleImageGallery(trip, e)}
                          className="travel-list-gallery-btn"
                          title={`${trip.sample_images.length} photos`}
                        >
                          <Icon name="image" />
                          <span>{trip.sample_images.length} photos</span>
                        </button>
                      )}
                      {trip.photos_link && (
                        <a
                          href={trip.photos_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="travel-list-photos-link"
                          title="View external photos"
                        >
                          <Icon name="external-link" />
                        </a>
                      )}
                    </div>

                    <div className="travel-list-actions">
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(trip);
                        }}
                        className="travel-list-action-btn"
                        title={LANGUAGE.wanderlog.viewTrip}
                      >
                        <Icon name="eye" />
                      </Button>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(trip);
                        }}
                        className="travel-list-action-btn"
                        title={LANGUAGE.wanderlog.editTrip}
                      >
                        <Icon name="edit" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelList; 