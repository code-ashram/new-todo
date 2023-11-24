import ListItem from './parts/ListItem.tsx'
import { useReducer } from 'react'
import reducer, { ACTION_TYPE } from '../../store/todoReducer.tsx'
import mockData from '../../models/mockData.ts'

const List = () => {

  const [ tasks, dispatch] = useReducer(reducer, mockData)

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
      {tasks.map((todo) => (
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
