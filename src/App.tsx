import { useReducer, useState } from 'react'

import SearchFilter from './components/SearchFilter'
import List from './components/List'

import periodReducer from './store/PeriodReducer.ts'
import statusReducer from './store/StatusReducer.ts'
import searchReducer from './store/SearchReducer.ts'
import todoReducer from './store/TodoReducer.ts'
import FilterContext, { STATUS } from './store/StatusContext.ts'
import PeriodContext, { PERIOD } from './store/PeriodContext.ts'
import SearchContext from './store/SearchContext.ts'
import TodoContext from './store/TodoContext.ts'
import mockData from './models/mockData.ts'
import { SORTING_ORDER } from './utils'

import './App.scss'

const App = () => {
  const [tasks, dispatchTodo] = useReducer(todoReducer, mockData)
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  const [status, dispatchStatus] = useReducer(statusReducer, STATUS.ALL)
  const [period, dispatchPeriod] = useReducer(periodReducer, PERIOD.ALL_TIME)
  const [orderDirection, setOrderDirection] =
    useState<SORTING_ORDER>(SORTING_ORDER.DATE_DESCENDING)
  const [orderMode, setOrderMode] = useState<boolean>(true)

  const handleToggleOrderByDate = () => {
    setOrderMode(prevOrderMode => !prevOrderMode)
    setOrderDirection(orderMode ? SORTING_ORDER.DATE_ASCENDING : SORTING_ORDER.DATE_DESCENDING)
  }

  const handleToggleOrderByTitle = () => {
    setOrderMode(prevOrderMode => !prevOrderMode)
    setOrderDirection(orderMode ? SORTING_ORDER.TITLE_ASCENDING : SORTING_ORDER.TITLE_DESCENDING)
  }

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch: dispatchTodo }}>
          <FilterContext.Provider value={{ status, dispatch: dispatchStatus }}>
            <SearchContext.Provider value={{ search, dispatch: dispatchSearch }}>
              <PeriodContext.Provider value={{ period, dispatch: dispatchPeriod }}>
                <SearchFilter onOrderByDate={handleToggleOrderByDate} onOrderByTitle={handleToggleOrderByTitle} />

                <List orderBy={tasks} orderDirection={orderDirection}/>
              </PeriodContext.Provider>
            </SearchContext.Provider>
          </FilterContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
