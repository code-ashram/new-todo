import { createContext, Dispatch } from 'react'
import { SearchAction } from './searchReducer.tsx'

type ContextType = {
  searchResult: string,
  searchDispatch: Dispatch<SearchAction>
}

const initialValue = {
  searchResult: "",
  searchDispatch: () => {}
}

export const searchContext = createContext<ContextType>(initialValue)

export default searchContext
