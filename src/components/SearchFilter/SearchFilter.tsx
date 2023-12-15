import { useContext, useRef } from 'react'
import * as bootstrap from 'bootstrap'
import search from '../../img/search-ico.svg'

import { SEARCH_ACTION_TYPE } from '../../store/searchReducer.tsx'
import StatusContext, { STATUS } from '../../store/StatusContext.tsx'
import { ACTION_TYPE } from '../../store/statusReducer.ts'
import SearchContext from '../../store/SearchContext.tsx'

const SearchFilter = () => {
  const { dispatch: dispatchSearch } = useContext(SearchContext)
  const { dispatch: dispatchStatus } = useContext(StatusContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeStatus = (status: STATUS) => {
    dispatchStatus({
      type: ACTION_TYPE,
      payload: {
        status
      }
    })
  }

  const handleSearchTask = () => {
    dispatchSearch({
      type: SEARCH_ACTION_TYPE.FIND,
      payload: {
        title: inputRef.current?.value ?? ''
      }
    })
  }

  const triggerTabList = document.querySelectorAll('#myTab button')
  triggerTabList.forEach(triggerEl => {
    const tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', event => {
      event.preventDefault()
      tabTrigger.show()
    })
  })

  return (
    <>
      <ul className="nav nav-tabs d-flex justify-content-between" id="myTab" role="tablist">
        <div className="tabWrapper d-flex">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link tab-btn active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              onClick={() => handleChangeStatus(STATUS.ALL)}
            >
              All tasks
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link tab-btn"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
              onClick={() => handleChangeStatus(STATUS.ACTIVE)}
            >
              Uncompleted
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link tab-btn"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
              onClick={() => handleChangeStatus(STATUS.COMPLETED)}
            >
              Completed
            </button>
          </li>
        </div>

        <div className="d-flex">
          <select className="form-select" aria-label="Default select example">
            <option value="0" selected>All</option>
            <option value="30">Last month</option>
            <option value="7">Last week</option>
          </select>

          <div className="search-wrapper">
            <input
              className="form-control me-2 searchInput"
              ref={inputRef}
              type="search"
              placeholder="Search..."
              aria-label="search"
              onChange={handleSearchTask}
            />
            <img className="searchIcon" src={search} alt="search icon" />
          </div>
        </div>
      </ul>
    </>
  )
}

export default SearchFilter
