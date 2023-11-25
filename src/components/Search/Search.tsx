import { useContext, useRef } from 'react'
import logoImg from '../../img/logo.png'
import searchContext from '../../store/searchContext.tsx'
import { SEARCH_ACTION_TYPE } from '../../store/searchReducer.tsx'

const Search = () => {
  const {searchDispatch} = useContext(searchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchTask = () => {
    searchDispatch({
      type: SEARCH_ACTION_TYPE.FIND,
      payload: {
        title: inputRef.current?.value ?? ''
      }
    })
  }

  return (
    <nav className="navbar mb-3 bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className={'logo'} src={logoImg} alt="logo" />
        </a>

        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            ref={inputRef}
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchTask}
          />

          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Search
