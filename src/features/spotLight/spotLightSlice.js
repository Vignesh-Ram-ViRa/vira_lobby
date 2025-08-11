import { createSlice } from '@reduxjs/toolkit'

const spotLightSlice = createSlice({
  name: 'spotLight',
  initialState: { portfolio: [], loading: false, error: null },
  reducers: {
    setPortfolio: (state, action) => { state.portfolio = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload }
  }
})

export const { setPortfolio, setLoading, setError } = spotLightSlice.actions
export default spotLightSlice.reducer 