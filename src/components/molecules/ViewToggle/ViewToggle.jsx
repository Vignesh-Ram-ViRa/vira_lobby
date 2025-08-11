import React from 'react'
import { Icon } from '@components/atoms/Icon'
import './ViewToggle.css'

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${currentView === 'grid' ? 'active' : ''}`}
        onClick={() => onViewChange('grid')}
        title="Grid View"
      >
        <Icon name="grid" size={18} />
      </button>
      <button
        className={`view-toggle-btn ${currentView === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        title="List View"
      >
        <Icon name="list" size={18} />
      </button>
    </div>
  )
}

export default ViewToggle 