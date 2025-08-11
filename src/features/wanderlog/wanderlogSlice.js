import { createSlice } from '@reduxjs/toolkit'

const wanderlogSlice = createSlice({
  name: 'wanderlog',
  initialState: { travels: [], loading: false, error: null },
  reducers: {
    setTravels: (state, action) => { state.travels = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload }
  }
})

export const { setTravels, setLoading, setError } = wanderlogSlice.actions
export default wanderlogSlice.reducer 