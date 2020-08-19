/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ palette }) => css`
	color: ${palette.text.primary}
	font-size: 11px;
	font-weight: normal;
	label: Body60;
`

export const Body60 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default Body60