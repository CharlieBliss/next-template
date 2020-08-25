/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useMutation } from 'react-query'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { trackRecordType, collectionRecordType, profileRecordType } from 'logic/api/recordTypes'
import { searchHistoryApiPath } from 'logic/api/apiPaths'
import utilApiRequest from 'logic/api/apiRequest'
import TrackCard from 'components/track/TrackCard'
import ProfileCard from 'components/profile/ProfileCard'
// import PlaylistCard from '@/client/web/playlists/PlaylistCard'
import Passport from 'components/base/Passport'

import ClickableLink from 'components/base/Link'
import { flexContainerStyles } from 'styles/common'
import { linkMap, suggestSubtitle, resourceTypeMap } from 'logic/search/searchUtils'

const listItem = css`
	padding: 10px;
`

const listWrapper = css`
	flex-wrap: 'wrap',
`

export const TrackSearchResultsWrapper = ({ records = [], handleHistoryAdd }) => {
	return records.map(
		record => (
			<div css={listItem}>
				<TrackCard
					record={record}
					onClick={() => handleHistoryAdd(record.id)}
					search
				/>
			</div>
		),
	)
}

export const ProfileSearchResultsWrapper = ({ records = [], handleHistoryAdd }) => {
	return records.map(
		record => (
			<div css={listItem}>
				<ProfileCard
					record={record}
					onClick={() => handleHistoryAdd(record.id)}
					search
				/>
			</div>
		),
	)
}

export const CollectionSearchResultsWrapper = ({ records = [], recordType, handleHistoryAdd }) => {
	return records.map(
		record => (
			<div css={listItem}>
				<TrackCard
					record={record}
					recordType={recordType}
					onClick={() => handleHistoryAdd(record.id)}
				/>
			</div>
		),
	)
}

const XsItem = ({ record, recordType, handleHistoryAdd }) => {
	const {
		title, name, id, image_uuid: image, display_image_uuid: displayImage, ...rest
	} = record
	return (
		<ClickableLink
			to={linkMap(recordType, id)}
			className={listItem}
			onClick={() => handleHistoryAdd(id)}
		>
			<Passport
				title={title || name}
				subtitle={suggestSubtitle(recordType, rest)}
				src={displayImage || image}
			/>
		</ClickableLink>
	)
}

const XsIdItemWrapper = ({ records, recordType, handleHistoryAdd }) => records.map(
	record => (
		<XsItem
			record={record}
			recordType={recordType}
			handleHistoryAdd={handleHistoryAdd}
		/>
	),
)

export const XsItemListWrapper = ({ records = [], recordType, handleHistoryAdd }) => {
	return records.map(
		record => (
			<ClickableLink
				to={linkMap(recordType, record.id)}
				className={listItem}
				onClick={() => handleHistoryAdd(record.id)}
			>
				<Passport
					title={record.title || record.name}
					subtitle={suggestSubtitle(recordType, record)}
					src={record.image_uuid}
				/>
			</ClickableLink>
		),
	)
}

export const SearchResultGroup = ({ recordType, records, idsOnly }) => {
	const xs = useMediaQuery(theme => theme.breakpoints.only('xs'))
	const addHistory = (recordId) => utilApiRequest({
		path: searchHistoryApiPath,
		authenticated: true,
		method: 'POST',
		payload: {
			resource_id: recordId,
			resource_type: resourceTypeMap[recordType],
		},
	})
	const { handleHistoryAdd } = useMutation(addHistory)

	if (!records.length) {
		return null
	}
	if (xs && idsOnly) {
		return (
			<XsIdItemWrapper
				records={records}
				handleHistoryAdd={handleHistoryAdd}
				recordType={recordType}
			/>
		)
	}
	if (xs) {
		return (
			<XsItemListWrapper
				records={records}
				handleHistoryAdd={handleHistoryAdd}
				recordType={recordType}
			/>
		)
	}
	if (recordType === trackRecordType) {
		return (
			<div css={[listWrapper, flexContainerStyles]}>
				<TrackSearchResultsWrapper
					records={records}
					handleHistoryAdd={handleHistoryAdd}
					idsOnly={idsOnly}
				/>
			</div>
		)
	}
	if (recordType === collectionRecordType) {
		return (
			<div css={[listWrapper, flexContainerStyles]}>
				<CollectionSearchResultsWrapper
					records={records}
					handleHistoryAdd={handleHistoryAdd}
					recordType={recordType}
					idsOnly={idsOnly}
				/>
			</div>
		)
	}
	if (recordType === profileRecordType) {
		return (
			<div css={[listWrapper, flexContainerStyles]}>
				<ProfileSearchResultsWrapper
					records={records}
					handleHistoryAdd={handleHistoryAdd}
					idsOnly={idsOnly}
				/>
			</div>
		)
	}
	return null
}
