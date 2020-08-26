import { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useMutation, queryCache } from 'react-query'
import { orNull, ternary } from 'util/ramdaPlus'
import suffixedNumberFormatter from 'util/suffixedNumberFormatter'

import IconButton from '@material-ui/core/IconButton'
import Body50 from 'components/typography/Body50'
import Heart from '@material-ui/icons/Favorite'
import HeartOutline from '@material-ui/icons/FavoriteBorder'
import { tracksLikeApiPath, tracksUnlikeApiPath } from 'logic/api/apiPaths'
import apiRequest from 'logic/api/apiRequest'
import { trackRecordType } from 'logic/api/recordTypes'
import forEach from 'ramda/src/forEach'
import map from 'ramda/src/map'
import head from 'ramda/src/head'


// const useStyles = makeStyles(({ opacity, rgba }) => ({
// 	likeWrapper: {
// 		marginRight: 8,
// 		borderRadius: '50%',
// 		maxHeight: 36,
// 		maxWidth: 36,
// 		position: 'relative',
// 		'&:hover $heartIcon': {
// 			opacity: opacity[primaryActive],
// 		},
// 	},
// 	hideLikes: {
// 		marginRight: 0,
// 	},
// 	hasHoverBackground: {
// 		padding: 8,
// 		'&:hover': {
// 			backgroundColor: rgba.whiteAlphaFn(opacity[buttonHover]),
// 		},
// 	},
// 	likes: {
// 		marginLeft: '4px',
// 	},
// 	heartIcon: {
// 		height: 19,
// 		width: 19,
// 		opacity: opacity[iconButtonInactive],
// 	},
// 	heartIconActive: {
// 		opacity: opacity[primaryActive],
// 	},
// }))

const likeWrapper = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

const heartStyles = ({ opacity, colors }, active) => css`
	height: 19px;
	width: 19px;
	opacity: ${active ? opacity.primaryInactive : opacity.iconButtonInactive};
	color: ${colors.white};
`

const HeartToggle = ({ liked, heartIconActive, onClick }) => {
	return ternary(
		liked,
		<Heart onClick={onClick} css={theme => heartStyles(theme, heartIconActive)} />,
		<HeartOutline onClick={onClick} css={theme => heartStyles(theme, heartIconActive)} />,
	)
}

const updateRecord = (record, id, liked) => {
	if (record.id === id) {
		return {
			...record,
			total_likes: liked ? record.total_likes - 1 : record.total_likes + 1,
			liked: !liked,
		}
	}
	return record
}

export default ({
	liked, showLikes, heartIconActive,
	likes, classes, id, queryKey,
}) => {
	const [tempLike, setTempLike] = useState(liked)
	useEffect(() => setTempLike(liked), [liked])

	const [likeOrUnlike] = useMutation(
		(isLiked) => apiRequest({
			path: isLiked ? tracksUnlikeApiPath(id) : tracksLikeApiPath(id),
			method: 'POST',
		}),
		{
			onMutate: () => {
				queryCache.cancelQueries(queryKey)
				const previousData = queryCache.getQueryData(queryKey)
				// setTempLike(!liked)
				queryCache.setQueryData(queryKey, old => {
					// This is a little ugly.
					// Infinite Queries return an array of arrays,
					// list queries return an array
					// record queries return an object
					if (Array.isArray(old)) {
						if (Array.isArray(head(old))) {
							return map(
								map(
									record => updateRecord(record, id, liked),
								),
								old,
							)
						}
						return map(
							record => updateRecord(record, id, liked),
							old,
						)
					}
					return {
						...old,
						liked: !liked,
					}
				})
				return previousData
			},
			onError: (err, newData, rollback) => queryCache.setQueryData(queryKey, rollback),
			onSettled: () => queryCache.invalidateQueries(trackRecordType),
		},
	)
	const handleClick = () => {
		likeOrUnlike(liked)
	}

	const formattedTotalLikes = suffixedNumberFormatter(likes)
	return (
		<div css={[likeWrapper, classes]}>
			<IconButton>
				<HeartToggle
					liked={tempLike}
					heartIconActive={heartIconActive}
					onClick={handleClick}
				/>
			</IconButton>
			{
				orNull(
					showLikes,
					<Body50>
						{formattedTotalLikes}
					</Body50>,
				)
			}
		</div>
	)
}
