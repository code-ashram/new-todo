import { FC } from 'react'

type Props = {
  id: string,
  title: string,
  isDone: boolean,
  onDone: (id: string) => void,
  onDelete: (id: string) => void,
}

const ListItem: FC<Props> = ({ id, title, isDone, onDone, onDelete }) => {

  return (
    <li className="todoListItem list-group-item">
      <div className="todoListItem__title">
        <input className="form-check-input me-1" type="checkbox" defaultChecked={isDone} id={id} />
        <label className="form-check-label" htmlFor={id}>{title}</label>
      </div>

      <div className="todoListItem__control">
        <button type="button" className="btn btn-success" onClick={() => onDone(id)}>Done</button>

        <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  )
}

export default ListItem
