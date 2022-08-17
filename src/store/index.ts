import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import { user, tasks, settings } from '@/store/slices'

const combinedReducer = combineReducers({
  user,
  tasks,
  settings,
})

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload.user.data,
      tasks: {
        list: action.payload.tasks.list.tasks,
        pinnedTasks: state.tasks.pinnedTasks,
      }
    }
    return nextState
  }
  return combinedReducer(state, action)
}

export const makeStore = () => {
  return configureStore({ reducer: masterReducer })
}

export const wrapper = createWrapper(makeStore)

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
