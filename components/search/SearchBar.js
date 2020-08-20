import React, { useMemo, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import reduce from 'ramda/src/reduce'
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { useSearchContext } from 'components/search/SearchContext'
import SuggestDropdown from 'components/search/SuggestDropdown'
import useFetchList from 'api/useFetchList'

const useStyles = makeStyles(({ palette, breakpoints, zIndex }) => ({
	searchBar: {
		position: 'absolute',
		zIndex: zIndex.appBar,
		width: 560,
		display: 'flex',
		transformOrigin: '100% 50% 0',
		justifyContent: 'flex-end',
		left: 212,
		transition: 'transform 0.3s ease-out, opacity 0.5s ease-out',
		[breakpoints.only('md')]: {
			width: 447,
		},
		[breakpoints.only('sm')]: {
			left: 16,
			width: 450,
		},
		[breakpoints.only('xs')]: {
			left: 0,
			width: '90%',
		},
	},
	searchBarClosed: {
		opacity: 0,
		transform: 'scaleX(0)',
	},
	searchBarOpen: {
		opacity: 1,
		transform: 'scaleX(1)',
	},
	searchInput: {
		height: 32,
		width: 560,
		borderRadius: 4,
		backgroundColor: palette.background.base10,
		color: 'white',
	},
	searchIcon: {
		height: 24,
		width: 24,
	},
	suggestContainer: {
		position: 'absolute',
		top: 45,
		left: 30,
		width: 516,
		borderRadius: 4,
		backgroundColor: palette.background.base40,
		opacity: 0,
		[breakpoints.only('md')]: {
			width: 404,
		},
		[breakpoints.only('sm')]: {
			left: 30,
			width: 404,
		},
		[breakpoints.only('xs')]: {
			left: 0,
			width: '100%',
		},
	},
	suggestContainerOpen: {
		opacity: 1,
	},
}))

export const NavSearchField = ({
	setSearchOpen, searchOpen,
}) => {
	const classes = useStyles()
	const searchBarRef = useRef()
	const {
		setSearchTerm, setUncommittedSearchTerm, uncommittedSearchTerm,
		setSearchSuggestOpen, searchSuggestOpen,
	} = useSearchContext()
	const queryParams = {
		page_size: 5,
		q: uncommittedSearchTerm,
	}
	const { data: suggestData = [], error } = useFetchList({
		queryKey: ['elastic-search-suggest', queryParams],
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

	const handleSearch = async (q) => {
		// const filterStoreKey = `elastic-search-${searchTab}`
		// const queryParams = {
		// 	q,
		// 	limit: 8,
		// }

		// const filterHash = slimObjectHash(queryParams)
		// push(createDynamicSearchTabUrl(searchTab))
		// await dispatch(
		// 	thunkElasticSearchQuery({
		// 		filterStoreKey,
		// 		filterHash,
		// 		queryParams,
		// 		recordType: searchTab,
		// 		tab: searchTab,
		// 	}),
		// )
		// setSearchSuggestOpen(false)
		// setSearchOpen(false)
		// setSearchTerm(q)
	}

	const debounceHandleChange = debounce(
		(q) => {
			setSearchSuggestOpen(true)
			setUncommittedSearchTerm(q)
		},
		150,
	)

	const handleClick = (e, onOpen) => {
		// Close suggest if the user clicks anything else
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
	})

	return (
		<div
			ref={searchBarRef}
			className={
				clsx(
					classes.searchBar,
					{
						[classes.searchBarClosed]: !searchOpen,
						[classes.openSearchBar]: searchOpen,
					},
				)
			}
		>
			<IconButton
				onClick={handleCloseSearch}
			>
				<ChevronLeft className={classes.searchIcon} />
			</IconButton>
			<TextField
				handleOnChange={debounceHandleChange}
				handleSearch={handleSearch}
				handleClick={handleClick}
				focusSearch={searchOpen}
				noMaxWidth
				dark
			/>
			<div
				className={
					clsx(
						classes.suggestContainer,
						{
							[classes.suggestContainerOpen]: searchSuggestOpen,
						},
					)
				}
			>
				{/* <SuggestDropdown
					setSearchSuggestOpen={setSearchSuggestOpen}
					searchSuggestOpen={searchSuggestOpen}
					searchSuggest={formattedSearchResults}
					setSearchOpen={setSearchOpen}
				/> */}
			</div>
		</div>
	)
}

export default NavSearchField
