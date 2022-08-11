import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setCookie } from 'nookies'
import { AppState } from '@/store'
import { IUser } from '@/shared/interfaces'

type UserSlice = {
  user: IUser
  isAuthenticated: boolean
}

const initialUserState = {} as UserSlice

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,

  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      setCookie(null, 'accessToken', action.payload.accessToken, {
        maxAge: 60 * 60 * 5, // 5 hours
        path: '/'
      })
    }
  }
})

export const { addUser } = userSlice.actions
export const selectUser = (state: AppState) => state.user
export const user = userSlice.reducer
