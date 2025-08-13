import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TravelGalleryModal.css';
import Icon from '../../atoms/Icon';
import { closeGalleryModal, setCurrentImageIndex } from '../../../features/wanderlog/wanderlogSlice';

const TravelGalleryModal = () => {
  const dispatch = useDispatch();
  const { galleryImages, currentImageIndex } = useSelector(state => state.wanderlog);

  const handleClose = () => {
    dispatch(closeGalleryModal());
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    dispatch(setCurrentImageIndex(newIndex));
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    dispatch(setCurrentImageIndex(newIndex));
  };

  const handleThumbnailClick = (index) => {
    dispatch(setCurrentImageIndex(index));
  };

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="travel-gallery-modal-overlay" onClick={handleClose}>
      <div className="travel-gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="travel-gallery-close">
          <Icon name="close" />
        </button>

        <div className="travel-gallery-main">
          <button 
            onClick={handlePrevious} 
            className="travel-gallery-nav travel-gallery-prev"
            disabled={galleryImages.length <= 1}
          >
            <Icon name="chevron-left" />
          </button>

          <div className="travel-gallery-image-container">
            <img 
              src={galleryImages[currentImageIndex]} 
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="travel-gallery-image"
            />
          </div>

          <button 
            onClick={handleNext} 
            className="travel-gallery-nav travel-gallery-next"
            disabled={galleryImages.length <= 1}
          >
            <Icon name="chevron-right" />
          </button>
        </div>

        <div className="travel-gallery-info">
          <span className="travel-gallery-counter">
            {currentImageIndex + 1} / {galleryImages.length}
          </span>
        </div>

        {galleryImages.length > 1 && (
          <div className="travel-gallery-thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`travel-gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelGalleryModal; 