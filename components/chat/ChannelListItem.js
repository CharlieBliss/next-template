import React, { useCallback } from 'react'
import Badge from '@material-ui/core/Badge'
/* @jsx jsx */
import { makeStyles } from '@material-ui/core/styles'
import { css, jsx } from '@emotion/core'
import path from 'ramda/src/path'
import dayjs from 'dayjs'
import toPairs from 'ramda/src/toPairs'
import omit from 'ramda/src/omit'
import last from 'ramda/src/last'
import { useIsFetching } from 'react-query'


import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import useFetchRecord from 'logic/api/useFetchRecord'
import H5 from 'components/typography/H5'
import Body20 from 'components/typography/Body20'
import Body30 from 'components/typography/Body30'
import RemoteImage from 'components/base/RemoteImage'
import { useChatContext } from 'components/chat/ChatContext'

const useStyles = makeStyles(theme => ({
	unreadBadge: {
		borderRadius: '50%',
		width: 8,
		height: 8,
		// backgroundColor: theme.palette.primary.main,
		marginRight: 8,
	},
	avatarWidth: {
		maxWidth: 65,
		marginRight: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: '50%',
	},
	avatarContainer: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fromNowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'end',
		height: 40,
	},
	textContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		height: 40,
		width: 0, // this makes the textOverflow work
	},
	textPrimary: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
		// '& div': truncateStyles,
	},
	textSecondary: {
		display: 'flex',
		flexDirection: 'column',
		// '& div': truncateStyles,
	},
	namePlaceholder: {
		height: 20,
		width: 120,
	},
	avatarBadge: {
		'& span': {
			width: 8,
			height: 8,
			// border: [[1, 'solid', theme.palette.background.base20]],
			// This is so the badge doesn't overlap the emoji picker. No idea
			// why setting zindex on the picker does nothing. This seems to
			// be fine though.
			zIndex: 0,
		},
	},
	listItem: {
		padding: [[0, 16]],
		// borderBottom: [[1, 'solid', theme.palette.background.base10]],
	},
	moreButton: {
		margin: [[0, 8]],
	},
}))

const showChannel = ({ channel, client }) => {
	const meUserId = client.userID
	const createdBy = path(['data', 'created_by', 'id'], channel)
	const messages = path(['state', 'messages'], channel)
	return createdBy === meUserId || messages.length
}

const avatar = css`
	height: 50px;
	width: 50px;
`

export default ({ channel, style }) => {
	const {
		streamClient, handleOpenChannel,
	} = useChatContext()

	const themProfileId = toPairs(
		omit([506], channel.data.userProfilesObj),
	)[0][1]
	const enabled = !useIsFetching()
	const { data = {} } = useFetchRecord({
		queryKey: 'profiles-chat',
		id: themProfileId,
		settings: { enabled },
	})
	const { image_uuid: imageUuid, name } = data
	const hasUnreadMessages = channel.disconnected ? false : channel.countUnread()
	const classes = useStyles()
	const handleClick = () => { handleOpenChannel(channel) }
	const show = showChannel({ client: streamClient, channel })
	const mostRecentMessage = last(channel.state.messages)
	// const isOnline = path(['state', 'members', themUserId, 'user', 'online'], channel)
	if (show) {
		return (
			<div
				container
				wrap="nowrap"
				justify="space-between"
				alignItems="center"
				style={style}
				className={classes.listItem}
			>
				<ListItem onClick={handleClick} button disableGutters>
					<ListItemAvatar className={classes.avatarWidth}>
						<div className={classes.avatarContainer}>
							{hasUnreadMessages
								? <div className={classes.unreadBadge} />
								: null
							}
							<Badge
								overlap="circle"
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								variant="dot"
								color="primary"
								className={classes.avatarBadge}
								// invisible={!isOnline}
							>
								<RemoteImage
									uuid={imageUuid}
									rounded
									imageSize={150}
									imageCss={avatar}
								/>
							</Badge>
						</div>
					</ListItemAvatar>
					<div className={classes.textContainer}>
						{name
							? (
								<div className={classes.textPrimary}>
									<H5>{name}</H5>
								</div>
							) : (
								<div className={classes.namePlaceholder}>
									{/* <LoadingPlaceholder /> */}
								</div>
							)
						}
						{mostRecentMessage ? (
							<div className={classes.textSecondary}>
								<Body20 fontWeight={hasUnreadMessages ? 'bold' : undefined}>
									{mostRecentMessage.text}
								</Body20>
							</div>
						) : null}
					</div>
					{mostRecentMessage ? (
						<div className={classes.fromNowContainer}>
							<Body30>
								{dayjs(mostRecentMessage.created_at).fromNow()}
							</Body30>
						</div>
					) : null}
				</ListItem>
				{/* <Grid item className={classes.moreButton}>
					<ChatWindowMoreButtonMenu recordId={id} channel={channel} />
				</Grid> */}
			</div>
		)
	}
}
