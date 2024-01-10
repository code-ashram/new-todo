import TodoTask from '../models/TodoTask.ts'
import highPriorityIco from '../img/high-priority.svg'
import midPriorityIco from '../img/medium-priority.svg'
import lowPriorityIco from '../img/low-priority.svg'

export const sortListByLastDate = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? 1
      : -1
  )

export const sortListByFirstDate = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? -1
      : 1
  )

export const sortListByAscendingTitle = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    a.title.toLowerCase() < b.title.toLowerCase()
      ? 1
      : -1
  )

export const sortListByDescendingTitle = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    a.title.toLowerCase() < b.title.toLowerCase()
      ? -1
      : 1
  )

export enum SORTING_ORDER {
  DATE_ASCENDING = 'dateAscending',
  DATE_DESCENDING = 'dateDescending',
  TITLE_ASCENDING = 'titleAscending',
  TITLE_DESCENDING = 'titleDescending',
}

export enum PRIORITY {
  HIGH = 'High',
  MID = 'Mid',
  LOW = 'Low'
}

export const setPriorityImg = (priority: string): string => {
  let priorityImg: string

  switch (priority) {
    case PRIORITY.HIGH:
      priorityImg = highPriorityIco
      break
    case PRIORITY.MID:
      priorityImg = midPriorityIco
      break
    case PRIORITY.LOW:
      priorityImg = lowPriorityIco
      break
    default:
      priorityImg = ''
  }

  return priorityImg
}
