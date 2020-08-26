import { css, jsx } from '@emotion/core'

const fontStyles = ({ colors }) => css`
	color: ${colors.text};
	font-size: 12px;
	font-weight: normal;
	label: Body50;
`

export const Body50 = ({ children }) => {
	return (
		<div css={fontStyles}>
			{children}
		</div>
	)
}

export default Body50
