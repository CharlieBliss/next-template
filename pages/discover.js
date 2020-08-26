/** @jsx jsx */
import { useContext, useState } from 'react'
import { jsx, css } from '@emotion/core'
import Link from 'next/link'
import { AuthContext } from 'pages/_app'
import H4 from 'components/typography/H4'
import useFetchInfiniteList from 'logic/api/useFetchInfiniteList'
import InfiniteList from 'components/base/InfiniteList'
import RemoteImage from 'components/base/RemoteImage'
import Passport from 'components/base/Passport'
import DiscoverFilters from 'components/discover/DiscoverFilters'
import { trackRecordType } from 'logic/api/recordTypes'

const createStyles = (id) => ({
	padding: '0.5em',
	margin: '0.5em',
	color: `RGB(${id % 256}, 200, 200)`,
	background: 'papayawhip',
	border: 'none',
	borderRadius: '3px',
})

const imageStyle = css`
	height: 50px;
	width: 50px
`

const Discover = () => {
	const { authenticated } = useContext(AuthContext)
	const [filters, setFilters] = useState({
		status: 'completed',
		sort: '-published',
		exclude_removed: true,
	})
	const {
		status, data = [], error, fetchMore, total,
	} = useFetchInfiniteList({
		recordType: trackRecordType,
		path: 'tracks',
		queryParams: filters,
	})

	if (authenticated) {
		return (
			<>
				<DiscoverFilters
					filters={filters}
					setFilters={setFilters}
				/>
				<div>
					<H4>
						Hello, this is the discover page. You need to be authenticated to see me.
					</H4>
					<div>
						<InfiniteList
							loadMore={fetchMore}
							itemCount={total}
							listData={data}
							Component={({ index, style }) => {
								const item = data[index]
								if (!item) {
									return (
										<div style={style} css={createStyles(index)}>
										</div>
									)
								}
								return (
									<div style={style}>
										<Link href="tracks/[id]" as={`tracks/${item.id}`} key={item.id}>
											<a>
												<div
													css={createStyles(item.id)}
												>
													<RemoteImage imageCss={[imageStyle]} uuid={item.image_uuid} />
													<Passport
														title={item.title}
														subtitle={item.artist_name}
													/>
												</div>
											</a>
										</Link>
									</div>
								)
							}}
						/>
					</div>
				</div>
			</>
		)
	}
	return (
		<div>
			Warnign you are banned
		</div>
	)
}

export default Discover
