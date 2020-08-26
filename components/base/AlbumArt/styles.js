import { css } from '@emotion/core'
import { flexContainerStyles } from 'styles/common'


export const processingText = css`
	padding: 8;
	display: flex;
	text-align: center;
	label: processingText;
`

export const icon = ({ opacity, colors }, iconSize) => css`
	transition: .1s;
	height: 36%;
	width: 36%;
	color: ${colors.white};
	label: icon;
`

export const container = ({ opacity }) => css`
	width: 100%;
	height: 100%;
	position: relative;
	opacity: 1;
	&:hover [data-hidden] {
		opacity: ${opacity.primaryInactive};
	}
	&:focus-within [data-hidden] {
		opacity: ${opacity.primaryInactive};
	}
	label: albumArtContainer;
`
export const clickableContainer = (clickable) => css`
	cursor: ${clickable ? 'pointer' : 'default'};
	label: clickableContainer;
`
export const grid = [
	flexContainerStyles,
	css`
		height: 100%;
		label: grid;
		position: relative;
	`,
]

export const image = css`
	width: 100%;
	height: 100%;
	transition: .5s ease;
	border-radius: 4;
	overflow: hidden;
	label: image;
`
export const mainImage = css`
	position: absolute;
	label: mainImage;
`
export const childContainer = css`
	position: absolute;
	height: 100%;
	width: 100%;
	label: childContainer;
`
export const albumArtSvgContainer = css`
	height: 100%;
	position: absolute;
`
export const chipContainer = css`
	display: flex;
	position: absolute;
	top: 8;
	left: 8;
	label: chipContainer;
`

export const iconOverlay = ({ colors, opacity }) => css`
	position: absolute;
	transition: .1s ease;
	height: 100%;
	width: 100%;
	border-radius: 4px;
	background-color: ${colors.black};
	opacity: 0;
	label: iconOverlay;
`

export const hideIcon = css`
	opacity: 1;
	label: hideIcon;
`

export const forceHover = ({ opacity, colors }) => css`
	opacity: ${opacity.primaryInactive};
	background-color: ${colors.black};
	label: forceHover;
`

export const iconWrapper = css`
	position: absolute;
	width: 100%;
	height: 100%;
	transition: .2s ease;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	label: iconWrapper;
`
