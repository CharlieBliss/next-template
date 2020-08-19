/** @jsx jsx */
import { css, jsx } from '@emotion/core'
const fontStyles = ({ palette }) => css`
	color: ${palette.text.primary}
	font-size: 14px;
	font-weight: normal;
`

export const Body30 = ({ children, }) => {
	return (
		<div css={(theme) => fontStyles(theme)}>
			{children}
		</div>
	)
}

export default Body30