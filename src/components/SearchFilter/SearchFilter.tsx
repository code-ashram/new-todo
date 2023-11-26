import { useContext, useRef } from 'react'
import * as bootstrap from 'bootstrap'
import search from '../../img/search-ico.svg'
import searchContext from '../../store/searchContext.tsx'
import { SEARCH_ACTION_TYPE } from '../../store/searchReducer.tsx'

const SearchFilter = () => {
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
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All tasks
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                    type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Uncompleted
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                    type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Completed
            </button>
          </li>
        </div>

        <div className="d-flex">
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
      </ul>
      {/* <div className="tab-content" id="myTabContent"> */}
      {/*   <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">...</div> */}
      {/*   <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">...</div> */}
      {/*   <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">...</div> */}
      {/*   <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">...</div> */}
      {/* </div> */}
    </>

  )
}

export default SearchFilter
