import { useContext, useMemo } from 'react'
import ListItem from './parts/ListItem.tsx'
import { ACTION_TYPE } from '../../store/todoReducer.tsx'
import TodoContext from '../../store/todoContext.tsx'
import SearchContext from '../../store/SearchContext.tsx'
import { STATUS, StatusContext } from '../../store/StatusContext.tsx'
import { sortListByDate } from '../../utils/utils.ts'

const List = () => {
  const { tasks, dispatch } = useContext(TodoContext)
  const { search } = useContext(SearchContext)
  const { status } = useContext(StatusContext)

  const filteredTodoList = useMemo(() => tasks
    .filter((todo) => {
      let isVisible: boolean

      switch (status) {
        case STATUS.COMPLETED:
          isVisible = todo.isDone
          break
        case STATUS.ACTIVE:
          isVisible = !todo.isDone
          break
        default:
          isVisible = true
      }

      return isVisible && todo.title.toLowerCase().includes(search.toLowerCase())
    }), [tasks, search, status])

  const handleDeleteTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.DELETE,
      payload: { id }
    })
  }

  const toggleStatusTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_STATUS,
      payload: { id }
    })
  }

  return (
    <ul className="list-group">
      {sortListByDate(filteredTodoList).map((todo) => (
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
