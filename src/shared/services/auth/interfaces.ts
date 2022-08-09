import { ILogin, IRegister, IUserResponse } from '@/shared/interfaces'

export interface IAuth {
  register: (data: IRegister) => Promise<IUserResponse>
  login: (data: ILogin) => Promise<IUserResponse>
}
