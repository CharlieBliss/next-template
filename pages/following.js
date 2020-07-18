/** @jsx jsx */
import { useContext, useEffect, useState } from 'react'
import path from 'ramda/src/path'
import { jsx, css } from '@emotion/core'
import Link from 'next/Link'
import { AuthContext } from 'pages/_app'
import useFetchList from 'api/useFetchList'
import H4 from 'components/typography/H4'
import Body30 from 'components/typography/Body30'

import apiRequest from 'api/apiRequest'
import { truncateStyles } from 'styles/common'
import { useFeedContext } from 'components/activityFeed/FeedContext'

const wrapTruncate = css`
	display: inline-flex;
	max-width: 250;
`

const itemStyle = css`
	display: flex;
	white-space: break-spaces;
`

const FeedItem = ({ feedItem }) => {
	const {
		verb, activites, updated_at
	} = feedItem
	const primaryActor = path(
		['activities', 0, 'actor', 'data', 'name'],
		feedItem,
	)
	const objectTitle = path(
		['activities', 0, 'object', 'data', 'title'],
		feedItem,
	)
	switch(verb) {
		case 'track-published':
			return (
				<div css={itemStyle}>
					<span css={wrapTruncate}>
						<Body30
							fontWeight="bold"
							// css={truncateStyles}
						>
							{`${primaryActor}`}
						</Body30>
					</span>
					<Body30>
						{' posted a track '}
					</Body30>
					<div css={wrapTruncate}>
						<Body30
							fontWeight="bold"
							// css={truncateStyles}
						>
							{objectTitle}
						</Body30>
					</div>
				</div>
			)
		default:
			return (
				<div>
					{feedItem.id}
				</div>
			)

	}
}


const Following = () => {
	const { authenticated } = useContext(AuthContext)
	const [feed, setFeed] = useState([])
	const [act, setActFeed] = useState([])
	const { followingFeed, activityFeed, init } = useFeedContext()
	console.log('following')
	useEffect(() => {
		if(init) {
			console.log(init, followingFeed)
			activityFeed.get({ limit: 20, mark_seen: true, mark_read: false }).then((res) => {
				setActFeed(res.results)
			})
			followingFeed.get({ limit: 20, mark_seen: true, mark_read: false }).then((res) => {
				setFeed(res.results)
			})
		}
	}, [init])

	if (authenticated) {
		return (
			<div>
				<H4>
					Hello, this is the notifications page. You need to be authenticated to see me.
				</H4>
				{
					feed.map(feedItem => <FeedItem feedItem={feedItem} />)
				}
				{
					act.map(feedItem => <FeedItem feedItem={feedItem} />)
				}
			</div>
		)
	}
	return (
		<div>
			Warnign you are banned
		</div>
	)
}


export default Following
