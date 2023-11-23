import { useReducer } from 'react'

import mockData from '../../models/mockData.ts'
import ListItem from './parts/ListItem.tsx'
import reducer from '../../store/todoReducer.tsx'

const initState = mockData

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
