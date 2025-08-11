import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isGuest: false,
  loading: false,
  error: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.isGuest = false
      state.error = null
    },
    setGuest: (state, action) => {
      state.isGuest = action.payload
      state.user = null
      state.isAuthenticated = action.payload
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.isGuest = false
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    }
  }
})

export const { setUser, setGuest, setLoading, setError, clearAuth } = authSlice.actions
export default authSlice.reducer 