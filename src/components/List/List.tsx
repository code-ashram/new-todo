import { useContext, useMemo } from 'react'
import ListItem from './parts/ListItem.tsx'
import { ACTION_TYPE } from '../../store/todoReducer.tsx'
import TodoContext from '../../store/todoContext.tsx'
import SearchContext from '../../store/searchContext.tsx'

const List = () => {
  const { tasks, dispatch } = useContext(TodoContext)
  const { search } = useContext(SearchContext)
  const filteredTodoList = useMemo(() => tasks
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase())), [tasks, search])

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
      {filteredTodoList.map((todo) => (
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
