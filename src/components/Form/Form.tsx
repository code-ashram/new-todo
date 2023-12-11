import { ChangeEvent, useContext, useMemo, useState } from 'react'
import logoImg from '../../img/logo.png'
import TodoContext from '../../store/todoContext.tsx'
import { ACTION_TYPE } from '../../store/todoReducer.tsx'

const Form = () => {
  const { dispatch } = useContext(TodoContext)
  const [inputValue, setInputValue] = useState<string>('')
  const isValid: boolean = useMemo(() => Boolean(!inputValue), [inputValue])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCreateTask = () => {
    if (inputValue.trim())
      dispatch({
        type: ACTION_TYPE.CREATE,
        payload: {
          title: inputValue.trim()
        }
      })

    if (inputValue) setInputValue('')
  }

  return (
    <div className="input-group mb-3 d-flex align-items-center">
      <a className="navbar-brand logoIcon" href="#">
        <img className="logo" src={logoImg} alt="logo" />
      </a>

      <input
        className="form-control"
        value={inputValue}
        onChange={handleChangeValue}
        type="text"
        placeholder="Add new task"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />

      <button
        disabled={isValid}
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
