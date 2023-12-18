import TodoTask from '../models/TodoTask.ts'
import highPriorityIco from '../img/high-priority.svg'
import midPriorityIco from '../img/medium-priority.svg'
import lowPriorityIco from '../img/low-priority.svg'

export const sortListByDate = (list: TodoTask[]): TodoTask[] =>
  list.sort((a: TodoTask, b: TodoTask) =>
    new Date(a.creationTime) < new Date(b.creationTime)
      ? 1
      : -1
  )

export const setPriorityImg = (priority: string):string => {
  let priorityImg: string

  switch (priority) {
    case "High":
      priorityImg = highPriorityIco
      break
    case "Mid":
      priorityImg = midPriorityIco
      break
    case "Low":
      priorityImg = lowPriorityIco
      break
    default:
      priorityImg = ""
  }

  return priorityImg
}
