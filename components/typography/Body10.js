/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ palette }) => css`
	color: ${palette.text.primary}
	font-size: 16px;
	font-weight: normal;
`

export const Body10 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default Body10