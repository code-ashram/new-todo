import { FC, useContext, useState } from 'react'

import TodoTask from '../../../models/TodoTask.ts'
import { setPriorityImg } from '../../../utils/utils.ts'
import threeDots from '../../../img/three-dots.svg'
import TodoForm from '../../TodoForm'
import { ACTION_TYPE } from '../../../store/TodoReducer.ts'
import TodoContext from '../../../store/TodoContext.ts'

type Props = {
  todo: TodoTask,
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

  const handleUpdateTask = (todo: TodoTask) => {
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
          <input className="form-check-input me-1"
                 type="checkbox" checked={todo.isDone}
                 id={todo.id}
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
              className="btn btn-outline-secondary todoListItemDetails"
              type="button"
              onClick={handleToggleControl}>
              <img src={threeDots} alt="threeDots" />
            </button>

            {isVisible &&
              <div className="list-group todoListItemControlButtons">
                <button
                  className="list-group-item list-group-item-action"
                  type="button"
                  aria-current="true"
                  onClick={handleShowForm}>
                  Edit
                </button>

                <button
                  className="list-group-item list-group-item-action"
                  type="button"
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
