import { IUpdateAccount, IUserResponse } from '@/shared/interfaces'

export interface IUserServices {
  account: (data: any) => Promise<IUserResponse>;
  update: (data: IUpdateAccount) => Promise<IUserResponse>
}
