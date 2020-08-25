/** @jsx jsx */
import { useQuery, queryCache } from 'react-query'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { css, jsx } from '@emotion/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/Link'
import Body30 from 'components/typography/Body30'
import InfiniteList from 'components/base/InfiniteList'
import useFetchRecord from 'logic/api/useFetchRecord'
import useFetchInfiniteList from 'logic/api/useFetchInfiniteList'

const TrackListItem = ({ record, style }) => {
	if (record) {
		return (
			<div style={style}>
				<Body30>
					{record.title}
				</Body30>
			</div>
		)
	}
	return (
		<div style={style}>
			'Loading...'
		</div>
	)
}

export default function PlaylistDetail() {
	const router = useRouter()
	const { id } = router.query
	const { data } = useFetchRecord('collections', id)
	const {
		data: tracks = [],
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		status,
		error,
		total,
	} = useFetchInfiniteList(
		`collections/${id}/tracks`,
		{
			page_size: 10,
			is_playlist: true,
			sort: 'position',
			active_profile_id: 112,
		},
		null,
		id,
	)
	return (
		<>
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
							<TrackListItem
								style={style}
								record={tracks[index]}
							/>
						)
					}
				/>
			</div>
		</>
	)
}
