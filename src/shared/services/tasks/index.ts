import { ITasksServices } from './interfaces'

import { ICreateTask, ITaskResponse, ITasksResponse } from '@/shared/interfaces'
import { instance } from '@/shared/services'

export const tasksServices = (): ITasksServices => {
  async function create (data: ICreateTask): Promise<ITaskResponse> {
    return instance.post(`/tasks/create`, data)
  }

  async function list (userId: string): Promise<ITasksResponse>  {
    return instance.get(`${userId}/tasks/list`)
  }

  return { create, list }
}
