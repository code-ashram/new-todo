import Todo from '../models/Todo.ts'

import highPriorityIco from './assets/images/high-priority.svg'
import midPriorityIco from './assets/images/medium-priority.svg'
import lowPriorityIco from './assets/images/low-priority.svg'
import { OrderBy, OrderDirection } from '../constants'

const compare = (a: string | Date, b: string | Date, orderDirection: OrderDirection) => {
  if (orderDirection === OrderDirection.Asc) return a < b ? 1 : -1
  return a > b ? 1 : -1
}

export const sortList = (list: Todo[], orderBy: OrderBy, orderDirection: OrderDirection): Todo[] => {
  switch (orderBy) {
    case OrderBy.Date:
      return list.sort((a: Todo, b: Todo) =>
        compare(new Date(a.creationTime), new Date(b.creationTime), orderDirection)
      )
    case OrderBy.Title:
      return list.sort((a: Todo, b: Todo) =>
        compare(a.title.toLowerCase(), b.title.toLowerCase(), orderDirection)
      )
    default:
      return list
  }
}

export const generateTodo = (): Todo => ({
  id: crypto.randomUUID(),
  title: '',
  isDone: false,
  priority: 'Mid',
  creationTime: new Date().toISOString()
})

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
