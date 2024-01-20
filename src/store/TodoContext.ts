import { createContext, Dispatch } from 'react'

import { Action } from './TodoReducer.ts'
import Todo from '../models/Todo.ts'

type ContextType = {
  tasks: Todo[],
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  tasks: [],
  dispatch: () => {}
}

export const TodoContext = createContext<ContextType>(initialValue)

export default TodoContext
