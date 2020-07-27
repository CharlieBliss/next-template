import React, { useCallback } from 'react'
import map from 'ramda/src/map'
import toPairs from 'ramda/src/toPairs'
import omit from 'ramda/src/omit'
import last from 'ramda/src/last'
import { FixedSizeList } from 'react-window'
import Body10 from 'components/typography/Body10'
import ChannelListItem from 'components/chat/ChannelListItem'
import { useChatContext } from 'components/chat/ChatContext'

import { makeStyles } from '@material-ui/styles'
import InfiniteList from 'components/base/InfiniteList'

const useStyles = makeStyles({
	noChannelsContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})


export const ChannelList = () => {
	const classes = useStyles()
	const {
		streamClient, channels, handleOpenChannel, fetchAndSetNextChannels,
		allChannelsFetched,
	} = useChatContext()

	const channelProfiles = map(
		(channel) => toPairs(
			omit([506], channel.data.userProfilesObj),
		)[0][1],
		channels
	)
	const queryParams = {
		profile_ids: channelProfiles
	}
	const loadMore = useCallback(() => fetchAndSetNextChannels({
		offset: channels.length,
	}), [channels.length])
	// const scrollList = map(channel => prop('cid', channel), channels)
	if (channels.length) {
		return (
			<InfiniteList
				loadMore={loadMore}
				itemCount={channels.length}
				listData={channels}
				Component={({ index, style }) => (
						<ChannelListItem
							streamClient={streamClient}
							channel={channels[index]}
							style={style}
							key={channels[index].id}
							handleOpenChannel={handleOpenChannel}
						/>
					)
				}
			/>
		)
	}
	return (
		<div className={classes.noChannelsContainer}>
			<Body10>No conversations</Body10>
		</div>
	)
}
export default ChannelList
