import { createContext, Dispatch } from 'react'
import { SearchAction } from './searchReducer.tsx'

type ContextType = {
  search: string,
  dispatch: Dispatch<SearchAction>
}

const initialValue = {
  search: "",
  dispatch: () => {}
}

export const SearchContext = createContext<ContextType>(initialValue)

export default SearchContext
