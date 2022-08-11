import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { user, tasks, themeMode } from '@/store/slices'

const combinedReducer = combineReducers({
  user,
  tasks,
  themeMode
})

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      user: {
        user: action.payload.user.user,
        isAuthenticated: true
      },
      tasks: {
        list: action.payload.tasks.list.tasks,
        pinnedTasks: action.payload.tasks.list.tasks
      },
      themeMode: action.payload.themeMode || state.themeMode
    }
    return nextState
  } 
  return combinedReducer(state, action)
}

export const makeStore = () => {
  return configureStore({ reducer: masterReducer })
}

export const wrapper = createWrapper(makeStore, { debug: true })

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
