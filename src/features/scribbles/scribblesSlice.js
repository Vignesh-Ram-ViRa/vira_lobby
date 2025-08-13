import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artworks: [],
  filteredArtworks: [],
  searchTerm: '',
  filters: {
    genre: '',
    category: '',
    dateRange: ''
  },
  viewMode: 'grid', // Only grid view for this hobby (no list view)
  layout: 'bento', // 'bento', 'stack' - different creative layouts
  sortBy: 'date', // 'date', 'name', 'genre', 'category'
  sortOrder: 'desc', // 'asc' or 'desc'
  isLoading: false,
  error: null,
  currentArtwork: null,
  showModal: false,
  modalMode: 'view', // 'view', 'add', 'edit'
  heroGallery: [], // For the rolling stacked gallery at the top
  showImageModal: false,
  currentImageIndex: 0
};

const scribblesSlice = createSlice({
  name: 'scribbles',
  initialState,
  reducers: {
    setArtworks: (state, action) => {
      state.artworks = action.payload;
      state.filteredArtworks = action.payload;
      // Set hero gallery to first 5 artworks or featured ones
      state.heroGallery = action.payload.slice(0, 5);
    },
    addArtwork: (state, action) => {
      state.artworks.unshift(action.payload);
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
      // Update hero gallery
      state.heroGallery = state.artworks.slice(0, 5);
    },
    updateArtwork: (state, action) => {
      const index = state.artworks.findIndex(artwork => artwork.id === action.payload.id);
      if (index !== -1) {
        state.artworks[index] = action.payload;
        scribblesSlice.caseReducers.applyFiltersAndSort(state);
        // Update hero gallery
        state.heroGallery = state.artworks.slice(0, 5);
      }
    },
    deleteArtwork: (state, action) => {
      state.artworks = state.artworks.filter(artwork => artwork.id !== action.payload);
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
      // Update hero gallery
      state.heroGallery = state.artworks.slice(0, 5);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
    },
    clearFilters: (state) => {
      state.filters = {
        genre: '',
        category: '',
        dateRange: ''
      };
      state.searchTerm = '';
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      scribblesSlice.caseReducers.applyFiltersAndSort(state);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentArtwork: (state, action) => {
      state.currentArtwork = action.payload;
    },
    openModal: (state, action) => {
      state.showModal = true;
      state.modalMode = action.payload.mode;
      state.currentArtwork = action.payload.artwork || null;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalMode = 'view';
      state.currentArtwork = null;
    },
    openImageModal: (state, action) => {
      state.showImageModal = true;
      state.currentImageIndex = action.payload.index || 0;
    },
    closeImageModal: (state) => {
      state.showImageModal = false;
      state.currentImageIndex = 0;
    },
    nextImage: (state) => {
      const maxIndex = state.heroGallery.length - 1;
      state.currentImageIndex = state.currentImageIndex < maxIndex 
        ? state.currentImageIndex + 1 
        : 0;
    },
    previousImage: (state) => {
      const maxIndex = state.heroGallery.length - 1;
      state.currentImageIndex = state.currentImageIndex > 0 
        ? state.currentImageIndex - 1 
        : maxIndex;
    },
    applyFiltersAndSort: (state) => {
      let filtered = [...state.artworks];

      // Apply search filter
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(artwork =>
          artwork.name?.toLowerCase().includes(searchLower) ||
          artwork.description?.toLowerCase().includes(searchLower) ||
          artwork.genre?.toLowerCase().includes(searchLower) ||
          artwork.category?.toLowerCase().includes(searchLower)
        );
      }

      // Apply genre filter
      if (state.filters.genre) {
        filtered = filtered.filter(artwork => 
          artwork.genre?.toLowerCase() === state.filters.genre.toLowerCase()
        );
      }

      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(artwork => 
          artwork.category?.toLowerCase() === state.filters.category.toLowerCase()
        );
      }

      // Apply date range filter
      if (state.filters.dateRange) {
        const [startYear, endYear] = state.filters.dateRange.split('-').map(Number);
        filtered = filtered.filter(artwork => {
          if (!artwork.date) return false;
          const [month, year] = artwork.date.split('/').map(Number);
          const artworkYear = year > 50 ? 1900 + year : 2000 + year; // Handle YY format
          return artworkYear >= startYear && artworkYear <= endYear;
        });
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue, bValue;

        switch (state.sortBy) {
          case 'name':
            aValue = a.name?.toLowerCase() || '';
            bValue = b.name?.toLowerCase() || '';
            break;
          case 'genre':
            aValue = a.genre?.toLowerCase() || '';
            bValue = b.genre?.toLowerCase() || '';
            break;
          case 'category':
            aValue = a.category?.toLowerCase() || '';
            bValue = b.category?.toLowerCase() || '';
            break;
          case 'date':
          default:
            // Convert MM/YY to comparable date
            aValue = a.date ? new Date(`20${a.date.split('/')[1]}-${a.date.split('/')[0]}-01`) : new Date(0);
            bValue = b.date ? new Date(`20${b.date.split('/')[1]}-${b.date.split('/')[0]}-01`) : new Date(0);
            break;
        }

        if (aValue < bValue) return state.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return state.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      state.filteredArtworks = filtered;
    }
  }
});

export const {
  setArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  setSearchTerm,
  setFilters,
  clearFilters,
  setLayout,
  setSortBy,
  setSortOrder,
  setLoading,
  setError,
  clearError,
  setCurrentArtwork,
  openModal,
  closeModal,
  openImageModal,
  closeImageModal,
  nextImage,
  previousImage,
  applyFiltersAndSort
} = scribblesSlice.actions;

export default scribblesSlice.reducer; 