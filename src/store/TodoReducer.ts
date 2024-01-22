import Todo from '../models/Todo.ts'

export const enum ACTION_TYPE {
  CHANGE_STATUS,
  DELETE,
  CREATE,
  UPDATE,
  REPLACE
}

export type ReplaceAction = {
  type: ACTION_TYPE
  payload: Todo[]
}

export type EditDeleteAction = {
  type: ACTION_TYPE
  payload: {
    id: string,
  }
}

export type CreateAction = {
  type: ACTION_TYPE
  payload: Todo
}

export type UpdateAction = {
  type: ACTION_TYPE
  payload: Todo
}

export type Action = ReplaceAction | EditDeleteAction | CreateAction | UpdateAction

const todoReducer = (state: Todo[], { type, payload }: Action): Todo[] => {
  switch (type) {
    case ACTION_TYPE.REPLACE:
      return payload as Todo[]
    case ACTION_TYPE.DELETE:
      return state.filter((todo) => todo.id !== (payload as Pick<Todo, 'id'>).id)
    case ACTION_TYPE.CHANGE_STATUS:
      return state.map((todo) => todo.id === (payload as Pick<Todo, 'id'>).id
        ? {
          ...todo,
          isDone: !todo.isDone
        }
        : todo
      )
    case ACTION_TYPE.CREATE:
      return [
        payload as Todo,
        ...state
      ]
    case ACTION_TYPE.UPDATE:
      return state.map((todo) => todo.id === (payload as Todo).id
        ? (payload as Todo)
        : todo
      )
    default:
      return state
  }
}

export default todoReducer
