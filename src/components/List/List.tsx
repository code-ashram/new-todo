import { useReducer } from 'react'

import mockData from '../../models/mockData.ts'
import ListItem from './parts/ListItem.tsx'

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

const reducer = (state: typeof initState, action: Action): typeof initState => {
    switch (action.type) {
      case ACTION_TYPE.DELETE:
        return state.filter((todo) => todo.id !== action.payload.id)
      default:
        return state
    }
}

const List = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const handleDeleteTask = (id: string) => {
    dispatch({type: ACTION_TYPE.DELETE, payload: {id: id}})
  }

  const handleDoneTask = () => {
    console.log('Deleted!')
  }

  return (
    <ul className="list-group">
      {state.map(({ id, title, isDone }) => (
        <ListItem key={id}
                  id={id}
                  title={title}
                  isDone={isDone}
                  onDone={handleDoneTask}
                  onDelete={handleDeleteTask} />
      ))}
    </ul>
  )
}

export default List
