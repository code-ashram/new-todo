import { useReducer } from 'react'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'


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
// import { SORTING_ORDER } from './utils'

import './App.scss'

const App = () => {
  const queryClient = new QueryClient()
  const [tasks, dispatchTodo] = useReducer(todoReducer, [])
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  const [status, dispatchStatus] = useReducer(statusReducer, STATUS.ALL)
  const [period, dispatchPeriod] = useReducer(periodReducer, PERIOD.ALL_TIME)
  // const [orderDirection, setOrderDirection] =
  //   useState<SORTING_ORDER>(SORTING_ORDER.DATE_DESCENDING)
  // const [orderMode, setOrderMode] = useState<boolean>(true)
  //
  // const handleToggleOrderByDate = () => {
  //   setOrderMode(prevOrderMode => !prevOrderMode)
  //   setOrderDirection(orderMode ? SORTING_ORDER.DATE_ASCENDING : SORTING_ORDER.DATE_DESCENDING)
  // }
  //
  // const handleToggleOrderByTitle = () => {
  //   setOrderMode(prevOrderMode => !prevOrderMode)
  //   setOrderDirection(orderMode ? SORTING_ORDER.TITLE_ASCENDING : SORTING_ORDER.TITLE_DESCENDING)
  // }

  return (
    <div className="card">
      <div className="card-body">
        <QueryClientProvider client={queryClient}>
          <TodoContext.Provider value={{ tasks, dispatch: dispatchTodo }}>
            <FilterContext.Provider value={{ status, dispatch: dispatchStatus }}>
              <SearchContext.Provider value={{ search, dispatch: dispatchSearch }}>
                <PeriodContext.Provider value={{ period, dispatch: dispatchPeriod }}>
                  {/* <SearchFilter onOrderByDate={handleToggleOrderByDate} onOrderByTitle={handleToggleOrderByTitle} /> */}
                  <SearchFilter onOrderByDate={() => console.log('hz')} onOrderByTitle={() => console.log('hz')} />
                  {/* <List orderBy={tasks} orderDirection={orderDirection} /> */}
                  <List />
                </PeriodContext.Provider>
              </SearchContext.Provider>
            </FilterContext.Provider>
          </TodoContext.Provider>
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
