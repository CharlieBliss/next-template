import React from 'react'
import dynamic from 'next/dynamic'
import Portal from '@material-ui/core/Portal'
import Message from 'components/chat/Message'
/* @jsx jsx */
import { jsx, css } from '@emotion/core'
// import MessageHeader from 'component/chat/MessageHeader'

// import AttachFile from '@/client/web/svg/AttachFile'
// import Emoji from '@/client/web/svg/Emoji'

// import showPlayerSelector from '@/client/logic/globalPlayer/selectors/showPlayerSelector'
// import {
// 	smallGlobalPlayerHeight, globalPlayerHeight, smallScreenHeaderHeight,
// } from '@/client/constants/navBar'

// These components make references to document and therefore cannot be rendered serverside.
// This has the added effect of reducing the onload bundle size

const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
	ssr: false,
})

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
	ssr: false,
})

const Window = dynamic(() => import("stream-chat-react").then((mod) => mod.Window), {
	ssr: false,
})


const Thread = dynamic(() => import("stream-chat-react").then((mod) => mod.Thread), {
	ssr: false,
})

const MessageList = dynamic(() => import("stream-chat-react").then((mod) => mod.MessageList), {
	ssr: false,
})

const MessageInput = dynamic(() => import("stream-chat-react").then((mod) => mod.MessageInput), {
	ssr: false,
})

import { useChatContext } from 'components/chat/ChatContext'
import { useTheme } from 'emotion-theming'

const styles = ({ colors }) => ({
	chatWindowWrapper: {
		label: 'chatWindowWrapper',
		position: 'fixed',
		zIndex: 20,
		width: 320,
		right: 0,
		// [theme.breakpoints.only('sm')]: {
		// 	width: 300,
		// },
		// This transition comes from material ui
		transition: [['transform', '225ms', 'cubic-bezier(0, 0, 0.2, 1)', '0ms']],
		'& .str-chat': {
			height: 420,
		},
		'& .str-chat__send-button': {
			// [theme.breakpoints.up('sm')]: {
			// 	display: 'none',
			// },
		},
		'& .str-chat-channel.messaging .str-chat__main-panel': {
			padding: 0,
		},
		'& .str-chat__main-panel': {
			width: 320,
			maxWidth: '100%',
		},
		'& .messaging.str-chat.dark .str-chat__list': {
			padding: [[32, 16, 0]],
			backgroundColor: colors.base20,
			scrollbarColor: `${colors.base10} transparent`,
			'&::-webkit-scrollbar': {
				background: 'transparent',
			},
			'&::-webkit-scrollbar-thumb': {
				background: colors.base10,
				borderRadius: 4,
			},
		},
		// Text input and footer
		'& .str-chat__input-footer': {
			display: 'none',
		},
		'& .dark.str-chat .str-chat__input ': {
			backgroundColor: colors.base20,
			padding: 16,
			boxShadow: 'none',
		},
		'& .dark.str-chat .str-chat__input textarea': {
			backgroundColor: colors.base10,
			height: 36,
			borderRadius: 18,
			border: 0,
		},
		'& .str-chat__input-emojiselect, .str-chat__input .rfu-file-upload-button': {
			top: 'calc(100% - 51px)',
			opacity: 0,
		},
		'& .rfu-file-upload-button': {
			marginTop: 2,
		},
		'& .str-chat__textarea': {
			maxWidth: '80%',
			// [theme.breakpoints.only('xs')]: {
			// 	maxWidth: '70%',
			// },
		},
		'& .str-chat__input-emojiselect': {
			right: 24,
		},
		// Emoji picker
		'& .emoji-mart-category .emoji-mart-emoji span, .emoji-mart-anchors, .emoji-mart-bar': {
			color: colors.white,
			opacity: 0.8,
		},
		'& .emoji-mart-category .emoji-mart-emoji:hover:before': {
			backgroundColor: '#999',
		},
		'& .rfu-file-previewer__file--failed': {
			'& > a': {
				display: 'none',
			},
			'& > svg': {
				display: 'none',
			},
			'&:before': {
				content: '"Upload failed. File is too big or unsupported."',
				marginRight: 8,
				width: '100%',
				// ...theme.typography.body60,
				color: colors.red,
			},
		},
		'& .rta__autocomplete': {
			marginBottom: 20,
			padding: 0,
			backgroundColor: colors.base20,
		},
		'& .rta__list': {
			overflowY: 'auto',
			height: 300,
			border: 'none',
			backgroundColor: colors.base20,
			padding: 0,
		},
		'& .dark.str-chat .str-chat__emojisearch .rta__list-header': {
			backgroundColor: colors.base10,
		},
		'& .rta__item:not(:last-child)': {
			borderBottom: 'none',
		},
		'& .rta__entity': {
			padding: 0,
			backgroundColor: colors.base20,
			'&:hover': {
				backgroundColor: colors.base40,
			},
		},
		'& .str-chat__emoji-item': {
			margin: 0,
			padding: 8,
		},
	},
	chatWindowDrawerOpen: {
		transform: `translateX(${-(360 + 12)}px)`,
		label: 'chatWindowDrawerOpen',
		// [theme.breakpoints.only('sm')]: {
		// 	transform: `translateX(${-(300 + 8)}px)`,
		// },
	},
	// playerOpen: {
	// 	bottom: globalPlayerHeight,
	// 	[theme.breakpoints.only('sm')]: {
	// 		bottom: smallGlobalPlayerHeight,
	// 	},
	// 	[theme.breakpoints.only('xs')]: {
	// 		bottom: smallGlobalPlayerHeight + smallScreenHeaderHeight,
	// 	},
	// },
	// playerClosed: {
	// 	bottom: 0,
	// 	[theme.breakpoints.only('xs')]: {
	// 		bottom: smallScreenHeaderHeight,
	// 	},
	// },
	emojiOverride: {
		position: 'absolute',
		top: 'calc(100% - 52px)',
		right: 23,
		pointerEvents: 'none',
		color: 'white',
		opacity: 0.5,
	},
	iconWidth: {
		width: 24,
	},
})

const windowStyles = css`
	height: 10px;
    width: 420px;
    position: fixed;
    bottom: 400px;
    right: 400px;
`

export const ChatWindow = () => {
	const {
		openChannel, streamClient, chatDrawerOpen, handleOpenChannel,
		blocks,
	} = useChatContext()
	const theme = useTheme()
	const classes = styles(theme)
	const chatCss = {
		...classes.chatWindowWrapper,
		...classes.chatWindowDrawerOpen,
	}

	if (openChannel) {
		return (
			<Portal container={window.body}>
				<div
					css={windowStyles}
				>
					<Chat client={streamClient} theme="messaging dark">
						<Channel
							channel={openChannel}
							Message={Message}
						>
							<Window>
								{/* <MessageHeader
									client={streamClient}
									channel={openChannel}
									handleOpenChannel={handleOpenChannel}
									blocks={blocks}
								/> */}
								<MessageList />
								<MessageInput focus />
								<div css={classes.emojiOverride}>
									{/* <AttachFile className={classes.iconWidth} />
									<Emoji className={classes.iconWidth} /> */}
								</div>
							</Window>
							<Thread />
						</Channel>
					</Chat>
				</div>
			</Portal>
		)
	}
	return null
}

export default ChatWindow
