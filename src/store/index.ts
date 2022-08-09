import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import themeModeSlice from './theme-slice'
import userSlice from './user-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      themeMode: themeModeSlice,
    }
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<any>
>

export default store
