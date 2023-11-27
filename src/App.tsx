import { useReducer } from 'react'

import SearchFilter from './components/SearchFilter'
import Form from './components/Form'
import List from './components/List'
import todoReducer from './store/todoReducer.tsx'
import searchReducer from './store/searchReducer.tsx'
import TodoContext from './store/todoContext.tsx'
import SearchContext from './store/SearchContext.tsx'
import mockData from './models/mockData.ts'

import './App.scss'
import FilterContext, { STATUS } from './store/StatusContext.tsx'
import statusReducer from './store/statusReducer.ts'

const App = () => {
  const [tasks, dispatchTodo] = useReducer(todoReducer, mockData)
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  const [status, dispatchStatus] = useReducer(statusReducer, STATUS.ALL)

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch: dispatchTodo }}>
          <Form />
          <FilterContext.Provider value={{ status, dispatch: dispatchStatus }}>
            <SearchContext.Provider value={{ search, dispatch: dispatchSearch }}>
              <SearchFilter />
              <List />
            </SearchContext.Provider>
          </FilterContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
