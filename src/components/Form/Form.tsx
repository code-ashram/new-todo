import { useContext, useRef } from 'react'
import logoImg from '../../img/logo.png'
import TodoContext from '../../store/todoContext.tsx'
import { ACTION_TYPE } from '../../store/todoReducer.tsx'

const Form = () => {
  const { dispatch } = useContext(TodoContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCreateTask = () => {
    dispatch({
      type: ACTION_TYPE.CREATE,
      payload: {
        title: inputRef.current?.value ?? ''
      }
    })

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="input-group mb-3 d-flex align-items-center">
      <a className="navbar-brand logoIcon" href="#">
        <img className="logo" src={logoImg} alt="logo" />
      </a>

      <input
        className="form-control"
        type="text"
        ref={inputRef}
        placeholder="Add new task"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />

      <button
        className="btn btn-primary"
        type="button"
        id="button-addon2"
        onClick={handleCreateTask}
      >
        Add
      </button>
    </div>
  )
}

export default Form
