import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_THEME } from '@constants/themes'

const initialState = {
  currentTheme: DEFAULT_THEME,
  systemPreference: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload
    },
    setSystemPreference: (state, action) => {
      state.systemPreference = action.payload
    }
  }
})

export const { setTheme, setSystemPreference } = themeSlice.actions
export default themeSlice.reducer 