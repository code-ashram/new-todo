import { FC, useContext, useRef, useState } from 'react'
import * as bootstrap from 'bootstrap'
import search from '../../img/search-ico.svg'

import { SEARCH_ACTION_TYPE } from '../../store/SearchReducer.ts'
import StatusContext, { STATUS } from '../../store/StatusContext.ts'
import { ACTION_STATUS } from '../../store/StatusReducer.ts'
import SearchContext from '../../store/SearchContext.ts'
import { PERIOD, PeriodContext } from '../../store/PeriodContext.ts'
import { ACTION_PERIOD } from '../../store/PeriodReducer.ts'
import TodoForm from '../TodoForm'
// import TodoContext from '../../store/TodoContext.ts'
// import { ACTION_TYPE } from '../../store/TodoReducer.ts'

const SearchFilter: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  // const { dispatch: dispatchTodo } = useContext(TodoContext)
  const { dispatch: dispatchSearch } = useContext(SearchContext)
  const { dispatch: dispatchStatus } = useContext(StatusContext)
  const { dispatch: dispatchPeriod } = useContext(PeriodContext)
  const [showForm, setShowForm] = useState<boolean>(false)

  // interface FormElements extends HTMLFormControlsCollection {
  //   priority: HTMLSelectElement
  // }
  //
  // interface TodoFormElement extends HTMLFormElement {
  //   readonly elements: FormElements
  // }

  // const handleCreateTask = (e: FormEvent<TodoFormElement>) => {
  //   e.preventDefault()
  //
  //   if (inputValue.trim())
  //     dispatchTodo({
  //       type: ACTION_TYPE.CREATE,
  //       payload: {
  //         title: inputValue.trim(),
  //         priority: e.currentTarget.elements.priority.value,
  //         isDone
  //       }
  //     })
  //
  //   if (inputValue) setInputValue('')
  // }

  const handleChangePeriod = (period: PERIOD) => {
    dispatchPeriod({
      type: ACTION_PERIOD,
      payload: {
        period
      }
    })
  }

  const handleChangeStatus = (status: STATUS) => {
    dispatchStatus({
      type: ACTION_STATUS,
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
      <TodoForm isOpen={showForm} onClose={() => setShowForm(false)} onSubmit={() => console.log(1)} />

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

        <button type="button" className="add-btn btn btn-primary" onClick={() => setShowForm(true)}>
          Add
        </button>

        <div className="d-flex">
          <select className="form-select" aria-label="Default select example" name="formSelect">
            <option value="1" onClick={() => handleChangePeriod(PERIOD.ALL_TIME)}>All</option>
            <option value="2" onClick={() => handleChangePeriod(PERIOD.MONTH)}>Last month</option>
            <option value="3" onClick={() => handleChangePeriod(PERIOD.WEEK)}>Last week</option>
          </select>

          <div className="search-wrapper">
            <input
              className="form-control me-2 searchInput"
              ref={inputRef}
              name="search"
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
