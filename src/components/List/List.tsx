import { useContext } from 'react'

import ListItem from './parts/ListItem.tsx'
import { ACTION_TYPE } from '../../store/todoReducer.tsx'
import TodoContext from '../../store/todoContext.tsx'

const List = () => {
  const { tasks, dispatch } = useContext(TodoContext)

  const handleDeleteTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.DELETE, payload: { id }
    })
  }

  const toggleStatusTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_STATUS, payload: { id }
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
