import React, { useCallback } from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import H4 from 'components/typography/H4'
import H5 from 'components/typography/H5'

import ChannelList from 'components/chat/ChannelList'
import ChatModal from 'components/chat/ChatModal'
import Link from 'components/base/Link'

import { useChatContext } from 'components/chat/ChatContext'

let navBarHeight
let smallScreenNavBarHeight
let smallScreenHeaderHeight
let globalPlayerHeight
let smallGlobalPlayerHeight

const ChatWindow = dynamic(() => import("components/chat/ChatWindow"), {
	ssr: false,
})

const useStyles = makeStyles(theme => ({
	iconWidth: {
		width: 16,
	},
	editButtonMargin: {
		marginRight: 8,
	},
	progressContainer: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	drawerParent: {
		width: 360,
		'& > div': {
			top: navBarHeight,
			// [theme.breakpoints.down('sm')]: {
			// 	top: smallScreenHeaderHeight,
			// },
			// [theme.breakpoints.only('xs')]: {
			// 	// account for top pageHeader bar and bottom navBar
			// 	height: `calc(100% - ${smallScreenHeaderHeight + smallScreenNavBarHeight}px)`,
			// },
		},
	},
	drawerParentPlayerOpen: {
		'& > div': {
			bottom: globalPlayerHeight,
			height: 'inherit',
			// [theme.breakpoints.only('sm')]: {
			// 	bottom: smallGlobalPlayerHeight,
			// },
			// [theme.breakpoints.only('xs')]: {
			// 	bottom: smallGlobalPlayerHeight + smallScreenHeaderHeight,
			// },
		},
	},
	drawer: {
		width: 360,
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'scroll',
		overscrollBehavior: 'contain',
		height: '100%',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			width: 0,
			background: 'transparent',
		},
		// [theme.breakpoints.only('sm')]: {
		// 	width: 300,
		// },
		// [theme.breakpoints.only('xs')]: {
		// 	width: 320,
		// },
	},
	header: {
		height: 48,
		padding: [[0, 16]],
	},
	buttonArea: {
		display: 'flex',
		flexDirection: 'row',
	},
	subHeader: {
		height: 24,
		padding: [[0, 16]],
	},
	newMessage: {
		// ...theme.typography.body30,
		// color: theme.palette.primary.main,
		// '&:hover': {
		// 	opacity: theme.opacity.inputHover,
		// 	textDecoration: 'underline',
		// },
	},
}))

const drawer = ({ palette }) => css`
	width: 360px;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	overscroll-behavior: contain;
	height: 100%;
	background-color: ${palette.background.base20};
	label: drawer;
	MuiDrawer-paper: {
		top: 56px;
	}
`

const headerBase = ({ palette }) => css`
	display: flex;
	flex-shrink: 0;
	flex-direction: row;
	justify-content: space-between;
	alignItems: center;
	backgroundColor: ${palette.background.base10};
`

const header = css`
	height: 48px;
	padding: [[0px, 16px]];
`


export const ChannelDrawer = () => {
	const {
		chatDrawerOpen, channels, toggleDrawer, setNewChatModalOpen,
	} = useChatContext()
	const classes = useStyles()
	const playerOpen = false
	const openNewChatModal = useCallback(() => {
		setNewChatModalOpen(true)
	}, [])
	return (
		<>
			<Drawer
				// css={clsx(
				// 	classes.drawerParent,
				// 	classes.drawer,
				// 	{
				// 		[classes.drawerParentPlayerOpen]: playerOpen,
				// 	},
				// )}
				css={drawer}
				anchor="right"
				variant="persistent"
				open={chatDrawerOpen === 'chat'}
			>
				<div css={theme => drawer(theme)}>
					<div css={theme => [headerBase(theme), header]}>
						<H4>Chat</H4>
						<div className={classes.buttonArea}>
							<IconButton
								onClick={() => toggleDrawer(false)}
								aria-label="Close chat drawer"
							>
								<Close className={classes.iconWidth} />
							</IconButton>
						</div>
					</div>
					<Divider />
					<div className={clsx(classes.headerBase, classes.subHeader)}>
						<H5>Inbox</H5>
						<Link
							onClick={openNewChatModal}
							className={classes.newMessage}
						>
							New Message
						</Link>
					</div>
					<Divider />
					{channels
						? (
							<ChannelList />
						) : (
							<div className={classes.progressContainer}>
								<CircularProgress />
							</div>
						)
					}
				</div>
			</Drawer>
			<ChatWindow />
			<ChatModal />
		</>
	)
}

export default ChannelDrawer