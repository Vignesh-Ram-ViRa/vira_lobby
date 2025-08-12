import React, { useState } from 'react'
import { Icon } from '@components/atoms/Icon'
import './HobbyTable.css'

const HobbyTable = ({ 
  items = [], 
  columns = [],
  onItemClick,
  onAction,
  emptyMessage = "No items found",
  emptyIcon = "grid"
}) => {
  const [sortField, setSortField] = useState(columns[0]?.field || 'title')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // Handle different data types
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue?.toLowerCase() || ''
    }

    // Handle arrays (like genres)
    if (Array.isArray(aValue)) {
      aValue = aValue.join(', ').toLowerCase()
      bValue = bValue?.join(', ').toLowerCase() || ''
    }

    // Handle dates
    if (sortField.includes('date') || sortField.includes('created_at')) {
      aValue = new Date(aValue || 0)
      bValue = new Date(bValue || 0)
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const SortableHeader = ({ field, children, width }) => (
    <th 
      className={`sortable-header ${sortField === field ? 'sorted' : ''}`}
      onClick={() => handleSort(field)}
      style={{ width }}
    >
      <div className="header-content">
        {children}
        <Icon 
          name={sortField === field && sortOrder === 'desc' ? 'chevron-down' : 'chevron-up'} 
          size={14}
          className={`sort-icon ${sortField === field ? 'active' : ''}`}
        />
      </div>
    </th>
  )

  const renderStarRating = (rating) => (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          name={i < (rating || 0) ? 'star' : 'star-outline'}
          size={14}
          className={i < (rating || 0) ? 'star-filled' : 'star-empty'}
        />
      ))}
    </div>
  )

  const renderGenres = (genres) => (
    <div className="genres-container">
      {genres?.slice(0, 2).map((genre, idx) => (
        <span key={idx} className="genre-tag">
          {genre}
        </span>
      ))}
      {genres?.length > 2 && (
        <span className="genre-more">+{genres.length - 2}</span>
      )}
    </div>
  )

  const renderCellContent = (item, column) => {
    const value = item[column.field]
    
    switch (column.type) {
      case 'image':
        return (
          <img
            src={value}
            alt={item.title || item.name}
            className="table-image"
            onError={(e) => {
              e.target.src = `https://source.unsplash.com/random/60x80/?${item.genres?.[0] || 'placeholder'}&sig=${item.id}`
            }}
          />
        )
      case 'rating':
        return renderStarRating(value)
      case 'genres':
        return renderGenres(value)
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-'
      case 'link':
        return value ? (
          <button
            className="link-button"
            onClick={(e) => {
              e.stopPropagation()
              window.open(value, '_blank')
            }}
            title="Open Link"
          >
            <Icon name="external-link" size={16} />
          </button>
        ) : '-'
      case 'actions':
        return (
          <div className="action-buttons">
            <button
              className="action-btn info-btn"
              onClick={(e) => {
                e.stopPropagation()
                onAction?.(item, 'view')
              }}
              title="View Details"
            >
              <Icon name="info" size={16} />
            </button>
            <button
              className="action-btn edit-btn"
              onClick={(e) => {
                e.stopPropagation()
                onAction?.(item, 'edit')
              }}
              title="Edit"
            >
              <Icon name="edit" size={16} />
            </button>
            {item.watch_download_link && (
              <button
                className="action-btn play-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(item.watch_download_link, '_blank')
                }}
                title="Watch/Play"
              >
                <Icon name="play" size={16} />
              </button>
            )}
            {item.read_download_link && (
              <button
                className="action-btn read-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(item.read_download_link, '_blank')
                }}
                title="Read"
              >
                <Icon name="eye" size={16} />
              </button>
            )}
          </div>
        )
      default:
        return value || '-'
    }
  }

  return (
    <div className="hobby-table">
      <div className="table-container">
        <table className="hobby-table__table">
          <thead>
            <tr>
              {columns.map((column) => (
                column.sortable ? (
                  <SortableHeader key={column.field} field={column.field} width={column.width}>
                    {column.label}
                  </SortableHeader>
                ) : (
                  <th key={column.field} style={{ width: column.width }}>
                    {column.label}
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr 
                key={item.id} 
                className="hobby-table__row"
                onClick={() => onItemClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={`${item.id}-${column.field}`} className={`cell-${column.type || 'text'}`}>
                    {renderCellContent(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedItems.length === 0 && (
        <div className="hobby-table__empty">
          <Icon name={emptyIcon} size={48} />
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default HobbyTable 