import Search from './components/Search'
import Form from './components/Form'
import List from './components/List'
import TodoContext from './store/todoContext.tsx'

import './App.scss'
import { useReducer } from 'react'
import reducer from './store/todoReducer.tsx'
import mockData from './models/mockData.ts'

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
