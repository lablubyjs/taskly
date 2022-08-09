import { IUser } from '@/shared/interfaces'
import { userServices } from '@/shared/services'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setCookie, parseCookies } from 'nookies'

type UserSlice = {
  user: IUser
  isAuthenticated: boolean
}

const { account } = userServices()

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
  },

  extraReducers: (builder) => {
    builder.addCase(
      asyncAddUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isAuthenticated = true
      }
    )
  }
})

export const asyncAddUser = createAsyncThunk<any, IUser>(
  'user/addUser',
  async () => {
    const response = await account()
    return response.user
  }
)

export const { addUser } = userSlice.actions
export default userSlice.reducer
