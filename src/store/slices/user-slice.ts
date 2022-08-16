import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { destroyCookie, setCookie } from 'nookies'

import { AppState } from '@/store'

import { IUser } from '@/shared/interfaces'

type UserSlice = {
  data: IUser
  isAuthenticated: boolean
}

const initialUserState = {} as UserSlice

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,

  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload
      setCookie(null, 'accessToken', action.payload.accessToken, {
        maxAge: 60 * 60 * 5, // 5 hours
        path: '/'
      })
    },

    removeUser: (state) => {
      state = initialUserState
      destroyCookie(null, 'accessToken')
      console.log('remove user')
    }
  }
})

export const { addUser, removeUser } = userSlice.actions
export const selectUser = (state: AppState): UserSlice['data'] => state.user
export const user = userSlice.reducer
