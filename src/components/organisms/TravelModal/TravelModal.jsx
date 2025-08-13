import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TravelModal.css';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import ImageUpload from '../../molecules/ImageUpload';
import { closeModal, addTrip, updateTrip, deleteTrip } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';
import { supabase } from '../../../utils/supabase';

const TravelModal = () => {
  const dispatch = useDispatch();
  const { currentTrip, modalMode } = useSelector(state => state.wanderlog);
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    area: '',
    attractions: [],
    highlight: '',
    date: '',
    star_rating: 5,
    photos_link: '',
    sample_images: [],
    cover_image_url: '',
    comment: ''
  });
  const [attractionInput, setAttractionInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (currentTrip && (modalMode === 'view' || modalMode === 'edit')) {
      setFormData({
        city: currentTrip.city || '',
        country: currentTrip.country || '',
        area: currentTrip.area || '',
        attractions: currentTrip.attractions || [],
        highlight: currentTrip.highlight || '',
        date: currentTrip.date || '',
        star_rating: currentTrip.star_rating || 5,
        photos_link: currentTrip.photos_link || '',
        sample_images: currentTrip.sample_images || [],
        cover_image_url: currentTrip.cover_image_url || '',
        comment: currentTrip.comment || ''
      });
    } else if (modalMode === 'add') {
      setFormData({
        city: '',
        country: '',
        area: '',
        attractions: [],
        highlight: '',
        date: '',
        star_rating: 5,
        photos_link: '',
        sample_images: [],
        cover_image_url: '',
        comment: ''
      });
    }
  }, [currentTrip, modalMode]);

  const handleClose = () => {
    dispatch(closeModal());
    setShowDeleteConfirm(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (imageUrl) => {
    handleInputChange('cover_image_url', imageUrl);
  };

  const handleSampleImageUpload = async (file) => {
    try {
      // Import the uploadImage function dynamically
      const { uploadImage } = await import('../../../utils/supabase');
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading sample image:', error);
      throw error;
    }
  };

  const handleAddAttraction = () => {
    if (attractionInput.trim() && !formData.attractions.includes(attractionInput.trim())) {
      setFormData(prev => ({
        ...prev,
        attractions: [...prev.attractions, attractionInput.trim()]
      }));
      setAttractionInput('');
    }
  };

  const handleRemoveAttraction = (index) => {
    setFormData(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = () => {
    const choice = window.confirm('Choose how to add image:\nOK = Upload file\nCancel = Enter URL');
    
    if (choice) {
      // Upload file
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file && formData.sample_images.length < 5) {
          try {
            const imageUrl = await handleSampleImageUpload(file);
            if (imageUrl) {
              setFormData(prev => ({
                ...prev,
                sample_images: [...prev.sample_images, imageUrl]
              }));
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
          }
        }
      };
      input.click();
    } else {
      // Enter URL
      const url = prompt('Enter image URL:');
      if (url && formData.sample_images.length < 5) {
        setFormData(prev => ({
          ...prev,
          sample_images: [...prev.sample_images, url]
        }));
      }
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      sample_images: prev.sample_images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.city.trim() || !formData.country.trim()) {
      alert('City and Country are required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (modalMode === 'add') {
        const { data, error } = await supabase
          .from('wanderlog')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        dispatch(addTrip(data));
      } else if (modalMode === 'edit') {
        const { data, error } = await supabase
          .from('wanderlog')
          .update(formData)
          .eq('id', currentTrip.id)
          .select()
          .single();

        if (error) throw error;
        dispatch(updateTrip(data));
      }
      handleClose();
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Error saving trip: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!currentTrip) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('wanderlog')
        .delete()
        .eq('id', currentTrip.id);

      if (error) throw error;
      dispatch(deleteTrip(currentTrip.id));
      handleClose();
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Error deleting trip: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={interactive ? () => handleInputChange('star_rating', index + 1) : undefined}
        className={`travel-modal-star ${index < rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
        disabled={!interactive}
      >
        <Icon name="star" />
      </button>
    ));
  };

  const isViewMode = modalMode === 'view';
  const isEditMode = modalMode === 'edit';
  const isAddMode = modalMode === 'add';

  return (
    <div className="travel-modal-overlay" onClick={handleClose}>
      <div className="travel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="travel-modal-header">
          <h2 className="travel-modal-title">
            {isViewMode && `${formData.city}, ${formData.country}`}
            {isEditMode && 'Edit Trip'}
            {isAddMode && 'Add New Trip'}
          </h2>
          <div className="travel-modal-header-actions">
            {isViewMode && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => dispatch({ type: 'wanderlog/openModal', payload: { mode: 'edit', trip: currentTrip } })}
                  className="travel-modal-edit-btn"
                  title="Edit Trip"
                >
                  <Icon name="edit" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="travel-modal-delete-btn"
                  title="Delete Trip"
                >
                  <Icon name="trash" />
                </Button>
              </>
            )}
            <button onClick={handleClose} className="travel-modal-close">
              <Icon name="close" />
            </button>
          </div>
        </div>

        <div className="travel-modal-content">
          {showDeleteConfirm ? (
            <div className="travel-modal-delete-confirm">
              <Icon name="alert-triangle" />
              <h3>Delete Trip</h3>
              <p>Are you sure you want to delete this trip? This action cannot be undone.</p>
              <div className="travel-modal-delete-actions">
                <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="travel-modal-form">
              {/* Cover Image */}
              {formData.cover_image_url && (
                <div className="travel-modal-cover">
                  <img src={formData.cover_image_url} alt="Cover" />
                </div>
              )}

              <div className="travel-modal-form-grid">
                {/* Basic Information */}
                <div className="travel-modal-form-section">
                  <h3>Location Details</h3>
                  
                  <div className="travel-modal-form-row">
                    <div className="travel-modal-form-group">
                      <label>City *</label>
                      {isViewMode ? (
                        <span className="travel-modal-field-value">{formData.city}</span>
                      ) : (
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      )}
                    </div>
                    
                    <div className="travel-modal-form-group">
                      <label>Country *</label>
                      {isViewMode ? (
                        <span className="travel-modal-field-value">{formData.country}</span>
                      ) : (
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div className="travel-modal-form-group">
                    <label>Area/State</label>
                    {isViewMode ? (
                      <span className="travel-modal-field-value">{formData.area || 'Not specified'}</span>
                    ) : (
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                      />
                    )}
                  </div>
                </div>

                {/* Trip Details */}
                <div className="travel-modal-form-section">
                  <h3>Trip Details</h3>
                  
                  <div className="travel-modal-form-row">
                    <div className="travel-modal-form-group">
                      <label>Date (MM/YY)</label>
                      {isViewMode ? (
                        <span className="travel-modal-field-value">{formData.date || 'Not specified'}</span>
                      ) : (
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                      )}
                    </div>
                    
                    <div className="travel-modal-form-group">
                      <label>Rating</label>
                      <div className="travel-modal-rating">
                        {renderStars(formData.star_rating, !isViewMode)}
                      </div>
                    </div>
                  </div>

                  <div className="travel-modal-form-group">
                    <label>Highlight</label>
                    {isViewMode ? (
                      <p className="travel-modal-field-value">{formData.highlight || 'No highlight provided'}</p>
                    ) : (
                      <textarea
                        value={formData.highlight}
                        onChange={(e) => handleInputChange('highlight', e.target.value)}
                        rows="3"
                      />
                    )}
                  </div>
                </div>

                {/* Attractions */}
                <div className="travel-modal-form-section travel-modal-form-section-full">
                  <h3>Attractions</h3>
                  <div className="travel-modal-attractions">
                    {formData.attractions.map((attraction, index) => (
                      <span key={index} className="travel-modal-attraction-tag">
                        {attraction}
                        {!isViewMode && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAttraction(index)}
                            className="travel-modal-attraction-remove"
                          >
                            <Icon name="close" />
                          </button>
                        )}
                      </span>
                    ))}
                    {!isViewMode && (
                      <div className="travel-modal-attraction-input">
                        <input
                          type="text"
                          value={attractionInput}
                          onChange={(e) => setAttractionInput(e.target.value)}
                          placeholder="Add attraction..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAttraction())}
                        />
                        <Button type="button" onClick={handleAddAttraction} variant="secondary">
                          <Icon name="add" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div className="travel-modal-form-section travel-modal-form-section-full">
                  <h3>Images</h3>
                  
                  <div className="travel-modal-form-group">
                    <label>Cover Image URL</label>
                    {isViewMode ? (
                      <span className="travel-modal-field-value">{formData.cover_image_url || 'No cover image'}</span>
                    ) : (
                      <input
                        type="url"
                        value={formData.cover_image_url}
                        onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
                        placeholder="https://..."
                      />
                    )}
                  </div>

                  {!isViewMode && (
                    <div className="travel-modal-form-group">
                      <label>Or Upload Cover Image</label>
                      <ImageUpload
                        currentImageUrl={formData.cover_image_url}
                        onImageUpload={handleImageUpload}
                        disabled={false}
                      />
                    </div>
                  )}

                  <div className="travel-modal-form-group">
                    <label>Sample Images ({formData.sample_images.length}/5)</label>
                    <div className="travel-modal-images">
                      {formData.sample_images.map((image, index) => (
                        <div key={index} className="travel-modal-image">
                          <img src={image} alt={`Sample ${index + 1}`} />
                          {!isViewMode && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="travel-modal-image-remove"
                            >
                              <Icon name="close" />
                            </button>
                          )}
                        </div>
                      ))}
                      {!isViewMode && formData.sample_images.length < 5 && (
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="travel-modal-image-add"
                        >
                          <Icon name="add" />
                          Add Image
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="travel-modal-form-group">
                    <label>Photos Link</label>
                    {isViewMode ? (
                      formData.photos_link ? (
                        <a href={formData.photos_link} target="_blank" rel="noopener noreferrer" className="travel-modal-link">
                          View Photos
                        </a>
                      ) : (
                        <span className="travel-modal-field-value">No photos link</span>
                      )
                    ) : (
                      <input
                        type="url"
                        value={formData.photos_link}
                        onChange={(e) => handleInputChange('photos_link', e.target.value)}
                      />
                    )}
                  </div>
                </div>

                {/* Comments */}
                <div className="travel-modal-form-section travel-modal-form-section-full">
                  <h3>Comments</h3>
                  <div className="travel-modal-form-group">
                    {isViewMode ? (
                      <p className="travel-modal-field-value">{formData.comment || 'No comments provided'}</p>
                    ) : (
                      <textarea
                        value={formData.comment}
                        onChange={(e) => handleInputChange('comment', e.target.value)}
                        rows="4"
                        placeholder="Share your thoughts about this trip..."
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              {!isViewMode && (
                <div className="travel-modal-form-actions">
                  <Button type="button" variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : (isAddMode ? 'Add Trip' : 'Update Trip')}
                  </Button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelModal; 