import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Hidden from '@material-ui/core/Hidden'
import times from 'ramda/src/times'
import { indexedMap, orNull } from 'util/ramdaPlus'
import { trackRecordType, collectionRecordType, profileRecordType } from 'logic/api/recordTypes'

import LinkedPageSection from 'components/base/LinkedPageSection'

// import PlaylistCard from 'components/playlists/PlaylistCard'

import { flexContainerStyles } from 'styles/common'

// import TrackListItem from '@/client/web/tracks/TrackListItem'
// import SimpleTrackListItem from '@/client/web/tracks/SimpleTrackListItem'
// import SimpleLoadingTrackListItem from '@/client/web/tracks/SimpleLoadingTrackListItem'
import ProfileCard from 'components/profile/ProfileCard'

import {
	createCollectionRecordTracksApiPath, createProfileTracksApiPath, tracksRecordApiPath
} from 'logic/api/apiPaths'

const useStyles = makeStyles(({ breakpoints }) => ({
	topResultWrapper: {
		...flexContainerStyles,
		[breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	resultWrapper: {
		maxWidth: '33%',
	},
	relatedTracksWrapper: {
		...flexContainerStyles,
		maxWidth: '66%',
	},
	artistCard: {
		width: 264,
		padding: [[0, 16]],
	},
	playlistCard: {
		padding: '60px 24px 0 0',
	},
}))


const SearchRelatedTracks = ({ path, recordType, recordId }) => {
	const [processing, setProcessing] = useState(false)
	const dispatch = useDispatch()
	const filterStoreKey = `search-related-tracks-${recordType}-${recordId}`
	const sm = useMediaQuery(theme => theme.breakpoints.only('sm'))
	const queryParams = {
		limit: 5,
		sort: recordType === profileRecordType ? '-popularity' : 'position'
	}
	useEffect(
		() => {
			setProcessing(true)
			dispatch(thunkApiRequestList({
				path,
				recordType: trackRecordType,
				filterHash,
				filterStoreKey,
				queryParams,
				activeProfileId,
				invalid: true,
			})).then(() => {
				setProcessing(false)
			})
		}, [filterStoreKey],
	)
	const list = useSelector(selectorListItems({
		filterStoreKey, filterHash,
	}))

	return (
		<LinkedPageSection
			noPadding
			noMargin
			title={recordType === profileRecordType ? 'Top Tracks' : ''}
		>
			{processing
				? times(() => <SimpleLoadingTrackListItem />, 5)
				: indexedMap(
					(id, index) => (
						<SimpleTrackListItem
							medium={!sm}
							small={sm}
							recordId={id}
							index={index}
						/>
					),
					list,
				)
			}
		</LinkedPageSection>
	)
}

const PlaylistTopResult = ({ recordId, recordType, totalTracks }) => {
	const classes = useStyles()
	const path = createCollectionRecordTracksApiPath(recordId)
	return (
		<div className={classes.topResultWrapper}>
			<div className={clsx(classes.resultWrapper, classes.playlistCard)}>
				<PlaylistCard recordType={recordType} recordId={recordId} />
			</div>
			{
				orNull(
					totalTracks,
					<div className={classes.relatedTracksWrapper}>
						<SearchRelatedTracks recordId={recordId} path={path} recordType={recordType} />
					</div>,
				)
			}
		</div>
	)
}

const ProfileTopResult = ({ recordId, recordType, totalTracks }) => {
	const classes = useStyles()
	const path = createProfileTracksApiPath(recordId)
	return (
		<div className={classes.topResultWrapper}>
			<div className={clsx(classes.resultWrapper, classes.artistCard)}>
				<ProfileCard recordId={recordId} />
			</div>
			{
				orNull(
					totalTracks,
					<div className={classes.relatedTracksWrapper}>
						<SearchRelatedTracks recordId={recordId} path={path} recordType={recordType} />
					</div>,
				)
			}
		</div>
	)
}

// const TrackTopResult = ({ recordId }) => {
// 	useEffect(
// 		() => {
// 			dispatch(thunkApiRequestRecord({
// 				path: tracksRecordApiPath(recordId),
// 				recordType: trackRecordType,
// 				recordId,
// 				activeProfileId,
// 			}))
// 		}, [recordId, activeProfileId],
// 	)
// 	return <TrackListItem recordId={recordId} />
// }

const TopResultRender = ({ recordType, recordId, totalTracks }) => {
	switch (recordType) {
		case trackRecordType:
			return <TrackTopResult recordId={recordId} />
		case profileRecordType:
			return (
				<ProfileTopResult
					totalTracks={totalTracks}
					recordId={recordId}
					recordType={recordType}
				/>
			)
		case collectionRecordType:
			return (
				<PlaylistTopResult
					totalTracks={totalTracks}
					recordId={recordId}
					recordType={recordType}
				/>
			)
		default:
			return null
	}
}

export default ({ recordType, recordId, totalTracks }) => {
	return (
		<Hidden only="xs">
			<LinkedPageSection
				noPadding
				title="Top Result"
			>
				<TopResultRender totalTracks={totalTracks} recordId={recordId} recordType={recordType} />
			</LinkedPageSection>
		</Hidden>
	)
}
