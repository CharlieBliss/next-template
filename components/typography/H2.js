/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ colors }) => css`
	color: ${colors.text};
	font-size: 24px;
	font-weight: normal;
	label: H2;
`

export const H2 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default H2