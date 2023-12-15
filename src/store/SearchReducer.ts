export const enum SEARCH_ACTION_TYPE {
  FIND,
}

export type SearchAction = {
  type: SEARCH_ACTION_TYPE
  payload: {
    title: string,
  }
}

const searchReducer = (state: string, action: SearchAction): string => {
  switch (action.type) {
    case SEARCH_ACTION_TYPE.FIND:
      return action.payload.title
    default:
      return state
  }
}

export default searchReducer
