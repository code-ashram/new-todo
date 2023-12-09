import TodoTask from '../models/TodoTask.ts'

export const sortListByDate = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? 1
      : -1
  )
