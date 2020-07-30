/** @jsx jsx */
import { useContext } from 'react'
import { jsx, css } from '@emotion/core'
import Link from 'next/Link'
import { AuthContext } from 'pages/_app'
import useFetchList from 'api/useFetchList'
import H4 from 'components/typography/H4'
import useFetchInfiniteList from 'api/useFetchInfiniteList'
import InfiniteList from 'components/base/InfiniteList'
import RemoteImage from 'components/base/RemoteImage'
import Passport from 'components/base/Passport'

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
	const { status, data = [], error, fetchMore, total} = useFetchInfiniteList('tracks')
	if(authenticated) {
		return (
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
							if(!item) {
								return null
							}
							return (
								<div style={style}>
									<Link href="tracks/[id]" as={`tracks/${item.id}`} key={item.id}>
										<a>
											<div
												css={createStyles(item.id)}
											>
												<div css={imageStyle}>
													<RemoteImage uuid={item.image_uuid} />
												</div>
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
		)
	}
	return (
		<div>
			Warnign you are banned
		</div>
	)
}

export default Discover
