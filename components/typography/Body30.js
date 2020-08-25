/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const fontStyles = ({ colors }) => css`
	color: ${colors.text};
	font-size: 14px;
	font-weight: normal;
`

export const Body30 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default Body30
