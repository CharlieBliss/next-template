/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ colors }) => css`
	color: ${colors.text};
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