import { useEffect, useContext } from 'react'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import Head from 'next/head'
import Link from 'next/Link'
import useFetchList from 'api/useFetchList'
import { AuthContext } from 'pages/_app'
import { useTheme } from 'emotion-theming'


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
	const { data } = useFetchList('account/profiles')
	const theme = useTheme()
	const { setActiveProfileId } = useContext(AuthContext)
	useEffect(
		() => {
			if (data) {
				setActiveProfileId(data[0].id)
			}
		}, [data]
	)
  return (
	<div css={baseStyles(theme)} >
		<div css={navBarStyles(theme)}>
			<div>
				<Link href="/home">
					<a css={navItemStyles(theme)}>
						Home
					</a>
				</Link>
			</div>
			<div >
				<Link href="/login">
					<a css={navItemStyles(theme)}>
						Login
					</a>
				</Link>
			</div>
			<div>
				<Link href="/discover">
					<a css={navItemStyles(theme)}>
						Discover
					</a>
				</Link>
			</div>
			<div>
				<Link href="/communities">
					<a css={navItemStyles(theme)}>
						Communities
					</a>
				</Link>
			</div>
			<div>
				<Link href="/charts">
					<a css={navItemStyles(theme)}>
						Charts
					</a>
				</Link>
			</div>
			<div>
				<Link href="/profiles">
					<a css={navItemStyles(theme)}>
						Profiles
					</a>
				</Link>
			</div>
			<div>
				<Link href="/create">
					<a css={navItemStyles(theme)}>
						Create Track
					</a>
				</Link>
			</div>
		</div>
		<div css={contentStyles}>
			{children}
		</div>
		<Global styles={globalStyles(theme)} />
	</div>
  )
}
