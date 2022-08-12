import { IAuth } from './interfaces'

import { ILogin, IRegister, IUserResponse } from '@/shared/interfaces'
import { instance } from '@/shared/services'

export const authServices = (): IAuth => {
  async function registerUser (data: IRegister): Promise<IUserResponse> {
    return instance.post('/auth/register', data)
  }

  async function login (data: ILogin): Promise<IUserResponse>  {
    return instance.post('/auth/login', data)
  }

  return { registerUser, login }
}
