import { useEffect, useContext } from 'react'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import Link from 'next/Link'
import useFetchList from 'api/useFetchList'
import { AuthContext } from 'pages/_app'
import ChannelDrawer from 'components/chat/ChannelDrawer'
import ChatWindow from 'components/chat/ChatWindow'
import { useChatContext } from 'components/chat/ChatContext'

const navBarStyles = ({ colors }) => css`
	width: 100%;
	height: 56px;
	display: flex;
	justify-content: space-evenly;
    align-items: center;
	background-color: ${colors.base10};
`
const navItemStyles = ({ colors }) => css`
	color: ${colors.text};
	font-size: 16px;
	text-decoration: none;

`

const baseStyles = ({ colors }) => css`
	background-color: ${colors.base30};
`
const contentStyles = css`
	margin: 16px;
`

const globalStyles = ({ colors }) => ({
	body: {
		backgroundColor: colors.base30,
		margin: 0,
	},
})

export default function Navigation({ children }) {
	// const { data } = useFetchList('account/profiles')
	const { setActiveProfileId } = useContext(AuthContext)
	const { setChatDrawerOpen } = useChatContext()
	useEffect(
		() => {
			setActiveProfileId(112)
		}, []
	)
  return (
	<div css={baseStyles} >
		<div css={navBarStyles}>
			<div>
				<Link href="/home">
					<a css={navItemStyles}>
						Home
					</a>
				</Link>
			</div>
			<div >
				<Link href="/login">
					<a css={navItemStyles}>
						Login
					</a>
				</Link>
			</div>
			<div>
				<Link href="/discover">
					<a css={navItemStyles}>
						Discover
					</a>
				</Link>
			</div>
			<div>
				<Link href="/following">
					<a css={navItemStyles}>
						Following
					</a>
				</Link>
			</div>
			<div>
				<Link href="/communities">
					<a css={navItemStyles}>
						Communities
					</a>
				</Link>
			</div>
			<div>
				<Link href="/charts">
					<a css={navItemStyles}>
						Charts
					</a>
				</Link>
			</div>
			<div>
				<Link href="/profiles">
					<a css={navItemStyles}>
						Profiles
					</a>
				</Link>
			</div>
			<div>
				<Link href="/create">
					<a css={navItemStyles}>
						Create Track
					</a>
				</Link>
			</div>
			<div>
				<div
					onClick={() => {
						setChatDrawerOpen(drawer => {
							if(drawer === 'chat') {
								return 'notifications'
							}
							if(drawer === 'notifications') {
								return false
							}
							return 'chat'
						})
					}}
					css={navItemStyles}
				>
					Chat
				</div>
			</div>
		</div>
		<div css={contentStyles}>
			{children}
		</div>
		{/* <ChannelDrawer /> */}
		<Global styles={globalStyles} />
	</div>
  )
}
