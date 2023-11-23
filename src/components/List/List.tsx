import { useReducer } from 'react'

import mockData from '../../models/mockData.ts'
import ListItem from './parts/ListItem.tsx'
import todoTask from '../../models/todoTask.ts'

const initState = mockData

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

const List = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const handleDeleteTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.DELETE, payload: {
        id
      }
    })
  }

  const toggleStatusTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.DONE, payload: {
        id
      }
    })
  }

  return (
    <ul className="list-group">
      {state.map((todo) => (
        <ListItem
          key={todo.id}
          todo={todo}
          handleChangeStatus={toggleStatusTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </ul>
  )
}

export default List
