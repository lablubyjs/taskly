export interface IUser {
  id: string
  name: string
  email: string
  password: string
  accessToken: string
}

export interface IUserResponse {
  user: IUser
}

export interface IUpdateAccount {
  name: string
  email: string
}
