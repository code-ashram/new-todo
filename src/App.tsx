import Search from './components/Search'
import Form from './components/Form'
import List from './components/List'

import './App.scss'

const App = () => {

  return (
    <div className="card">
      <div className="card-body">
        <Search/>
        <Form/>
        <List/>
      </div>
    </div>
  )
}

export default App
