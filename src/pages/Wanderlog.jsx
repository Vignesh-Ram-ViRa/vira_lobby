import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Wanderlog.css';
import TravelSearchBar from '../components/molecules/TravelSearchBar';
import TravelFilterChips from '../components/molecules/TravelFilterChips';
import TravelViewToggle from '../components/molecules/TravelViewToggle';
import TravelGrid from '../components/organisms/TravelGrid';
import TravelList from '../components/organisms/TravelList';
import TravelModal from '../components/organisms/TravelModal';
import TravelGalleryModal from '../components/organisms/TravelGalleryModal';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';
import { setTrips, setLoading, setError, openModal } from '../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../constants/language';
import { supabase } from '../utils/supabase';

const Wanderlog = () => {
  const dispatch = useDispatch();
  const { 
    filteredTrips, 
    viewMode, 
    showModal, 
    showGalleryModal,
    isLoading 
  } = useSelector(state => state.wanderlog);

  useEffect(() => {
    // Fetch trips from database
    const fetchTrips = async () => {
      try {
        dispatch(setLoading(true));
        const { data, error } = await supabase
          .from('wanderlog')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          dispatch(setError(error.message));
          console.error('Error fetching trips:', error);
        } else {
          dispatch(setTrips(data || []));
        }
      } catch (err) {
        dispatch(setError(err.message));
        console.error('Error:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTrips();
  }, [dispatch]);

  const handleAddTrip = () => {
    dispatch(openModal({ mode: 'add' }));
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export trips to Excel');
  };

  return (
    <div className="wanderlog-page">
      {/* Hero Banner Section */}
      <div className="wanderlog-hero">
        <div className="wanderlog-hero-content">
          <h1 className="wanderlog-title">{LANGUAGE.wanderlog.title}</h1>
          <p className="wanderlog-subtitle">{LANGUAGE.wanderlog.subtitle}</p>
          <div className="wanderlog-hero-stats">
            <div className="wanderlog-stat">
              <span className="wanderlog-stat-number">{filteredTrips.length}</span>
              <span className="wanderlog-stat-label">Destinations</span>
            </div>
            <div className="wanderlog-stat">
              <span className="wanderlog-stat-number">
                {filteredTrips.reduce((acc, trip) => acc + trip.star_rating, 0) / filteredTrips.length || 0}⭐
              </span>
              <span className="wanderlog-stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
        <div className="wanderlog-hero-grid">
          {filteredTrips.slice(0, 6).map((trip, index) => (
            <div key={trip.id} className={`wanderlog-hero-image wanderlog-hero-image-${index + 1}`}>
              <img 
                src={trip.cover_image_url} 
                alt={`${trip.city}, ${trip.country}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="wanderlog-header">

        <div className="wanderlog-search-section">
          <TravelSearchBar />
        </div>

        <div className="wanderlog-filter-section">
          <TravelFilterChips />
        </div>

        <div className="wanderlog-actions-section">
          <div className="wanderlog-actions-left">
            <TravelViewToggle />
          </div>
          <div className="wanderlog-actions-right">
            <Button 
              variant="secondary" 
              onClick={handleExport}
              className="wanderlog-export-btn"
              title={LANGUAGE.common.export}
            >
              <Icon name="download" />
            </Button>
            <Button 
              variant="primary" 
              onClick={handleAddTrip}
              className="wanderlog-add-btn"
              title={LANGUAGE.wanderlog.addTrip}
            >
              <Icon name="add" />
            </Button>
          </div>
        </div>
      </div>

      <div className="wanderlog-content">
        {isLoading ? (
          <div className="wanderlog-loading">
            <Icon name="loading" />
            <span>{LANGUAGE.common.loading}</span>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="wanderlog-empty">
            <Icon name="location" />
            <h3>{LANGUAGE.wanderlog.noTrips}</h3>
            <p>{LANGUAGE.wanderlog.addFirstTrip}</p>
            <Button variant="primary" onClick={handleAddTrip} title={LANGUAGE.wanderlog.addTrip}>
              <Icon name="add" />
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <TravelGrid trips={filteredTrips} />
            ) : (
              <TravelList trips={filteredTrips} />
            )}
          </>
        )}
      </div>

      {showModal && <TravelModal />}
      {showGalleryModal && <TravelGalleryModal />}
    </div>
  );
};

export default Wanderlog; 