import { css } from '@emotion/core'
import { flexContainerStyles } from 'styles/common'

export const albumArtWrapper = css`
	height: 50px;
	width: 50px;
	border-radius: 4px;
	overflow: hidden;
	label: albumArtWrapper;
`

export const listItemWrapper = [
	flexContainerStyles,
	css`
		padding: 10px;
		paddingRight: 0;
		flex-direction: row;
		alignItems: center;
		height: 56;
		&:hover: {
			background-color: rgba(0, 0, 0, 0.2);
		}
		&:focus-within: {
			background-color: rgba(0, 0, 0, 0.4);
			outline: none;
			&:hover: {
				backgroundColor: rgba(0, 0, 0, 0.6);
			}
		}
		zIndex: 2;
		label: listItemWrapper;
	`,
]
