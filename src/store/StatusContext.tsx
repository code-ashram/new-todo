import { createContext, Dispatch } from 'react'
import { Action } from './statusReducer.ts'

export const enum STATUS {
  ALL,
  ACTIVE,
  COMPLETED,
}

type ContextType = {
  status: STATUS,
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  status: STATUS.ALL,
  dispatch: () => {}
}

export const StatusContext = createContext<ContextType>(initialValue)

export default StatusContext
