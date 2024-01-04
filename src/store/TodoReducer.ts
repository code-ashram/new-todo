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
  payload: Omit<TodoTask, 'id' | 'creationTime'>
}

export type UpdateAction = {
  type: ACTION_TYPE
  payload: TodoTask
}

export type Action = EditDeleteAction | CreateAction | UpdateAction

const todoReducer = (state: TodoTask[], { type, payload }: Action): TodoTask[] => {
  switch (type) {
    case ACTION_TYPE.DELETE:
      return state.filter((todo) => todo.id !== (payload as Pick<TodoTask, 'id'>).id)
    case ACTION_TYPE.CHANGE_STATUS:
      return state.map((todo) => todo.id === (payload as Pick<TodoTask, 'id'>).id
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
          isDone: (payload as Omit<TodoTask, 'id' | 'creationTime'>).isDone,
          title: (payload as Omit<TodoTask, 'id' | 'creationTime'>).title.trim(),
          creationTime: new Date().toISOString(),
          priority: (payload as Omit<TodoTask, 'id' | 'creationTime'>).priority
        },
        ...state
      ]
    case ACTION_TYPE.UPDATE:
      return state.map((todo) => todo.id === (payload as TodoTask).id
        ? (payload as TodoTask)
        : todo
      )
    default:
      return state
  }
}

export default todoReducer
