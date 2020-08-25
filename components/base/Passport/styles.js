import { css } from '@emotion/core'
import { truncateStyles, flexContainerStyles } from 'styles/common'

export const wrapper = flexContainerStyles

export const imageStyle = css`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`

export const avatar = css`
	height: 36;
	width: 36;
	margin-right: 8;
`

export const reverseAvatar = css`
	margin-right: 0;
	margin-left: 8;
`
export const link = ({ opacity }) => css`
	&:hover: {
		opacity: ${opacity.primaryHover};
		text-decoration: 'underline';
	}
`
export const text = truncateStyles

export const subtitle = ({ opacity, colors }) => css`
	color: ${colors.text};
	opacity: ${opacity.tertiaryDefault};
`
export const blackText = ({ colors }) => css`
	color: ${colors.black};
`
export const overflowHidden = css`
	overflow: 'hidden';
	width: '85%';
`
export const textArea = [
	flexContainerStyles,
	css`
		overflow: 'hidden';
		flexWrap: 'nowrap';
		flexDirection: 'column';
	`,
]

export const reverseTextArea = css`
	align-items: 'flex-end';
`
export const titleWrapper = css`
	max-width: 'fit-content';
	width: '100%';
`
export const titleClickable = css`
	width: '100%';
`
export const endAlign = css`
	overflow: 'hidden';
	text-align: 'end';
`
export const passport = [
	flexContainerStyles,
	css`
		flexWrap: 'nowrap';
		alignItems: 'center';
	`,
]

export const passportReverse = css`
	flex-direction: 'row-reverse';
`
