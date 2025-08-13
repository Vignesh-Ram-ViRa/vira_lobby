import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TravelFilterChips.css';
import Icon from '../../atoms/Icon';
import { setFilters, clearFilters, setSortBy, setSortOrder } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';

const TravelFilterChips = () => {
  const dispatch = useDispatch();
  const { filters, sortBy, sortOrder } = useSelector(state => state.wanderlog);
  const [showFilters, setShowFilters] = useState(false);

  const starRatingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const sortOptions = [
    { value: 'date', label: LANGUAGE.wanderlog.sortByDate },
    { value: 'rating', label: LANGUAGE.wanderlog.sortByRating },
    { value: 'alphabetical', label: LANGUAGE.wanderlog.sortByAlphabetical }
  ];

  const handleStarRatingFilter = (rating) => {
    dispatch(setFilters({ starRating: rating }));
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same sort field
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(newSortBy));
      dispatch(setSortOrder('desc'));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filters.starRating || filters.attractions.length > 0;

  return (
    <div className="travel-filter-chips">
      <div className="travel-filter-actions">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`travel-filter-toggle ${showFilters ? 'active' : ''}`}
        >
          <Icon name="filter" />
          Filters
          {hasActiveFilters && <span className="travel-filter-count">●</span>}
        </button>

        <div className="travel-sort-chips">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`travel-sort-chip ${sortBy === option.value ? 'active' : ''}`}
            >
              {option.label}
              {sortBy === option.value && (
                <Icon name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} />
              )}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="travel-clear-filters"
          >
            <Icon name="close" />
            Clear Filters
          </button>
        )}
      </div>

      {showFilters && (
        <div className="travel-filter-panel">
          <div className="travel-filter-group">
            <label className="travel-filter-label">
              <Icon name="star" />
              {LANGUAGE.wanderlog.filterByRating}
            </label>
            <div className="travel-filter-options">
              {starRatingOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleStarRatingFilter(option.value)}
                  className={`travel-filter-chip ${filters.starRating === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelFilterChips; 