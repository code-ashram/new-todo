import { FC, useState } from 'react'

import TodoTask from '../../../models/TodoTask.ts'
import { setPriorityImg } from '../../../utils/utils.ts'
import threeDots from '../../../img/three-dots.svg'

type Props = {
  todo: TodoTask,
  handleChangeStatus: (id: string) => void,
  handleEditTodo: (id: string) => void,
  onDelete: (id: string) => void,
}

const ListItem: FC<Props> = ({ todo, handleChangeStatus, handleEditTodo, onDelete }) => {

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleToggleControl = () => {
    setIsVisible(prevVisible => (!prevVisible))
  }

  const handleClosePopup = () => {
    setIsVisible(false)
  }

  return (
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
          <button type="button" className="btn btn-outline-secondary todoListItemDetails" onClick={handleToggleControl}>
            <img src={threeDots} alt="threeDots" />
          </button>

          {isVisible &&
            <div className="list-group todoListItemControlButtons">
              <button type="button" className="list-group-item list-group-item-action" aria-current="true"
                      onClick={() => handleEditTodo(todo.id)}>
                Edit
              </button>

              <button type="button" className="list-group-item list-group-item-action"
                      onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </div>
          }
        </div>
      </div>
    </li>
  )
}

export default ListItem
