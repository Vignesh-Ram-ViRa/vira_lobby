import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TravelSearchBar.css';
import Icon from '../../atoms/Icon';
import { setSearchTerm } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';

const TravelSearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.wanderlog.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="travel-search-bar">
      <div className="travel-search-input-wrapper">
        <Icon name="search" className="travel-search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={LANGUAGE.wanderlog.searchPlaceholder}
          className="travel-search-input"
          aria-label="Search travels"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="travel-search-clear"
            aria-label="Clear search"
          >
            <Icon name="close" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TravelSearchBar; 