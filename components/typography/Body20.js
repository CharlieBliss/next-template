/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ colors }) => css`
	color: ${colors.text};
	font-size: 16px;
	font-weight: normal;
`

export const Body20 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default Body20