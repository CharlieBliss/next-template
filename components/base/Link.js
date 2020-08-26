import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { css } from '@emotion/core'


const linkStyles = css`
	text-decoration: none;
	cursor: pointer;
`

export const Link = ({ children, href, onClick = () => {} }) => {
	// const router = useRouter()

	const handleClick = (e) => {
		e.preventDefault()
		if (onClick) {
			onClick()
		}
	}

	return (
		<NextLink href={href}>
			<a onClick={handleClick} css={linkStyles}>
				{children}
			</a>
		</NextLink>
	)
}

export default Link
