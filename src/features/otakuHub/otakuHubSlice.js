import { createSlice } from '@reduxjs/toolkit'

const otakuHubSlice = createSlice({
  name: 'otakuHub',
  initialState: { anime: [], loading: false, error: null, searchQuery: '', sortBy: 'created_at', sortOrder: 'desc', viewMode: 'grid' },
  reducers: {
    setAnime: (state, action) => { state.anime = action.payload },
    addAnime: (state, action) => { state.anime.unshift(action.payload) },
    updateAnime: (state, action) => {
      const index = state.anime.findIndex(item => item.id === action.payload.id)
      if (index !== -1) state.anime[index] = action.payload
    },
    removeAnime: (state, action) => { state.anime = state.anime.filter(item => item.id !== action.payload) },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
    clearError: (state) => { state.error = null }
  }
})

export const { setAnime, addAnime, updateAnime, removeAnime, setLoading, setError, clearError } = otakuHubSlice.actions
export default otakuHubSlice.reducer 