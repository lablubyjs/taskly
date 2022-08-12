import { ICreateTask, ITaskResponse, ITasksResponse } from '@/shared/interfaces'

export interface ITasksServices {
  create: (data: ICreateTask) => Promise<ITaskResponse>
  list: (userId: string) => Promise<ITasksResponse>
}
