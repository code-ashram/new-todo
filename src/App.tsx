import { useReducer } from 'react'

import Search from './components/Search'
import Form from './components/Form'
import List from './components/List'
import todoReducer from './store/todoReducer.tsx'
import searchReducer from './store/searchReducer.tsx'
import TodoContext from './store/todoContext.tsx'
import SearchContext from './store/searchContext.tsx'
import mockData from './models/mockData.ts'

import './App.scss'

const App = () => {
  const [tasks, dispatch] = useReducer(todoReducer, mockData)
  const [search, searchDispatch] = useReducer(searchReducer, '')

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch }}>
          <Form />
          <SearchContext.Provider value={{ search, dispatch: searchDispatch }}>
            <Search />
            <List />
          </SearchContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
