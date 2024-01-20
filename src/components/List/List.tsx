import { FC, useContext, useEffect, useMemo } from 'react'

import ListItem from './parts/ListItem.tsx'
import TodoContext from '../../store/TodoContext.ts'
import SearchContext from '../../store/SearchContext.ts'
import { PERIOD, PeriodContext } from '../../store/PeriodContext.ts'
import { STATUS, StatusContext } from '../../store/StatusContext.ts'
import { ACTION_TYPE } from '../../store/TodoReducer.ts'
// import Todo from '../../models/Todo.ts'
// import {
//   SORTING_ORDER,
//   sortListByAscendingTitle,
//   sortListByDescendingTitle,
//   sortListByFirstDate,
//   sortListByLastDate
// } from '../../utils'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../../api/client.ts'

// type Props = {
//   orderDirection: string
//   orderBy: Todo[]
// }
//
// const List: FC<Props> = ({ orderDirection, orderBy }) => {
//   const { tasks, dispatch } = useContext(TodoContext)
//   const { search } = useContext(SearchContext)
//   const { status } = useContext(StatusContext)
//   const { period } = useContext(PeriodContext)

const List: FC = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })
  const { tasks, dispatch } = useContext(TodoContext)
  const { search } = useContext(SearchContext)
  const { status } = useContext(StatusContext)
  const { period } = useContext(PeriodContext)

  const filteredTodoList = useMemo(() => tasks
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
    }), [tasks, period, status, search])

  useEffect(() => {
    if (isLoading) {
      // return <li className="todoListItemEmpty list-group-item text-center">Loading...</li>
      console.log('Loading')
    }

    if (isError) {
      // return <li className="todoListItemEmpty list-group-item text-center">Error: {error.message}</li>
      console.log(error.message)
    }

    if (data) {
      dispatch({
        type: ACTION_TYPE.REPLACE,
        payload: data
      })
    }
  }, [data, dispatch, error?.message, isError, isLoading])

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

  // switch (orderDirection) {
  //   case SORTING_ORDER.DATE_ASCENDING:
  //     orderBy = sortListByFirstDate(filteredTodoList)
  //     break
  //   case SORTING_ORDER.DATE_DESCENDING:
  //     orderBy = sortListByLastDate(filteredTodoList)
  //     break
  //   case SORTING_ORDER.TITLE_ASCENDING:
  //     orderBy = sortListByAscendingTitle(filteredTodoList)
  //     break
  //   case SORTING_ORDER.TITLE_DESCENDING:
  //     orderBy = sortListByDescendingTitle(filteredTodoList)
  //     break
  //   default:
  //     orderBy = sortListByFirstDate(filteredTodoList)
  // }

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
          : <li className="todoListItemEmpty list-group-item text-center">Nothing to show =(</li>
      }
    </ul>
  )
}

export default List
