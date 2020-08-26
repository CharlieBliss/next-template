import { useMemo, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import reduce from 'ramda/src/reduce'
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import useFetchSearch from 'logic/api/useFetchSearch'
import { useSearchContext } from 'logic/contexts/SearchContext'
import SuggestDropdown from 'components/search/SuggestDropdown'
import * as classes from './styles'

export const NavSearchField = () => {
	const searchBarRef = useRef()
	const router = useRouter()

	const {
		setSearchTerm, setUncommittedSearchTerm, uncommittedSearchTerm,
		setSearchSuggestOpen, searchSuggestOpen, searchOpen, setSearchOpen,
	} = useSearchContext()
	const queryParams = {
		limit: 5,
		q: uncommittedSearchTerm,
	}

	const {
		data: suggestData = [],
		error: suggestError,
		refetch: fetchSuggest,
	} = useFetchSearch({
		path: 'suggest',
		queryParams,
		enabled: uncommittedSearchTerm,
	})

	const formattedSearchResults = useMemo(
		() => reduce(
			(accum, searchResult) => ({
				...accum,
				...searchResult,
			}),
			{},
			suggestData,
		), [suggestData],
	)

	// const searchTab = useMemo(
	// 	() => getSearchTab(pathname),
	// 	[pathname],
	// )

	const handleCloseSearch = (e) => {
		e.stopPropagation()
		setSearchSuggestOpen(false)
		setSearchOpen(false)
	}

	const handleSearch = async () => {
		const q = uncommittedSearchTerm
		router.push(`/search/[tab]?q=${q}`, `/search/all?q=${q}`)
		setSearchSuggestOpen(false)
		setSearchOpen(false)
		setSearchTerm(q)
	}

	const debounceHandleChange = debounce(
		(q) => {
			fetchSuggest({ force: true })
			setSearchSuggestOpen(true)
			setUncommittedSearchTerm(q)
		},
		150,
		{
			leading: true,
			trailing: false,
		},
	)

	const handleClick = (e, onOpen) => {
		// Close suggest if the user clicks anything else
		router.prefetch('search')
		if (onOpen) {
			return setSearchSuggestOpen(true)
		}
		if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
			setSearchSuggestOpen(false)
			if (searchOpen) {
				setSearchOpen(false)
			}
		} else {
			setSearchSuggestOpen(true)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick, true)
		return () => {
			document.removeEventListener('click', handleClick, true)
		}
	}, [])

	return (
		<div
			ref={searchBarRef}
			// css={theme => classes.searchBar(theme, searchOpen)}
		>
			<IconButton
				onClick={handleCloseSearch}
			>
				<ChevronLeft className={classes.searchIcon} />
			</IconButton>
			<TextField
				onChange={(e) => debounceHandleChange(e.target.value)}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						handleSearch()
					}
				}}
				noMaxWidth
				dark
			/>
			<div
				css={theme => classes.suggestContainer(theme, searchSuggestOpen)}
			>
				<SuggestDropdown
					setSearchSuggestOpen={setSearchSuggestOpen}
					searchSuggestOpen={searchSuggestOpen}
					searchSuggest={formattedSearchResults}
					setSearchOpen={setSearchOpen}
				/>
			</div>
		</div>
	)
}

export default NavSearchField
