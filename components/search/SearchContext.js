import React, { useState, useContext } from 'react'

const searchContextUndefined = {}
const SearchContext = React.createContext(searchContextUndefined)
export const SearchContextProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState()
	const [uncommittedSearchTerm, setUncommittedSearchTerm] = useState('')
	const [searchSuggestOpen, setSearchSuggestOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)
	const context = {
		searchTerm,
		setSearchTerm,
		searchOpen,
		setSearchOpen,
		uncommittedSearchTerm,
		setUncommittedSearchTerm,
		searchSuggestOpen,
		setSearchSuggestOpen,
	}
	return (
		<SearchContext.Provider value={context}>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearchContext = () => useContext(SearchContext)

export default SearchContext
