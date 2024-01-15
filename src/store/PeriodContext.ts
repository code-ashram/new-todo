import { createContext, Dispatch } from 'react'

import { Action } from './PeriodReducer.ts'

export enum PERIOD {
  ALL_TIME = 0,
  WEEK = 7,
  MONTH = 30,
}

type ContextType = {
  period: PERIOD,
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  period: PERIOD.ALL_TIME,
  dispatch: () => {}
}

export const PeriodContext = createContext<ContextType>(initialValue)

export default PeriodContext
