import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
  viewMode: 'grid' // 'grid' or 'list'
}

const bookwormSlice = createSlice({
  name: 'bookworm',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload
    },
    addBook: (state, action) => {
      state.books.unshift(action.payload)
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id)
      if (index !== -1) {
        state.books[index] = action.payload
      }
    },
    removeBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  setBooks,
  addBook,
  updateBook,
  removeBook,
  setLoading,
  setError,
  setSearchQuery,
  setSorting,
  setViewMode,
  clearError
} = bookwormSlice.actions

export default bookwormSlice.reducer 