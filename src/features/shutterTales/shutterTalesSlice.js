import { createSlice } from '@reduxjs/toolkit'

const shutterTalesSlice = createSlice({
  name: 'shutterTales',
  initialState: { photos: [], loading: false, error: null },
  reducers: {
    setPhotos: (state, action) => { state.photos = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload }
  }
})

export const { setPhotos, setLoading, setError } = shutterTalesSlice.actions
export default shutterTalesSlice.reducer 