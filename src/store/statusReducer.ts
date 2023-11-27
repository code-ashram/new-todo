import { STATUS } from './StatusContext.tsx'

export const ACTION_TYPE = 'CHANGE_STATUS'

export type Action = {
  type: typeof ACTION_TYPE
  payload: {
    status: STATUS
  }
}

const statusReducer = (state: STATUS, action: Action): STATUS => {
  switch (action.type) {
    case ACTION_TYPE:
      return action.payload.status
    default:
      return state
  }
}

export default statusReducer
