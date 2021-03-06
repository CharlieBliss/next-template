import { useEffect, useContext } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Link from 'next/Link'
import { AuthContext } from 'pages/_app'
import { useChatContext } from 'components/chat/ChatContext'
import SearchBar from 'components/search/SearchBar/SearchBar'

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

export const Navigation = () => {
	// const { data } = useFetchList('account/profiles')
	const { setActiveProfileId } = useContext(AuthContext)
	const { setChatDrawerOpen } = useChatContext()
	useEffect(
		() => {
			setActiveProfileId(112)
		}, []
	)
	return (
		<div css={navBarStyles}>
			<div>
				<Link href="/home">
					<a href="/home" css={navItemStyles}>
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
				<SearchBar />
			</div>
			<div>
				<Link href="/following">
					<a css={navItemStyles}>
						Following
					</a>
				</Link>
			</div>
			<div>
				<Link href="/profiles">
					<a href="/profiles" css={navItemStyles}>
						Community
					</a>
				</Link>
			</div>
			<div>
				<Link href="/create">
					<a href="/create" css={navItemStyles}>
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
						if (drawer === 'notifications') {
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
	)
}

export default Navigation
