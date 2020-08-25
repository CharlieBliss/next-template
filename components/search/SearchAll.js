import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import path from 'ramda/src/path'
import sort from 'ramda/src/sort'
import values from 'ramda/src/values'
import { useRouter } from 'next/router'
import LoadingSpinner from '@material-ui/core/CircularProgress'

import { indexedMap, ternary } from 'util/ramdaPlus'

import LinkedPageSection from 'components/base/LinkedPageSection'
import H2 from 'components/typography/H2'

import { useSearchContext } from 'logic/contexts/SearchContext'
import { SearchResultGroup } from 'components/search/SearchItemComponents'
import SearchTopResult from 'components/search/SearchTopResult'
import { titleMap } from 'logic/search/searchUtils'
import useFetchSearch from 'logic/api/useFetchSearch'


// const useStyles = makeStyles(({ breakpoints }) => ({
// 	pageWrapper: {
// 		width: '100%',
// 		overflow: 'hidden',
// 	},
// 	container: {
// 		[breakpoints.up('lg')]: {
// 			overflow: 'hidden',
// 		},
// 	},
// 	sectionItem: {
// 		width: '100%',
// 	},
// 	emptyMessage: {
// 		paddingTop: 20,
// 		textAlign: 'center',
// 	},
// }))

export const OrderedResults = ({ searchResults = [] }) => {
	return indexedMap(
		(searchResult, i) => {
			const { results } = searchResult
			const records = results.map(result => result.record)
			if (records.length) {
				return (
					<LinkedPageSection
						index={i}
						noPadding
						title={titleMap(searchResult.recordType)}
						linkText="View More"
						// to={createDynamicSearchTabUrl(searchResult.recordType)}
					>
						<SearchResultGroup recordType={searchResult.recordType} records={records} />
					</LinkedPageSection>
				)
			}
			return null
		},
		searchResults,
	)
}

const defaultList = []

export default () => {
	const router = useRouter()
	const classes = {}
	const { searchTerm, setSearchTerm } = useSearchContext()

	useEffect(
		() => {
			if (router.query.q) {
				setSearchTerm(router.query.q)
			}
		}, [router.query],
	)

	const queryParams = {
		q: searchTerm,
	}

	const { data, error, loading } = useFetchSearch({
		path: 'all',
		queryParams,
		enabled: searchTerm,
	})

	const formattedData = sort(
		(a, b) => b.maxScore - a.maxScore,
		values(data),
	) || defaultList

	const results = formattedData
	const topRecordId = path([0, 'results', 0, 'record', 'id'], results)
	const topRecordType = path([0, 'recordType'], results)
	const topRecordTotalTracks = path([0, 'results', 0, 'record', 'total_tracks'], results)

	if (loading) {
		return (
			<div className={classes.emptyMessage}>
				<LoadingSpinner />
			</div>
		)
	}
	return (
		<div className={classes.pageWrapper}>
			<Container fixed className={classes.container}>
				{
					ternary(
						topRecordId,
						(
							<>
								<div className={classes.sectionItem}>
									Top Result Goes Here
								</div>
								<OrderedResults searchResults={results} />
							</>
						),
						(
							<div className={classes.emptyMessage}>
								<H2>
									{
										searchTerm
											? `No results found for "${searchTerm}"`
											: 'Enter a search term above'
									}
								</H2>
							</div>
						),
					)
				}
			</Container>
		</div>
	)
}
