import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  filteredTrips: [],
  searchTerm: '',
  filters: {
    starRating: '',
    dateRange: '',
    attractions: []
  },
  viewMode: 'grid', // 'grid' or 'list'
  sortBy: 'date', // 'date', 'rating', 'alphabetical'
  sortOrder: 'desc', // 'asc' or 'desc'
  isLoading: false,
  error: null,
  currentTrip: null,
  showModal: false,
  modalMode: 'view', // 'view', 'add', 'edit'
  showGalleryModal: false,
  galleryImages: [],
  currentImageIndex: 0
};

const wanderlogSlice = createSlice({
  name: 'wanderlog',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
      state.filteredTrips = action.payload;
    },
    addTrip: (state, action) => {
      state.trips.unshift(action.payload);
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    updateTrip: (state, action) => {
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
        wanderlogSlice.caseReducers.applyFiltersAndSort(state);
      }
    },
    deleteTrip: (state, action) => {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      wanderlogSlice.caseReducers.applyFiltersAndSort(state);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    openModal: (state, action) => {
      state.showModal = true;
      state.modalMode = action.payload.mode;
      state.currentTrip = action.payload.trip || null;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalMode = 'view';
      state.currentTrip = null;
    },
    openGalleryModal: (state, action) => {
      state.showGalleryModal = true;
      state.galleryImages = action.payload.images;
      state.currentImageIndex = action.payload.index || 0;
    },
    closeGalleryModal: (state) => {
      state.showGalleryModal = false;
      state.galleryImages = [];
      state.currentImageIndex = 0;
    },
    setCurrentImageIndex: (state, action) => {
      state.currentImageIndex = action.payload;
    },
    applyFiltersAndSort: (state) => {
      let filtered = [...state.trips];

      // Apply search (location first, then attractions and highlights)
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(trip => {
          // Priority 1: Location (city, country, area)
          const locationMatch = trip.city.toLowerCase().includes(searchLower) ||
                               trip.country.toLowerCase().includes(searchLower) ||
                               (trip.area && trip.area.toLowerCase().includes(searchLower));
          
          if (locationMatch) return true;

          // Priority 2: Attractions
          const attractionsMatch = trip.attractions && 
                                 trip.attractions.some(attraction => 
                                   attraction.toLowerCase().includes(searchLower));
          
          if (attractionsMatch) return true;

          // Priority 3: Highlights
          const highlightMatch = trip.highlight && 
                               trip.highlight.toLowerCase().includes(searchLower);
          
          return highlightMatch;
        });
      }

      // Apply filters
      if (state.filters.starRating) {
        filtered = filtered.filter(trip => trip.star_rating >= parseInt(state.filters.starRating));
      }

      if (state.filters.attractions.length > 0) {
        filtered = filtered.filter(trip => 
          trip.attractions && 
          state.filters.attractions.some(filterAttraction =>
            trip.attractions.some(tripAttraction =>
              tripAttraction.toLowerCase().includes(filterAttraction.toLowerCase())
            )
          )
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue, bValue;

        switch (state.sortBy) {
          case 'date':
            aValue = a.date || '';
            bValue = b.date || '';
            break;
          case 'rating':
            aValue = a.star_rating || 0;
            bValue = b.star_rating || 0;
            break;
          case 'alphabetical':
            aValue = a.city.toLowerCase();
            bValue = b.city.toLowerCase();
            break;
          default:
            aValue = a.created_at;
            bValue = b.created_at;
        }

        if (state.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      state.filteredTrips = filtered;
    }
  }
});

export const {
  setTrips,
  addTrip,
  updateTrip,
  deleteTrip,
  setSearchTerm,
  setFilters,
  clearFilters,
  setViewMode,
  setSortBy,
  setSortOrder,
  setLoading,
  setError,
  openModal,
  closeModal,
  openGalleryModal,
  closeGalleryModal,
  setCurrentImageIndex
} = wanderlogSlice.actions;

export default wanderlogSlice.reducer; 