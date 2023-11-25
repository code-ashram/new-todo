import { createContext, Dispatch } from 'react'
import TodoTask from '../models/TodoTask.ts'
import { Action } from './todoReducer.tsx'
import mockData from '../models/mockData.ts'

type ContextType = {
  tasks: TodoTask[],
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  tasks: mockData,
  dispatch: () => {}
}

export const TodoContext = createContext<ContextType>(initialValue)

export default TodoContext
