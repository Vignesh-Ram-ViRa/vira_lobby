import { createSlice } from '@reduxjs/toolkit'

const scribblesSlice = createSlice({
  name: 'scribbles',
  initialState: { artworks: [], loading: false, error: null },
  reducers: {
    setArtworks: (state, action) => { state.artworks = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload }
  }
})

export const { setArtworks, setLoading, setError } = scribblesSlice.actions
export default scribblesSlice.reducer 