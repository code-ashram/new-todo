import './App.scss'

const App = () => {

  return (
    <div className="card">
      <div className="card-body">
        <nav className="navbar mb-3 bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">TODO-list</a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add new task" aria-label="Recipient's username"
                 aria-describedby="button-addon2" />
          <button className="btn btn-primary" type="button" id="button-addon2">Add</button>
        </div>

        <ul className="list-group">
          <li className="todoListItem list-group-item">
            <div className="todoListItem__title">
              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
              <label className="form-check-label" htmlFor="firstCheckbox">First checkbox</label>
            </div>

            <div className="todoListItem__control">
              <button type="button" className="btn btn-success">Done</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </li>
          <li className="todoListItem list-group-item">
            <div className="todoListItem__title">
              <input className="form-check-input me-1" type="checkbox" value="" id="secondCheckbox" />
              <label className="form-check-label" htmlFor="secondCheckbox">First checkbox</label>
            </div>

            <div className="todoListItem__control">
              <button type="button" className="btn btn-success">Done</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </li>
          <li className="todoListItem list-group-item">
            <div className="todoListItem__title">
              <input className="form-check-input me-1" type="checkbox" value="" id="thirdCheckbox" />
              <label className="form-check-label" htmlFor="thirdCheckbox">First checkbox</label>
            </div>

            <div className="todoListItem__control">
              <button type="button" className="btn btn-success">Done</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
