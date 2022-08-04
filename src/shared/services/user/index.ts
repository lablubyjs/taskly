import { IUserServices } from './interfaces'
import { IUpdateAccount, IUserResponse } from '@/shared/interfaces'
import { instance } from '@/shared/services'

export const userServices = (): IUserServices => {
  async function account (): Promise<IUserResponse> {
    return instance.get('/user/account')
  }

  async function update (data: IUpdateAccount): Promise<IUserResponse>  {
    return instance.put('/user/update', data)
  }

  return { account, update }
}
