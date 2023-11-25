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
      return state.filter((todo) => todo.title.toLowerCase().includes((action as SearchAction).payload.title))
    default:
      return state
  }
}

export default searchReducer
