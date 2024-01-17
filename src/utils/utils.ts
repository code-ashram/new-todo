import Todo from '../models/Todo.ts'

import highPriorityIco from './assets/images/high-priority.svg'
import midPriorityIco from './assets/images/medium-priority.svg'
import lowPriorityIco from './assets/images/low-priority.svg'

export const sortListByLastDate = (list: Todo[]): Todo[] =>
  list.sort((a: Todo, b: Todo) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? 1
      : -1
  )

export const sortListByFirstDate = (list: Todo[]): Todo[] =>
  list.sort((a: Todo, b: Todo) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? -1
      : 1
  )

export const sortListByAscendingTitle = (list: Todo[]): Todo[] =>
  list.sort((a: Todo, b: Todo) =>
    a.title.toLowerCase() < b.title.toLowerCase()
      ? 1
      : -1
  )

export const sortListByDescendingTitle = (list: Todo[]): Todo[] =>
  list.sort((a: Todo, b: Todo) =>
    a.title.toLowerCase() < b.title.toLowerCase()
      ? -1
      : 1
  )

export const generateTodo = (): Todo => ({
  id: crypto.randomUUID(),
  title: '',
  isDone: false,
  priority: 'Mid',
  creationTime: new Date().toISOString()
})

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
