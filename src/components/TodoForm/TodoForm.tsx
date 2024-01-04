import { FC, FormEvent, useMemo, useState } from 'react'
import TodoTask from '../../models/TodoTask.ts'
import { PRIORITY } from '../../utils/utils.ts'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (todo: TodoTask) => void,
  todo?: TodoTask
}

const TodoForm: FC<Props> = ({ isOpen, onClose, onSubmit, todo: task }) => {
  const [todo, setTodo] = useState<TodoTask>(task ||
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
      <h3 className="form-title">
        {task ? 'Edit current todo' : 'Add new Todo'}
      </h3>

      <form method="dialog" onSubmit={handleSubmitTodo}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-tip" htmlFor="todoInput">Title:</label>

            <input
              className="form-control"
              value={todo.title}
              onChange={(e) => handleChangeTodo({ title: e.target.value })}
              id="todoInput"
              type="text"
              placeholder={task ? 'Title' : 'Add new task'}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>

          <div className="form-controller mb-3 d-flex">
            <div className={`${task ? 'mb-3' : ''}`}>
              <label className="form-tip" htmlFor="priority">Priority:</label>

              <select
                className="form-select"
                id="priority"
                aria-label="Default select example"
                value={todo.priority}
                onChange={(e) => handleChangeTodo({ priority: e.target.value })}
              >
                <option value={PRIORITY.HIGH}>High</option>

                <option value={PRIORITY.MID}>Mid</option>

                <option value={PRIORITY.LOW}>Low</option>
              </select>
            </div>

            {task &&
              <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="isDone2">
                  Complete
                </label>

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isDone"
                  id="isDone2"
                  role="switch"
                  checked={todo.isDone}
                  onChange={() => handleChangeTodo({ isDone: !todo.isDone })}
                />
              </div>
            }
          </div>
        </div>

        <div className="form-footer">
          <button disabled={!isValid} className="btn btn-primary" type="submit">{task ? 'Save' : 'Add'}</button>

          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </dialog>
  )
}

export default TodoForm
