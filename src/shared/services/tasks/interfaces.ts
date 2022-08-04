import { ICreateTask, ITaskResponse } from '@/shared/interfaces'

export interface ITasksServices {
  create: (userId: string, data: ICreateTask) => Promise<ITaskResponse>
  list: (userId: string) => Promise<ITaskResponse[]>
}
