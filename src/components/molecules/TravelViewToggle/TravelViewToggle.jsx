import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TravelViewToggle.css';
import Icon from '../../atoms/Icon';
import { setViewMode } from '../../../features/wanderlog/wanderlogSlice';
import { LANGUAGE } from '../../../constants/language';

const TravelViewToggle = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector(state => state.wanderlog.viewMode);

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <div className="travel-view-toggle">
      <button
        onClick={() => handleViewModeChange('grid')}
        className={`travel-view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
        aria-label={LANGUAGE.wanderlog.gridView}
        title={LANGUAGE.wanderlog.gridView}
      >
        <Icon name="grid" />
      </button>
      <button
        onClick={() => handleViewModeChange('list')}
        className={`travel-view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
        aria-label={LANGUAGE.wanderlog.listView}
        title={LANGUAGE.wanderlog.listView}
      >
        <Icon name="list" />
      </button>
    </div>
  );
};

export default TravelViewToggle; 