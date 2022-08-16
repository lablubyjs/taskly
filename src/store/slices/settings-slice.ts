import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '@/store'

import { lightTheme, Theme } from '@/styles'

type SettingsSlice = {
  themeMode: string
  theme: Theme
  pomodoroTimer: number
}

const initialSettingsState: SettingsSlice = {
  themeMode: 'light',
  theme: lightTheme,
  pomodoroTimer: 3600,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsSlice>) => {
      state.themeMode = action.payload.themeMode
      state.theme = action.payload.theme
      state.pomodoroTimer = action.payload.pomodoroTimer
    },
  },
})

export const { setSettings } = settingsSlice.actions
export const selectSettings = (state: AppState): SettingsSlice => state.settings
export const selectSettingsTheme = (state: AppState): SettingsSlice['theme'] =>
  state.settings.theme
export const selectSettingsPomodoroTimer = (
  state: AppState
): SettingsSlice['pomodoroTimer'] => state.settings.pomodoroTimer
export const settings = settingsSlice.reducer
