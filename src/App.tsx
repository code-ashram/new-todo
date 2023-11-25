import { useReducer } from 'react'

import Search from './components/Search'
import Form from './components/Form'
import List from './components/List'
import reducer from './store/todoReducer.tsx'
import TodoContext from './store/todoContext.tsx'
import mockData from './models/mockData.ts'

import './App.scss'

const App = () => {
  const [ tasks, dispatch] = useReducer(reducer, mockData)

  return (
    <div className="card">
      <div className="card-body">
        <TodoContext.Provider value={{ tasks, dispatch }}>
          <Search />
          <Form />
          <List />
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default App
