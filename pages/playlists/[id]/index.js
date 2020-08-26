/** @jsx jsx */
import { useQuery, queryCache } from 'react-query'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { css, jsx } from '@emotion/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/link'
import Body30 from 'components/typography/Body30'
import TrackListItem from 'components/track/TrackListItem/TrackListItem'
import InfiniteList from 'components/base/InfiniteList'
import useFetchRecord from 'logic/api/useFetchRecord'
import useFetchInfiniteList from 'logic/api/useFetchInfiniteList'
import { Container } from '@material-ui/core'
import { trackRecordType } from 'logic/api/recordTypes'

const TrackListItemWrapper = ({ record, style, queryKey }) => {
	if (record) {
		return (
			<div style={style}>
				<TrackListItem
					record={record}
					queryKey={queryKey}
				/>
			</div>
		)
	}
	return (
		<div style={style}>
			Loading...
		</div>
	)
}

export default function PlaylistDetail() {
	const router = useRouter()
	const { id } = router.query
	const { data } = useFetchRecord({
		queryKey: 'collections',
		id,
		settings: {
			enabled: id,
		},
	})

	const {
		data: tracks = [],
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		status,
		error,
		total,
		queryKey,
	} = useFetchInfiniteList({
		recordType: trackRecordType,
		path: `collections/${id}/tracks`,
		queryParams: {
			page_size: 10,
			is_playlist: true,
			sort: 'position',
			active_profile_id: 112,
		},
		settings: {
			enabled: id,
		},
	})

	return (
		<Container>
			<div>
				Welcome to the playlist detail detail page
			</div>
			<div>
				{data?.title}
			</div>
			<div>
				<InfiniteList
					loadMore={fetchMore}
					itemCount={total}
					listData={tracks}
					Component={({ index, style }) => (
							<TrackListItemWrapper
								style={style}
								record={tracks[index]}
								queryKey={queryKey}
							/>
						)
					}
				/>
			</div>
		</Container>
	)
}
