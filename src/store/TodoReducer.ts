import TodoTask from '../models/TodoTask.ts'

export const enum ACTION_TYPE {
  CHANGE_STATUS,
  DELETE,
  CREATE,
}

export type EditDeleteAction = {
  type: ACTION_TYPE
  payload: {
    id: string,
  }
}

export type CreateAction = {
  type: ACTION_TYPE
  payload: {
    title: string,
    isDone: boolean,
    priority: string
  }
}

export type Action = EditDeleteAction | CreateAction

const todoReducer = (state: TodoTask[], action: Action): TodoTask[] => {
  switch (action.type) {
    case ACTION_TYPE.DELETE:
      return state.filter((todo) => todo.id !== (action as EditDeleteAction).payload.id)
    case ACTION_TYPE.CHANGE_STATUS:
      return state.map((todo) => todo.id === (action as EditDeleteAction).payload.id
        ? {
          ...todo,
          isDone: !todo.isDone
        }
        : todo)
    case ACTION_TYPE.CREATE:
      return [
        {
          id: crypto.randomUUID(),
          isDone: (action as CreateAction).payload.isDone,
          title: (action as CreateAction).payload.title.trim(),
          creationTime: new Date().toISOString().slice(0, 10),
          priority: (action as CreateAction).payload.priority
        },
        ...state
      ]
    default:
      return state
  }
}

export default todoReducer