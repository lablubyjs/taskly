import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import themeModeSlice from './theme-slice'
import userSlice from './user-slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<any>>
