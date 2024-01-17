import { createContext, Dispatch } from 'react'

import { SearchAction } from './SearchReducer.ts'

type ContextType = {
  search: string,
  dispatch: Dispatch<SearchAction>
}

const initialValue = {
  search: '',
  dispatch: () => {}
}

export const SearchContext = createContext<ContextType>(initialValue)

export default SearchContext
