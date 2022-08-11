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
  name: 'user',
  initialState: initialUserState,

  reducers: {
    addTasks: (state, action: PayloadAction<ITask[]>) => {
      state.list = action.payload
      state.pinnedTasks = action.payload
    },

    pinnedTask: (state, action: PayloadAction<string>) => {
      const [task] = state.list.filter(task => task.id === action.payload)
      state.pinnedTasks = [...state.pinnedTasks, task]
    }
  }
})

export const { addTasks, pinnedTask } = tasksSlice.actions
export const selectTasks = (state: AppState) => state.tasks.list
export const selectPinnedTasks = (state: AppState) => state.tasks.pinnedTasks
export const tasks = tasksSlice.reducer