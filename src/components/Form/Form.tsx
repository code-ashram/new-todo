import { ChangeEvent, FormEvent, useContext, useMemo, useState } from 'react'

import logoImg from '../../img/logo.png'
import TodoContext from '../../store/TodoContext.ts'
import { ACTION_TYPE } from '../../store/TodoReducer.ts'

interface FormElements extends HTMLFormControlsCollection {
  priority: HTMLSelectElement
}

interface TodoFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const Form = () => {
  const { dispatch } = useContext(TodoContext)
  const [inputValue, setInputValue] = useState<string>('')
  const [isDone, setIsDone] = useState<boolean>(false)
  const isValid: boolean = useMemo(() => Boolean(inputValue), [inputValue])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCreateTask = (e: FormEvent<TodoFormElement>) => {
    e.preventDefault()

    if (inputValue.trim())
      dispatch({
        type: ACTION_TYPE.CREATE,
        payload: {
          title: inputValue.trim(),
          priority: e.currentTarget.elements.priority.value,
          isDone
        }
      })

    if (inputValue) setInputValue('')
  }

  return (
    <div className="text-center">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Add new task
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <form className="modal-content" onSubmit={handleCreateTask}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3 d-flex align-items-center">
                <a className="navbar-brand logoIcon" href="#">
                  <img className="logo" src={logoImg} alt="logo" />
                </a>

                <input
                  className="form-control"
                  value={inputValue}
                  onChange={handleChangeValue}
                  name="taskInput"
                  type="text"
                  placeholder="Add new task"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <p className="form-tip">Chose priority: </p>

                  <select className="form-select" id="priority" aria-label="Default select example">
                    <option value="High">High</option>
                    <option value="Mid">Mid</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="d-flex align-items-center">
                  <p className="form-tip">Chose status:</p>

                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isDone" id="isDone1"
                           onChange={() => setIsDone(true)} />

                    <label className="form-check-label" htmlFor="isDone1">
                      Complete
                    </label>
                  </div>

                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isDone" id="isDone2" defaultChecked
                           onChange={() => setIsDone(false)} />

                    <label className="form-check-label" htmlFor="isDone2">
                      Incomplete
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              <button
                disabled={!isValid}
                className="btn btn-primary"
                type="submit"
                id="button-addon2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
