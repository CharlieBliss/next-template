import React, { useEffect } from 'react'
import toPairs from 'ramda/src/toPairs'
import map from 'ramda/src/map'
import { jsx, css } from '@emotion/core'
/** @jsx jsx */
import none from 'ramda/src/none'
import IconButton from '@material-ui/core/IconButton'
import ClickableLink from 'next/Link'
import X from '@material-ui/icons/Close'
import useFetchList from 'logic/api/useFetchList'
import Body30 from 'components/typography/Body30'
import Passport from 'components/base/Passport'
import { createSearchHistoryRecordHideApiPath, searchHistoryApiPath } from 'logic/api/apiPaths'
import { useSearchContext } from 'logic/contexts/SearchContext'

import {
	suggestHistorySubtitle, linkMap, suggestSubtitle,
	suggestSubtitleTo, titleMap, resourceTypeMap, searchResourceTypeMap
} from 'logic/search/searchUtils'

const sectionTitle = ({ opacity }) => css`
	padding: 8;
	opacity: ${opacity.tertiaryDefault};
`

const listItem = ({ colors }) => css`
	display: flex;
	flex-direction: row;
	padding: 8;
	&:hover: {
		backgroundColor: ${colors.base20};
	},
`

const listItemLink = css`
	position: absolute;
	height: 100%;
	width: 100%;
`

const xButton = css`
	width: 4em;
`

const xStyles = css`
	width: 2em;
	height: 2em;
`

// const useSuggestStyles = makeStyles(({ palette, breakpoints, opacity }) => ({

// 	xButton: {
// 		width: 42,
// 	},
// 	x: {
// 		width: 12,
// 		height: 12,
// 	},
// }))

const HistoryItem = ({ item, handleCloseSearchSuggest }) => {
	const { resource_data: data, resource_type: type, id: historyId } = item
	const {
		id, name, title, artist,
		profile_id: profileId, display_image_uuid: displayImage,
		image_uuid: imageUuid,
	} = data
	const recordType = searchResourceTypeMap[type]
	// const handleHideItem = (e) => {
	// 	e.stopPropagation()
	// 	e.preventDefault()
	// 	// Prevents suggest from closing
	// 	e.nativeEvent.stopImmediatePropagation()
	// 	utilApiRequest({
	// 		path: createSearchHistoryRecordHideApiPath(historyId),
	// 		authenticated: true,
	// 		method: 'PATCH',
	// 		payload: {
	// 			resource_id: recordId,
	// 			resource_type: resourceTypeMap[recordType],
	// 		},
	// 	})
	// }
	return (
		<div
			css={listItem}
		>
			{/* <ClickableLink
				key={id}
				to={linkMap(recordType, id)}
				className={classes.listItemLink}
				onClick={handleCloseSearchSuggest}
			/> */}
			<Passport
				title={title || name}
				subtitle={suggestHistorySubtitle(recordType, data)}
				subtitleTo={suggestSubtitleTo(recordType, artist || profileId)}
				src={displayImage || imageUuid}
			/>
			<IconButton
				css={xButton}
				// onClick={handleHideItem}
			>
				<X css={xStyles} />
			</IconButton>
		</div>
	)
}

const SearchHistory = ({ handleCloseSearchSuggest }) => {
	const classes = {}
	const { data, error } = useFetchList({
		queryKey: searchHistoryApiPath,
		queryParams: {
			limit: 5,
		},
	})
	if (data) {
		return (
			<>
				<div css={sectionTitle}>
					<Body30>
						Recent Searches
					</Body30>
				</div>
				{
					map(
						item => (
							<HistoryItem
								handleCloseSearchSuggest={handleCloseSearchSuggest}
								item={item}
							/>
						),
						data,
					)
				}
			</>
		)
	}
	return null
}

const SearchSuggestDropdown = ({ searchSuggest = {}, setSearchSuggestOpen, setSearchOpen }) => {
	const classes = {}
	const { uncommittedSearchTerm } = useSearchContext()
	const pairs = toPairs(searchSuggest)
	const empty = none(([key, values]) => values, pairs)

	const handleCloseSearchSuggest = async (recordId, recordType) => {
		setSearchSuggestOpen(false)
		setSearchOpen(false)
		// if (recordType && recordId) {
		// 	utilApiRequest({
		// 		path: searchHistoryApiPath,
		// 		authenticated: true,
		// 		method: 'POST',
		// 		payload: {
		// 			resource_id: recordId,
		// 			resource_type: resourceTypeMap[recordType],
		// 		},
		// 	})
		// }
	}

	if (!uncommittedSearchTerm) {
		return <SearchHistory handleCloseSearchSuggest={handleCloseSearchSuggest} />
	}
	if (empty) {
		return (
			<div className={classes.sectionTitle}>
				<Body30>
					No suggestions
				</Body30>
			</div>
		)
	}
	return map(
		(([key, values]) => {
			if (values) {
				return (
					<React.Fragment
						key={key}
					>
						<div css={sectionTitle}>
							<Body30>
								{titleMap(key)}
							</Body30>
						</div>
						{
							map(
								record => (
									<div
										css={listItem}
									>
										{/* <ClickableLink
											key={record.id}
											className={classes.listItemLink}
											to={linkMap(key, record.id)}
											onClick={() => handleCloseSearchSuggest(record.id, key)}
										/> */}
										<Passport
											title={record.title || record.name}
											subtitle={suggestSubtitle(key, record)}
											subtitleTo={suggestSubtitleTo(key, record.artist || record.profile_id)}
											src={record.display_image_uuid || record.image_uuid}
										/>
									</div>
								),
								values,
							)
						}
					</React.Fragment>
				)
			}
			return null
		}),
		pairs,
	)
}

export default SearchSuggestDropdown
