import { useReducer } from 'react'

import SearchFilter from './components/SearchFilter'
import Form from './components/Form'
import List from './components/List'
import todoReducer from './store/TodoReducer.ts'
import searchReducer from './store/SearchReducer.ts'
import statusReducer from './store/StatusReducer.ts'
import TodoContext from './store/TodoContext.ts'
import SearchContext from './store/SearchContext.ts'
import FilterContext, { STATUS } from './store/StatusContext.ts'
import mockData from './models/mockData.ts'

import './App.scss'
import PeriodContext, { PERIOD } from './store/PeriodContext.ts'
import periodReducer from './store/PeriodReducer.ts'

const App = () => {
  const [tasks, dispatchTodo] = useReducer(todoReducer, mockData)
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  const [status, dispatchStatus] = useReducer(statusReducer, STATUS.ALL)
  const [period, dispatchPeriod] = useReducer(periodReducer, PERIOD.ALL_TIME)

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch: dispatchTodo }}>
          <Form />
          <FilterContext.Provider value={{ status, dispatch: dispatchStatus }}>
            <SearchContext.Provider value={{ search, dispatch: dispatchSearch }}>
              <PeriodContext.Provider value={{period, dispatch: dispatchPeriod}}>
                <SearchFilter />
                <List />
              </PeriodContext.Provider>
            </SearchContext.Provider>
          </FilterContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
