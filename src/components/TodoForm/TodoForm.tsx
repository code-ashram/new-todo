import { FC, FormEvent, useMemo, useState } from 'react'

import Todo from '../../models/Todo.ts'

import { generateTodo, PRIORITY } from '../../utils'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (todo: Todo) => void,
  todo?: Todo
}

const TodoForm: FC<Props> = ({ isOpen, onClose, onSubmit, todo: task }) => {
  const [todo, setTodo] = useState<Todo>(task || generateTodo)
  const isValid: boolean = useMemo(() => Boolean(todo.title), [todo.title])

  const handleChangeTodo = (payload: Partial<Todo>): void => {
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
              type="text"
              id="todoInput"
              className="form-control"
              value={todo.title}
              placeholder={task ? 'Title' : 'Add new task'}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => handleChangeTodo({ title: e.target.value })}
            />
          </div>

          <div className="form-controller mb-3 d-flex">
            <div className={`${task ? 'mb-3' : ''}`}>
              <label className="form-tip" htmlFor="priority">Priority:</label>

              <select
                id="priority"
                className="form-select"
                value={todo.priority}
                aria-label="Default select example"
                onChange={(e) =>
                  handleChangeTodo(
                    { priority: e.target.value }
                  )
                }
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
                  type="checkbox"
                  id="isDone2"
                  className="form-check-input"
                  name="isDone"
                  role="switch"
                  checked={todo.isDone}
                  onChange={() => handleChangeTodo({ isDone: !todo.isDone })}
                />
              </div>
            }
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid}
          >
            {task ? 'Save' : 'Add'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default TodoForm
