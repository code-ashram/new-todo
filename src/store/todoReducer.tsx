import todoTask from '../models/todoTask.ts'

const enum ACTION_TYPE {
  DONE,
  DELETE,
}

type Action = {
  type: ACTION_TYPE
  payload: {
    id: string
  }
}

const reducer = (state: todoTask[], action: Action): todoTask[] => {
  switch (action.type) {
    case ACTION_TYPE.DELETE:
      return state.filter((todo) => todo.id !== action.payload.id)
    case ACTION_TYPE.DONE:
      return state.map((todo) => todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo)
    default:
      return state
  }
}

export default reducer
