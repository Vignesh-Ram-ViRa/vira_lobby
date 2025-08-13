import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import ImageUpload from '@components/molecules/ImageUpload';
import { 
  closeModal, 
  openModal,
  addArtwork, 
  updateArtwork, 
  deleteArtwork,
  setError 
} from '@features/scribbles/scribblesSlice';
import { LANGUAGE } from '@constants/language';
import { hobbyDb } from '@utils/supabase';
import { useAuth } from '@hooks/useAuth';
import './ArtworkModal.css';

const ArtworkModal = () => {
  const dispatch = useDispatch();
  const { showModal, modalMode, currentArtwork } = useSelector(state => state.scribbles);
  const { hasWriteAccess, user, isGuest } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    genre: '',
    category: '',
    date: '',
    description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize form data when modal opens or artwork changes
  useEffect(() => {
    if (currentArtwork && (modalMode === 'edit' || modalMode === 'view')) {
      setFormData({
        name: currentArtwork.name || '',
        image_url: currentArtwork.image_url || '',
        genre: currentArtwork.genre || '',
        category: currentArtwork.category || '',
        date: currentArtwork.date || '',
        description: currentArtwork.description || ''
      });
    } else if (modalMode === 'add') {
      setFormData({
        name: '',
        image_url: '',
        genre: '',
        category: '',
        date: '',
        description: ''
      });
    }
  }, [currentArtwork, modalMode]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl
    }));
  };

  // Validate form
  const validateForm = () => {
    console.log('🎨 Scribbles validation:', {
      name: formData.name,
      image_url: formData.image_url,
      formData
    });
    
    if (!formData.name.trim()) {
      dispatch(setError('Artwork name is required'));
      return false;
    }
    if (!formData.image_url.trim()) {
      dispatch(setError('Artwork image is required'));
      return false;
    }
    return true;
  };

    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🎨 Scribbles handleSubmit called:', {
      modalMode,
      formData,
      hasWriteAccess: hasWriteAccess()
    });

    if (!validateForm()) return;
    
    // Check if user has write access
    if (!hasWriteAccess()) {
      if (isGuest) {
        dispatch(setError('Guest users cannot save artworks. Please sign in to save your work.'));
      } else if (!user) {
        dispatch(setError('You must be signed in to save artworks.'));
      } else {
        dispatch(setError('You do not have permission to save artworks.'));
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (modalMode === 'add') {
        // Create new artwork in Supabase
        const artworkData = {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data, error } = await hobbyDb.scribbles.create(artworkData);
        
        if (error) {
          throw new Error(error.message);
        }

        // Update Redux state with the new artwork (including the ID from Supabase)
        dispatch(addArtwork(data[0]));
        
      } else if (modalMode === 'edit') {
        // Update existing artwork in Supabase
        const artworkData = {
          ...formData,
          updated_at: new Date().toISOString()
        };

        const { error } = await hobbyDb.scribbles.update(currentArtwork.id, artworkData);
        
        if (error) {
          throw new Error(error.message);
        }

        // Update Redux state with the updated artwork
        dispatch(updateArtwork({ ...artworkData, id: currentArtwork.id, created_at: currentArtwork.created_at }));
      }
      
      handleClose();
    } catch (error) {
      console.error('Save error:', error);
      dispatch(setError(`Failed to save artwork: ${error.message}`));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (currentArtwork) {
      // Check if user has write access
      if (!hasWriteAccess()) {
        if (isGuest) {
          dispatch(setError('Guest users cannot delete artworks. Please sign in to manage artworks.'));
        } else if (!user) {
          dispatch(setError('You must be signed in to delete artworks.'));
        } else {
          dispatch(setError('You do not have permission to delete artworks.'));
        }
        setShowDeleteConfirm(false);
        return;
      }

      try {
        setIsSubmitting(true);
        
        // Delete from Supabase
        const { error } = await hobbyDb.scribbles.delete(currentArtwork.id);
        
        if (error) {
          throw new Error(error.message);
        }

        // Update Redux state
        dispatch(deleteArtwork(currentArtwork.id));
        handleClose();
      } catch (error) {
        console.error('Delete error:', error);
        dispatch(setError(`Failed to delete artwork: ${error.message}`));
      } finally {
        setIsSubmitting(false);
        setShowDeleteConfirm(false);
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    setShowDeleteConfirm(false);
    dispatch(closeModal());
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!showModal) return null;

  const isReadOnly = modalMode === 'view';
  const isEditing = modalMode === 'edit';
  const isAdding = modalMode === 'add';

  return (
    <div className="artwork-modal-backdrop" onClick={handleBackdropClick}>
      <div className="artwork-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isAdding && LANGUAGE.scribbles.addArtwork}
            {isEditing && LANGUAGE.scribbles.editArtwork}
            {isReadOnly && LANGUAGE.scribbles.viewArtwork}
          </h2>
          <button 
            className="close-btn"
            onClick={handleClose}
            title="Close"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {isReadOnly ? (
            // View Mode
            <div className="artwork-view">
              <div className="artwork-image-section">
                <img 
                  src={currentArtwork?.image_url} 
                  alt={currentArtwork?.name}
                  className="artwork-display-image"
                />
              </div>
              
              <div className="artwork-details">
                <h3 className="artwork-name">{currentArtwork?.name}</h3>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>{LANGUAGE.scribbles.genre}:</label>
                    <span>{currentArtwork?.genre}</span>
                  </div>
                  
                  <div className="detail-item">
                    <label>{LANGUAGE.scribbles.category}:</label>
                    <span>{currentArtwork?.category}</span>
                  </div>
                  
                  <div className="detail-item">
                    <label>{LANGUAGE.scribbles.date}:</label>
                    <span>{currentArtwork?.date}</span>
                  </div>
                </div>
                
                {currentArtwork?.description && (
                  <div className="description-section">
                    <label>{LANGUAGE.scribbles.description}:</label>
                    <p className="artwork-description">{currentArtwork.description}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Add/Edit Mode
            <form onSubmit={handleSubmit} className="artwork-form">
              <div className="form-grid">
                {/* Image Upload Section */}
                <div className="image-upload-section">
                  <label className="form-label">{LANGUAGE.scribbles.artworkImage} *</label>
                                  <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageUpload={handleImageUpload}
                  className="artwork-image-upload"
                />
                </div>

                {/* Form Fields */}
                <div className="form-fields">
                  <div className="field-group">
                    <label className="form-label">{LANGUAGE.scribbles.artworkName} *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input"
                      placeholder="Enter artwork name"
                      required
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="form-label">{LANGUAGE.scribbles.genre}</label>
                      <select
                        value={formData.genre}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select genre</option>
                        <option value="Digital Art">Digital Art</option>
                        <option value="Character Design">Character Design</option>
                        <option value="Sketch">Sketch</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Fan Art">Fan Art</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Doodle">Doodle</option>
                        <option value="Horror">Horror</option>
                        <option value="Watercolor">Watercolor</option>
                        <option value="Architecture">Architecture</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="form-label">{LANGUAGE.scribbles.category}</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select category</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Concept Art">Concept Art</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Steampunk">Steampunk</option>
                        <option value="Anime Style">Anime Style</option>
                        <option value="Urban">Urban</option>
                        <option value="Nature">Nature</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Color Study">Color Study</option>
                        <option value="Mixed Media">Mixed Media</option>
                        <option value="Superhero">Superhero</option>
                        <option value="Environment">Environment</option>
                        <option value="Observational">Observational</option>
                        <option value="Animals">Animals</option>
                        <option value="Dark Fantasy">Dark Fantasy</option>
                        <option value="Gothic">Gothic</option>
                        <option value="Botanical">Botanical</option>
                        <option value="Seascape">Seascape</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="form-label">{LANGUAGE.scribbles.date}</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="form-input"
                      placeholder="MM/YY"
                      pattern="[0-9]{2}/[0-9]{2}"
                    />
                  </div>

                  <div className="field-group">
                    <label className="form-label">{LANGUAGE.scribbles.description}</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-textarea"
                      placeholder="Describe your artwork..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {isReadOnly ? (
            <div className="view-actions">
              <Button
                variant="secondary"
                onClick={() => dispatch(openModal({ mode: 'edit', artwork: currentArtwork }))}
              >
                <Icon name="edit" />
                {LANGUAGE.common.edit}
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Icon name="delete" />
                {LANGUAGE.common.delete}
              </Button>
            </div>
          ) : (
            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                {LANGUAGE.common.cancel}
              </Button>
              
              {isEditing && (
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSubmitting}
                >
                  <Icon name="delete" />
                  {LANGUAGE.common.delete}
                </Button>
              )}
              
              <Button
                variant="primary"
                type="button"
                onClick={(e) => {
                  console.log('🎨 Save button clicked!');
                  handleSubmit(e);
                }}
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="hourglass_empty" className="spinning" />
                    {LANGUAGE.common.saving}
                  </>
                ) : (
                  <>
                    <Icon name="save" />
                    {isAdding ? LANGUAGE.common.add : LANGUAGE.common.save}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="delete-confirm-overlay">
            <div className="delete-confirm">
              <h3>Delete Artwork</h3>
              <p>Are you sure you want to delete "{currentArtwork?.name}"? This action cannot be undone.</p>
              <div className="delete-actions">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkModal; 