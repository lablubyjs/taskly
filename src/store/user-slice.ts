import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { parseCookies, setCookie } from 'nookies'
import { AppState } from '@/store'
import { ILogin, IUser } from '@/shared/interfaces'
import { userServices } from '@/shared/services'

type UserSlice = {
  user: IUser
  isAuthenticated: boolean
}

const { account } = userServices()

const initialUserState = {} as UserSlice

export const addUserAsync = createAsyncThunk<any, IUser>(
  'user/addUser',
  async (): Promise<IUser> => {
    const response = await account()
    return response.user
  }
)

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
      addUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isAuthenticated = true
      }
    )
  }
})

export const { addUser } = userSlice.actions
export const selectUser = (state: AppState) => state.user
export default userSlice.reducer
