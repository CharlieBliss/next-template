/** @jsx jsx */
import { useTheme } from '@material-ui/core/styles'
import { css, jsx } from '@emotion/core'
const fontStyles = ({ palette }) => css`
	color: ${palette.text.primary}
	font-size: 16px;
	font-weight: normal;
	label: H4;
`

export const H4 = ({ children }) => {
	const theme = useTheme()
	return (
		<div css={fontStyles(theme)}>
			{children}
		</div>
	)
}

export default H4