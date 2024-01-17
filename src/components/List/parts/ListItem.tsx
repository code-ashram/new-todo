import { FC, useContext, useState } from 'react'

import TodoForm from '../../TodoForm'

import TodoContext from '../../../store/TodoContext.ts'

import { ACTION_TYPE } from '../../../store/TodoReducer.ts'

import { setPriorityImg } from '../../../utils'

import Todo from '../../../models/Todo.ts'

import threeDots from '../assets/images/three-dots.svg'

type Props = {
  todo: Todo,
  handleChangeStatus: (id: string) => void,
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
}

const ListItem: FC<Props> = ({ todo, handleChangeStatus, onDelete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const { dispatch: dispatchTodo } = useContext(TodoContext)

  const handleToggleControl = () => {
    setIsVisible(prevVisible => (!prevVisible))
  }

  const handleClosePopup = () => {
    setIsVisible(false)
  }

  const handleShowForm = () => {
    setShowForm(prevForm => (!prevForm))
  }

  const handleUpdateTask = (todo: Todo) => {
    dispatchTodo({
      type: ACTION_TYPE.UPDATE,
      payload: todo
    })

    setShowForm(prevShow => !prevShow)
  }

  return (
    <>
      {showForm &&
        <TodoForm isOpen={showForm} onClose={handleShowForm} onSubmit={handleUpdateTask} todo={todo} />}

      <li className="todoListItem list-group-item">
        <div className="todoListItem__title">
          <input
            type="checkbox"
            id={todo.id}
            className="form-check-input me-1"
            checked={todo.isDone}
            onChange={() => handleChangeStatus(todo.id)} />
          <label className="form-check-label" htmlFor={todo.id}>{todo.title}</label>
        </div>

        <div className="todoListItemControl">
          <img className="priority" src={setPriorityImg(todo.priority)} alt="priority img" />

          <p className="todoListItemDate">
            {new Date(todo.creationTime).toLocaleString(
              'en-US',
              {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              }
            )}
          </p>

          <div className="todoListItemControlWrap" onMouseLeave={handleClosePopup}>
            <button
              type="button"
              className="btn btn-outline-secondary todoListItemDetails"
              onClick={handleToggleControl}>
              <img src={threeDots} alt="threeDots" />
            </button>

            {isVisible &&
              <div className="list-group todoListItemControlButtons">
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                  onClick={handleShowForm}>
                  Edit
                </button>

                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  onClick={() => onDelete(todo.id)}>
                  Delete
                </button>
              </div>
            }
          </div>
        </div>
      </li>
    </>
  )
}

export default ListItem
