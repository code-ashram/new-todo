import { PERIOD } from './PeriodContext.ts'

export const ACTION_PERIOD = 'CHANGE_PERIOD'

export type Action = {
  type: typeof ACTION_PERIOD
  payload: {
    period: PERIOD
  }
}

const periodReducer = (state: PERIOD, action: Action): PERIOD => {
  switch (action.type) {
    case ACTION_PERIOD:
      return action.payload.period
    default:
      return state
  }
}

export default periodReducer
