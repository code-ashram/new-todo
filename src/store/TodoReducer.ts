import TodoTask from '../models/TodoTask.ts'

export const enum ACTION_TYPE {
  CHANGE_STATUS,
  DELETE,
  CREATE,
  UPDATE,
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

export type UpdateAction = {
  type: ACTION_TYPE
  payload: TodoTask
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
        : todo
      )
    case ACTION_TYPE.CREATE:
      return [
        {
          id: crypto.randomUUID(),
          isDone: (action as CreateAction).payload.isDone,
          title: (action as CreateAction).payload.title.trim(),
          creationTime: new Date().toISOString(),
          priority: (action as CreateAction).payload.priority
        },
        ...state
      ]
    case ACTION_TYPE.UPDATE:
      return state.map((todo) => todo.id === (action as UpdateAction).payload.id
        ? (action as UpdateAction).payload
        : todo
      )
    default:
      return state
  }
}

export default todoReducer
