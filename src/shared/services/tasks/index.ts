import { ITasksServices } from './interfaces'
import { ICreateTask, ITaskResponse, ITasksResponse } from '@/shared/interfaces'
import { instance } from '@/shared/services'

export const tasksServices = (): ITasksServices => {
  async function create (userId: string, data: ICreateTask): Promise<ITaskResponse> {
    return instance.post(`${userId}/tasks/create`, data)
  }

  async function list (userId: string): Promise<ITasksResponse>  {
    return instance.get(`${userId}/tasks/list`)
  }

  return { create, list }
}
