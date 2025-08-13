import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '@components/molecules/SearchBar';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import StackedGallery from '@components/organisms/StackedGallery';
import ArtworkGrid from '@components/organisms/ArtworkGrid';
import ArtworkModal from '@components/organisms/ArtworkModal';
import { 
  setArtworks, 
  setSearchTerm, 
  openModal, 
  setLayout,
  setSortBy,
  setFilters,
  setLoading,
  setError
} from '@features/scribbles/scribblesSlice';
import { LANGUAGE } from '@constants/language';
import { supabase } from '@utils/supabase';
import './Scribbles.css';

const Scribbles = () => {
  const dispatch = useDispatch();
  const { 
    artworks, 
    filteredArtworks, 
    searchTerm, 
    filters, 
    layout, 
    sortBy, 
    isLoading, 
    showModal,
    heroGallery
  } = useSelector(state => state.scribbles);

  // Fetch artworks from database
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        dispatch(setLoading(true));
        const { data, error } = await supabase
          .from('scribbles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          dispatch(setError(error.message));
          console.error('Error fetching artworks:', error);
        } else {
          dispatch(setArtworks(data || []));
        }
      } catch (err) {
        dispatch(setError(err.message));
        console.error('Error:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchArtworks();
  }, [dispatch]);

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleAddArtwork = () => {
    dispatch(openModal({ mode: 'add' }));
  };

  const handleLayoutChange = (newLayout) => {
    dispatch(setLayout(newLayout));
  };

  const handleSortChange = (newSort) => {
    dispatch(setSortBy(newSort));
  };

  const getUniqueGenres = () => {
    return [...new Set(artworks.map(artwork => artwork.genre).filter(Boolean))];
  };

  const getUniqueCategories = () => {
    return [...new Set(artworks.map(artwork => artwork.category).filter(Boolean))];
  };

  return (
    <div className="scribbles-container">
      {/* Page Title Section */}
      <section className="scribbles-title-section">
        <div className="scribbles-title-content">
          <h1 className="scribbles-main-title">{LANGUAGE.scribbles.heroTitle}</h1>
          <p className="scribbles-main-subtitle">{LANGUAGE.scribbles.heroSubtitle}</p>
        </div>
      </section>

      {/* Rolling Gallery Section */}
      <section className="scribbles-gallery-section">
        <StackedGallery 
          artworks={heroGallery}
          isLoading={isLoading}
          className="scribbles-stacked-gallery"
        />
      </section>

      {/* Action Bar Section */}
      <section className="scribbles-action-bar">
        <div className="scribbles-action-content">
          {/* Single Action Row */}
          <div className="scribbles-single-row">
            <SearchBar
              value={searchTerm}
              onChange={handleSearch}
              placeholder={LANGUAGE.scribbles.searchPlaceholder}
              className="scribbles-search-input"
            />
            
            <select 
              value={filters.genre} 
              onChange={(e) => dispatch(setFilters({ genre: e.target.value }))}
              className="scribbles-filter-select"
            >
              <option value="">{LANGUAGE.scribbles.allGenres}</option>
              {getUniqueGenres().map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select 
              value={filters.category} 
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
              className="scribbles-filter-select"
            >
              <option value="">{LANGUAGE.scribbles.allCategories}</option>
              {getUniqueCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
              className="scribbles-filter-select"
            >
              <option value="date">{LANGUAGE.common.sortByDate}</option>
              <option value="name">{LANGUAGE.common.sortByName}</option>
              <option value="genre">{LANGUAGE.scribbles.sortByGenre}</option>
              <option value="category">{LANGUAGE.scribbles.sortByCategory}</option>
            </select>

            <Button
              variant="primary"
              onClick={handleAddArtwork}
              className="scribbles-add-btn"
              title={LANGUAGE.scribbles.addArtwork}
            >
              <Icon name="add" />
            </Button>

            <div className="scribbles-layout-controls">
              <button
                className={`scribbles-layout-btn ${layout === 'bento' ? 'scribbles-layout-active' : ''}`}
                onClick={() => handleLayoutChange('bento')}
                title={LANGUAGE.scribbles.layouts.bento}
              >
                <Icon name="dashboard" />
              </button>
              <button
                className={`scribbles-layout-btn ${layout === 'stack' ? 'scribbles-layout-active' : ''}`}
                onClick={() => handleLayoutChange('stack')}
                title={LANGUAGE.scribbles.layouts.stack}
              >
                <Icon name="layers" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork Grid Section */}
      <section className="scribbles-grid-section">
        <div className="scribbles-grid-container">
          <ArtworkGrid 
            artworks={filteredArtworks}
            layout={layout}
            isLoading={isLoading}
            className="scribbles-artwork-grid"
          />
        </div>
      </section>

      {/* Modal */}
      {showModal && <ArtworkModal />}
    </div>
  );
};

export default Scribbles; 