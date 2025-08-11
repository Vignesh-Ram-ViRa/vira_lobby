import { createSlice } from '@reduxjs/toolkit'

const filmFrenzySlice = createSlice({
  name: 'filmFrenzy',
  initialState: { movies: [], loading: false, error: null, searchQuery: '', sortBy: 'created_at', sortOrder: 'desc', viewMode: 'grid' },
  reducers: {
    setMovies: (state, action) => { state.movies = action.payload },
    addMovie: (state, action) => { state.movies.unshift(action.payload) },
    updateMovie: (state, action) => {
      const index = state.movies.findIndex(item => item.id === action.payload.id)
      if (index !== -1) state.movies[index] = action.payload
    },
    removeMovie: (state, action) => { state.movies = state.movies.filter(item => item.id !== action.payload) },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
    setSorting: (state, action) => { state.sortBy = action.payload.sortBy; state.sortOrder = action.payload.sortOrder },
    setViewMode: (state, action) => { state.viewMode = action.payload },
    clearError: (state) => { state.error = null }
  }
})

export const { setMovies, addMovie, updateMovie, removeMovie, setLoading, setError, setSearchQuery, setSorting, setViewMode, clearError } = filmFrenzySlice.actions
export default filmFrenzySlice.reducer 