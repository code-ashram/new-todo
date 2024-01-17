import { STATUS } from './StatusContext.ts'
export const ACTION_STATUS = 'CHANGE_STATUS'

export type Action = {
  type: typeof ACTION_STATUS
  payload: {
    status: STATUS
  }
}

const statusReducer = (state: STATUS, action: Action): STATUS => {
  switch (action.type) {
    case ACTION_STATUS:
      return action.payload.status
    default:
      return state
  }
}

export default statusReducer
