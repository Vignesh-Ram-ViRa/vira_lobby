import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@components/atoms/Icon'
import { text } from '@constants/language'
import './SearchBar.css'

const SearchBar = ({ 
  searchQuery = '', 
  onSearchChange, 
  placeholder,
  filters = [],
  activeFilters = {},
  onFilterChange,
  className = '' 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const searchRef = useRef(null)
  const filterRef = useRef(null)

  // Update local query when external searchQuery changes
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  // Handle search input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearchChange && localQuery !== searchQuery) {
        onSearchChange(localQuery)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [localQuery, onSearchChange, searchQuery])

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

  const handleSearchInputChange = (e) => {
    setLocalQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setLocalQuery('')
    if (onSearchChange) {
      onSearchChange('')
    }
    searchRef.current?.focus()
  }

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleFilterChange = (filterKey, value) => {
    if (onFilterChange) {
      onFilterChange(filterKey, value)
    }
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && value !== 'all' && (Array.isArray(value) ? value.length > 0 : true)
    ).length
  }

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__main">
        {/* Search Input */}
        <div className="search-bar__input-container">
          <Icon name="search" size={18} className="search-bar__search-icon" />
          <input
            ref={searchRef}
            type="text"
            value={localQuery}
            onChange={handleSearchInputChange}
            placeholder={placeholder || text.actions.search}
            className="search-bar__input"
            aria-label={placeholder || text.actions.search}
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="search-bar__clear-button"
              aria-label="Clear search"
            >
              <Icon name="x" size={16} />
            </button>
          )}
        </div>

        {/* Filter Button */}
        {filters.length > 0 && (
          <div className="search-bar__filter-container" ref={filterRef}>
            <button
              type="button"
              onClick={handleFilterToggle}
              className={`search-bar__filter-button ${isFilterOpen ? 'search-bar__filter-button--active' : ''}`}
              aria-label={text.actions.filter}
              aria-expanded={isFilterOpen}
            >
              <Icon name="plus" size={18} />
              {getActiveFilterCount() > 0 && (
                <span className="search-bar__filter-count">
                  {getActiveFilterCount()}
                </span>
              )}
              <Icon name="chevron-down" size={14} className="search-bar__filter-arrow" />
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="search-bar__filter-dropdown">
                <div className="search-bar__filter-header">
                  <span>{text.actions.filter}</span>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="search-bar__filter-close"
                    aria-label="Close filters"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
                
                <div className="search-bar__filter-content">
                  {filters.map(filter => (
                    <div key={filter.key} className="search-bar__filter-group">
                      <label className="search-bar__filter-label">
                        {filter.label}
                      </label>
                      
                      {filter.type === 'select' && (
                        <select
                          value={activeFilters[filter.key] || 'all'}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="search-bar__filter-select"
                        >
                          <option value="all">{text.filters.all}</option>
                          {filter.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {filter.type === 'multiselect' && (
                        <div className="search-bar__filter-multiselect">
                          {filter.options.map(option => (
                            <label key={option.value} className="search-bar__filter-checkbox">
                              <input
                                type="checkbox"
                                checked={(activeFilters[filter.key] || []).includes(option.value)}
                                onChange={(e) => {
                                  const currentValues = activeFilters[filter.key] || []
                                  const newValues = e.target.checked
                                    ? [...currentValues, option.value]
                                    : currentValues.filter(v => v !== option.value)
                                  handleFilterChange(filter.key, newValues)
                                }}
                                className="search-bar__checkbox-input"
                              />
                              <span className="search-bar__checkbox-label">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {filter.type === 'range' && (
                        <div className="search-bar__filter-range">
                          <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step || 1}
                            value={activeFilters[filter.key] || filter.min}
                            onChange={(e) => handleFilterChange(filter.key, Number(e.target.value))}
                            className="search-bar__range-input"
                          />
                          <div className="search-bar__range-labels">
                            <span>{filter.min}</span>
                            <span>{activeFilters[filter.key] || filter.min}</span>
                            <span>{filter.max}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar 