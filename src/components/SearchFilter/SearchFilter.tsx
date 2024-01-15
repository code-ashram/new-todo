import { FC, useContext, useEffect, useRef, useState } from 'react'

import * as bootstrap from 'bootstrap'

import SortButton from './parts/SortButton.tsx'
import TodoForm from '../TodoForm'

import TodoContext from '../../store/TodoContext.ts'
import SearchContext from '../../store/SearchContext.ts'
import StatusContext, { STATUS } from '../../store/StatusContext.ts'
import { PERIOD, PeriodContext } from '../../store/PeriodContext.ts'

import { ACTION_TYPE } from '../../store/TodoReducer.ts'
import { SEARCH_ACTION_TYPE } from '../../store/SearchReducer.ts'
import { ACTION_STATUS } from '../../store/StatusReducer.ts'
import { ACTION_PERIOD } from '../../store/PeriodReducer.ts'

import Todo from '../../models/Todo.ts'

import sortNumericUpIcon from '../../img/sort-numeric-up.svg'
import sortNumericDownIcon from '../../img/sort-numeric-down.svg'
import sortIncreaseTitleIcon from '../../img/sort-increase.svg'
import sortDecreaseTitleIcon from '../../img/sort-decrease.svg'
import search from '../../img/search-ico.svg'

type Props = {
  onOrderByTitle: () => void
  onOrderByDate: () => void
}

const SearchFilter: FC<Props> = ({ onOrderByTitle, onOrderByDate }) => {
  const { dispatch: dispatchTodo } = useContext(TodoContext)
  const { dispatch: dispatchSearch } = useContext(SearchContext)
  const { dispatch: dispatchStatus } = useContext(StatusContext)
  const { dispatch: dispatchPeriod } = useContext(PeriodContext)
  const [showForm, setShowForm] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const allTasksButtonRef = useRef<HTMLButtonElement>(null)
  const uncompletedTasksButtonRef = useRef<HTMLButtonElement>(null)
  const completedTasksButtonRef = useRef<HTMLButtonElement>(null)

  const handleToggleForm = () => {
    setShowForm(prevShow => !prevShow)
  }

  const handleCreateTask = (todo: Todo) => {
    dispatchTodo({
      type: ACTION_TYPE.CREATE,
      payload: {
        title: todo.title,
        priority: todo.priority,
        isDone: todo.isDone
      }
    })

    handleToggleForm()
  }

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

  useEffect(() => {
    const triggerTabList = [
      allTasksButtonRef.current,
      uncompletedTasksButtonRef.current,
      completedTasksButtonRef.current
    ]

    const handleClickTabBtn = (event: MouseEvent, element: HTMLButtonElement) => {
      event.preventDefault()
      const tabTrigger = new bootstrap.Tab(element)
      tabTrigger.show()
    }

    triggerTabList.forEach(triggerEl => {
      triggerEl?.addEventListener('click', event => handleClickTabBtn(event, triggerEl))
    })

    return () => triggerTabList.forEach(triggerEl =>
      triggerEl?.removeEventListener('click', event => handleClickTabBtn(event, triggerEl))
    )
  }, [allTasksButtonRef, completedTasksButtonRef, uncompletedTasksButtonRef])

  return (
    <>
      <TodoForm isOpen={showForm} onClose={handleToggleForm} onSubmit={handleCreateTask} />

      <ul className="nav nav-tabs d-flex justify-content-between" id="myTab" role="tablist">
        <div className="tabWrapper d-flex">
          <li className="nav-item" role="presentation">
            <button
              ref={allTasksButtonRef}
              type="button"
              id="home-tab"
              className="nav-link tab-btn active"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              onClick={() => handleChangeStatus(STATUS.ALL)}
            >
              All tasks
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              ref={uncompletedTasksButtonRef}
              type="button"
              id="profile-tab"
              className="nav-link tab-btn"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              onClick={() => handleChangeStatus(STATUS.ACTIVE)}
            >
              Uncompleted
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              ref={completedTasksButtonRef}
              type="button"
              id="contact-tab"
              className="nav-link tab-btn"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              onClick={() => handleChangeStatus(STATUS.COMPLETED)}
            >
              Completed
            </button>
          </li>
        </div>

        <button type="button" className="add-btn btn btn-primary" onClick={() => setShowForm(true)}>
          Add
        </button>

        <div className="todoSorter d-flex">
          <SortButton prevImage={sortIncreaseTitleIcon} nextImage={sortDecreaseTitleIcon} onClick={onOrderByTitle} />

          <SortButton prevImage={sortNumericDownIcon} nextImage={sortNumericUpIcon} onClick={onOrderByDate} />

          <select className="form-select filterSelect" aria-label="Default select example" name="formSelect">
            <option value="1" onClick={() => handleChangePeriod(PERIOD.ALL_TIME)}>All</option>

            <option value="2" onClick={() => handleChangePeriod(PERIOD.MONTH)}>Last month</option>

            <option value="3" onClick={() => handleChangePeriod(PERIOD.WEEK)}>Last week</option>
          </select>

          <div className="search-wrapper">
            <input
              ref={inputRef}
              type="search"
              name="search"
              className="form-control searchInput"
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
