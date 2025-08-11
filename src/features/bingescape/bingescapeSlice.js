import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  series: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
  viewMode: 'grid'
}

const bingescapeSlice = createSlice({
  name: 'bingescape',
  initialState,
  reducers: {
    setSeries: (state, action) => { state.series = action.payload },
    addSeries: (state, action) => { state.series.unshift(action.payload) },
    updateSeries: (state, action) => {
      const index = state.series.findIndex(item => item.id === action.payload.id)
      if (index !== -1) state.series[index] = action.payload
    },
    removeSeries: (state, action) => {
      state.series = state.series.filter(item => item.id !== action.payload)
    },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
    },
    setViewMode: (state, action) => { state.viewMode = action.payload },
    clearError: (state) => { state.error = null }
  }
})

export const { setSeries, addSeries, updateSeries, removeSeries, setLoading, setError, setSearchQuery, setSorting, setViewMode, clearError } = bingescapeSlice.actions
export default bingescapeSlice.reducer 