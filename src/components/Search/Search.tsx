import { useContext, useRef } from 'react'
import logoImg from '../../img/logo.png'
import search from '../../img/search-ico.svg'
import searchContext from '../../store/searchContext.tsx'
import { SEARCH_ACTION_TYPE } from '../../store/searchReducer.tsx'

const Search = () => {
  const { dispatch } = useContext(searchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchTask = () => {
    dispatch({
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

        <div className="d-flex">
          <input
            className="form-control me-2"
            ref={inputRef}
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchTask}
          />
          <img src={search} alt="search icon" />
        </div>
      </div>
    </nav>
  )
}

export default Search
