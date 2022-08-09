import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
export default themeModeSlice.reducer
