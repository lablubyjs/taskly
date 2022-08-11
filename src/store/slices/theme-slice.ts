import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '@/store'

const initialThemeModeState: string = 'light'

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: initialThemeModeState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state = action.payload
    }
  }
})

export const { setThemeMode } = themeModeSlice.actions
export const selectThemeMode = (state: AppState) => state.themeMode
export const themeMode = themeModeSlice.reducer
