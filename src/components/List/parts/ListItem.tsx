import { FC } from 'react'
import TodoTask from '../../../models/TodoTask.ts'

type Props = {
  todo: TodoTask,
  handleChangeStatus: (id: string) => void,
  onDelete: (id: string) => void,
}

const ListItem: FC<Props> = ({todo, handleChangeStatus, onDelete }) => {

  return (
    <li className="todoListItem list-group-item">
      <div className="todoListItem__title">
        <input className="form-check-input me-1"
               type="checkbox" checked={todo.isDone}
               id={todo.id}
               onChange={() => handleChangeStatus(todo.id)} />
        <label className="form-check-label" htmlFor={todo.id}>{todo.title}</label>
      </div>

      <div className="todoListItem__control">
        <button type="button" className="btn btn-success" onClick={() => handleChangeStatus(todo.id)}>Done</button>

        <button type="button" className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  )
}

export default ListItem
