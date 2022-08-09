import { IUpdateAccount, IUserResponse } from '@/shared/interfaces'

export interface IUserServices {
  account: () => Promise<IUserResponse>;
  update: (data: IUpdateAccount) => Promise<IUserResponse>
}
