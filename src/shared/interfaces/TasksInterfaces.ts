export interface ITask {
  id?: string
  userId?: string
  title: string
	description: string
	time: string
	icon: string
	tag: string
	date: Date
	isDone: boolean
}

export interface ICreateTask extends ITask {}

export interface ITaskResponse {
  task: ITask
}

export interface ITasksResponse {
  tasks: ITask[]
}
