import { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react'

import logoImg from '../../img/logo.png'
import TodoTask from '../../models/TodoTask.ts'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (todo: Partial<TodoTask>) => void,
}

const TodoForm: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState<string>('')
  const [isDone, setIsDone] = useState<boolean>(false)
  const [priority, setPriority] = useState<string>('High')
  const isValid: boolean = useMemo(() => Boolean(title), [title])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeStatus = () => {
    setIsDone(!isDone)
  }

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value)
  }

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()

    const todo = {
      title,
      priority,
      isDone,
    }

    onSubmit(todo)
  }

  return (
    isOpen &&
    <dialog open>
      <h3 className="form-title">Add new Todo</h3>

      <form method="dialog" onSubmit={handleSubmitTodo}>
        <div className="modal-body">
          <div className="input-group mb-3 d-flex align-items-center">
            <a className="navbar-brand logoIcon" href="#">
              <img className="logo" src={logoImg} alt="logo" />
            </a>

            <input
              className="form-control"
              value={title}
              onChange={handleChangeValue}
              name="taskInput"
              type="text"
              placeholder="Add new task"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>

          <div className="form-controller d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <p className="form-tip">Chose priority: </p>

              <select className="form-select" id="priority" aria-label="Default select example"
                      onChange={handleChangePriority}>
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="d-flex align-items-center">
              <p className="form-tip">Chose status:</p>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="isDone" id="isDone1" onChange={handleChangeStatus}
                       />

                <label className="form-check-label" htmlFor="isDone1">
                  Complete
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="isDone" id="isDone2" onChange={handleChangeStatus}
                       defaultChecked />

                <label className="form-check-label" htmlFor="isDone2">
                  Incomplete
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button disabled={!isValid} className="btn btn-primary" type="submit">Add</button>

          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </form>
    </dialog>
  )
}

export default TodoForm
