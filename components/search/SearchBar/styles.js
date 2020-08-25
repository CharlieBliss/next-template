import { css } from '@emotion/core'

export const searchBar = ({ zIndex, breakpoints }, searchBarOpen) => css`
	position: absolute;
	z-index: ${zIndex.appBar};
	width: 560;
	display: flex;
	transform-origin: 100% 50% 0;
	justify-content: flex-end;
	left: 212;
	transition: transform 0.3s ease-out, opacity 0.5s ease-out;
	${'' /* opacity: ${searchBarOpen ? 1 : 0 };
	transform: scaleX(${searchBarOpen ? 1 : 0}); */}
`

export const searchInput = ({ colors }) => css`
	height: 32;
	width: 560;
	borderRadius: 4;
	background-color: ${colors.base10};
	color: white;
`
export const searchIcon = css`
	height: 24;
	width: 24;
`
export const suggestContainer = ({ colors, breakpoints }, searchSuggestOpen) => css`
	position: absolute;
	${'' /* top: 45px;
	left: 30px; */}
	width: 516px;
	border-radius: 4px;
	background-color: ${colors.base40};
	opacity: ${searchSuggestOpen ? 1 : 0};
`
