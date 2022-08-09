import { ILogin, IRegister, IUserResponse } from '@/shared/interfaces'

export interface IAuth {
  registerUser: (data: IRegister) => Promise<IUserResponse>
  login: (data: ILogin) => Promise<IUserResponse>
}
