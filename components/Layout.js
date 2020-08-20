import { useEffect, useContext } from 'react'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { AuthContext } from 'pages/_app'
import Navigation from 'components/navigation/Navigation'

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

export const Layout = ({ children }) => {
	// const { data } = useFetchList('account/profiles')
	const { setActiveProfileId } = useContext(AuthContext)

	useEffect(
		() => {
			setActiveProfileId(112)
		}, [],
	)
	return (
		<div css={baseStyles}>
			<Navigation />
			<div css={contentStyles}>
				{children}
			</div>
			{/* <ChannelDrawer /> */}
			<Global styles={globalStyles} />
		</div>
	)
}

export default Layout
