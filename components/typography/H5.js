/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ palette }) => css`
	color: ${palette.text.primary}
	font-size: 14px;
	font-weight: normal;
	label: H5;
`

export const H5 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default H5