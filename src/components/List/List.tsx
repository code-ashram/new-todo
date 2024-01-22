import { FC, useCallback, useContext, useMemo } from 'react'

import ListItem from './parts/ListItem.tsx'
import TodoContext from '../../store/TodoContext.ts'
import SearchContext from '../../store/SearchContext.ts'
import { PERIOD, PeriodContext } from '../../store/PeriodContext.ts'
import { STATUS, StatusContext } from '../../store/StatusContext.ts'
import { ACTION_TYPE } from '../../store/TodoReducer.ts'
import { OrderBy, OrderDirection } from '../../constants'
import { sortList } from '../../utils'
// import Todo from '../../models/Todo.ts'
// import {
//   SORTING_ORDER,
//   sortListByAscendingTitle,
//   sortListByDescendingTitle,
//   sortListByFirstDate,
//   sortListByLastDate
// } from '../../utils'

type Props = {
  orderDirection: OrderDirection
  orderBy: OrderBy
}

const List: FC<Props> = ({ orderDirection, orderBy }) => {
  const { tasks, dispatch } = useContext(TodoContext)
  const { search } = useContext(SearchContext)
  const { status } = useContext(StatusContext)
  const { period } = useContext(PeriodContext)

  const sortTodoList = useCallback(() => sortList(tasks, orderBy, orderDirection), [orderBy, orderDirection, tasks])

  const filteredTodoList = useMemo(() =>
      sortTodoList()
        .filter((todo) => {
          let isVisible: boolean

          const isAvailable: boolean = period === PERIOD.ALL_TIME
            ? true
            : new Date(todo.creationTime) > new Date(new Date().setDate(new Date().getDate() - period))

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

          return isVisible && isAvailable && todo.title.toLowerCase().includes(search.toLowerCase())
        })
    , [sortTodoList, period, status, search]
  )

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

  const handleEditTask = (id: string) => {
    dispatch({
      type: ACTION_TYPE.UPDATE,
      payload: { id }
    })
  }

  return (
    <ul className="list-group">
      {
        filteredTodoList.length ?
          filteredTodoList.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              handleChangeStatus={toggleStatusTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))
          : <li className="todoListItemEmpty list-group-item text-center">'Nothing to show =('</li>
      }
    </ul>
  )
}

export default List
