import { useEffect, useReducer, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import SearchFilter from './components/SearchFilter'
import List from './components/List'

import periodReducer from './store/PeriodReducer.ts'
import statusReducer from './store/StatusReducer.ts'
import searchReducer from './store/SearchReducer.ts'
import todoReducer, { ACTION_TYPE } from './store/TodoReducer.ts'
import FilterContext, { STATUS } from './store/StatusContext.ts'
import PeriodContext, { PERIOD } from './store/PeriodContext.ts'
import SearchContext from './store/SearchContext.ts'
import TodoContext from './store/TodoContext.ts'
// import { SORTING_ORDER } from './utils'
import './App.scss'
import { getTodos } from './api/client.ts'
import { OrderBy, OrderDirection } from './constants'

const App = () => {
  const [tasks, dispatchTodo] = useReducer(todoReducer, [])
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  const [status, dispatchStatus] = useReducer(statusReducer, STATUS.ALL)
  const [period, dispatchPeriod] = useReducer(periodReducer, PERIOD.ALL_TIME)
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })
  const [orderDirection, setOrderDirection] =
    useState<OrderDirection>(OrderDirection.Asc)
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.Date)

  const handleToggleOrderDirection = () => {
    setOrderDirection((prevOrderDirection) =>
      prevOrderDirection === OrderDirection.Asc
        ? OrderDirection.Desc
        : OrderDirection.Asc
    )
  }

  const handleChangeOrderBy = (key: OrderBy) => {
    setOrderBy(key)
  }

  useEffect(() => {
    if (!isLoading && !isError && Array.isArray(data)) {
      dispatchTodo({
        type: ACTION_TYPE.REPLACE,
        payload: data
      })
    }
  }, [data, error, isError, isLoading])

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch: dispatchTodo }}>
          <FilterContext.Provider value={{ status, dispatch: dispatchStatus }}>
            <SearchContext.Provider value={{ search, dispatch: dispatchSearch }}>
              <PeriodContext.Provider value={{ period, dispatch: dispatchPeriod }}>
                <SearchFilter onChangeOrderBy={handleChangeOrderBy} onChangeOrderDirection={handleToggleOrderDirection}/>
                <List orderDirection={orderDirection} orderBy={orderBy} />
              </PeriodContext.Provider>
            </SearchContext.Provider>
          </FilterContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
