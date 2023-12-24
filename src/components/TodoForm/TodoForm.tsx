import { FC, FormEvent, useMemo, useState } from 'react'

import logoImg from '../../img/logo.png'
import TodoTask from '../../models/TodoTask.ts'
import { PRIORITY } from '../../utils/utils.ts'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (todo: TodoTask) => void,
}

const TodoForm: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [todo, setTodo] = useState<TodoTask>(
    {
      id: crypto.randomUUID(),
      title: '',
      isDone: false,
      priority: 'Mid',
      creationTime: new Date().toISOString()
    })
  const isValid: boolean = useMemo(() => Boolean(todo.title), [todo.title])

  const handleChangeTodo = (payload: Partial<TodoTask>): void => {
    setTodo(prevTodo => ({ ...prevTodo, ...payload }))
  }

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()

    onSubmit(todo)

    setTodo(prevTodo => ({ ...prevTodo, title: '' }))
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
              value={todo.title}
              onChange={(e) => handleChangeTodo({ title: e.target.value })}
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
                      onChange={(e) => handleChangeTodo({ priority: e.target.value })}>
                <option value={PRIORITY.HIGH}>High</option>

                <option value={PRIORITY.MID}>Mid</option>

                <option value={PRIORITY.LOW}>Low</option>
              </select>
            </div>

            <div className="d-flex align-items-center">
              <p className="form-tip">Chose status:</p>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="isDone" id="isDone1"
                       onChange={() => handleChangeTodo({ isDone: true })}
                />

                <label className="form-check-label" htmlFor="isDone1">
                  Complete
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="isDone" id="isDone2"
                       onChange={() => handleChangeTodo({ isDone: false })}
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
