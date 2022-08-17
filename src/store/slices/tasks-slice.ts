import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '@/store'

import { ITask } from '@/shared/interfaces'

type TaskSlice = {
  list: ITask[]
  pinnedTasks: ITask[]
}

const initialUserState = {
  list: [],
  pinnedTasks: []
} as TaskSlice

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialUserState,

  reducers: {
    addTasks: (state, action: PayloadAction<ITask[]>) => {
      state.list = action.payload
    },

    pinnedTask: (state, action: PayloadAction<string>) => {
      const [task] = state.list.filter(task => task.id === action.payload)
      state.pinnedTasks = [...state.pinnedTasks, task]
    },

    unPinnedTask: (state, action: PayloadAction<string>) => {
      state.pinnedTasks = state.pinnedTasks.filter(task => task.id !== action.payload)
    }
  }
})

export const { addTasks, pinnedTask, unPinnedTask } = tasksSlice.actions
export const selectTasks = (state: AppState): TaskSlice['list'] => state.tasks.list
export const selectPinnedTasks = (state: AppState): TaskSlice['pinnedTasks'] => state.tasks.pinnedTasks
export const tasks = tasksSlice.reducer
