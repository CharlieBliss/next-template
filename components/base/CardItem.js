import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import clsx from 'clsx'

import { orNull } from 'util/ramdaPlus'

import Link from 'components/base/Link'
import Passport from 'components/base/Passport'
import { useTheme } from 'emotion-theming'

// import { smImageSize } from '@/client/constants/imageSizes'
// import { primaryHover } from '@/client/web/styles/opacity'
// import TrackMoreButtonMenu from '@/client/web/menu/TrackMoreButtonMenu'
// import { flexContainerStyles } from '@/client/web/styles/commonStyles'
import RemoteImage from 'components/base/RemoteImage'
import { flexContainerStyles } from 'styles/common'
// import ProfileMoreMenuButton from '@/client/web/profiles/ProfileMoreMenuButton'

const styles = ({
	typography, opacity, colors, spacing,
}) => ({
	cardWrapper: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: colors.base20,
		label: 'card-wrapper',
		width: 282,
		'&:hover $moreButtonOnHover': {
			display: 'block',
		},
	},
	searchCardWrapper: {
		width: 282,
	},
	cardDisplay: {
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		height: 120,
		padding: [0, 16],
		pwidth: '100%',
		label: 'card-display',
		// [breakpoints.only('xs')]: {
		// 	height: 256,
		// 	width: '100%',
		// 	backgroundColor: palette.background.base20,
		// 	borderRadius: 4,
		// 	alignItems: 'flex-start',
		// },
	},
	cardDisplayBody: {
		display: 'flex',
		alignItems: 'center',
		padding: [[0, 16]],
		overflow: 'hidden',
		width: '100%',
		label: 'card-display-body',
		// [breakpoints.only('xs')]: {
		// 	flexDirection: 'column',
		// 	alignItems: 'flex-start',
		// 	padding: 14,
		// 	height: '100%',
		// 	display: 'flex',
		// 	boxSizing: 'border-box',
		// },
	},
	albumArt: {
		display: 'flex',
		flex: [[1, 0, 'auto']],
		height: 84,
		width: 84,
		marginRight: 16,
		label: 'album-art',
		// [breakpoints.only('xs')]: {
		// 	width: 132,
		// 	height: 132,
		// 	marginRight: 0,
		// 	marginBottom: 18,
		// 	flex: 'none',
		// 	display: 'block',
		// },
	},
	trackMeta: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
		width: '100%',
	},
	titleClickable: {
		color: colors.text,
		display: '-webkit-box',
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': 2,
		overflow: 'hidden',
		width: 'auto',
		maxWidth: '95%',
	},
	titleLink: {
		display: 'inline-flex',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		color: colors.text,
		wordBreak: 'break-word',
		'&:hover': {
			// opacity: opacity.primaryHover,
			textDecoration: 'underline',
		},
	},
	collaborators: {
		fontSize: 12,
		maxWidth: 130,
	},
	passportArea: {
		height: 82,
		display: 'flex',
		alignItems: 'center',
		padding: [[0, 24]],
		backgroundColor: colors.base40,
		borderRadius: [[0, 0, 4, 4]],
		'&:hover': {
			// opacity: opacity.primaryHover,
		},
	},
	emptyCardWrapper: {
		borderRadius: 4,
		// background: `linear-gradient(to right, ${palette.primary.blue0}, ${palette.pink.pink0}, ${palette.beige.beige0}, ${palette.yellow.yellow0})`,
		padding: 1,
	},
	emptyCardDisplay: {
		backgroundColor: colors.base10,
		borderRadius: 4,
	},
	emptyCardBody: {
		justifyContent: 'center',
	},
	moreButton: {
		...flexContainerStyles,
		justifyContent: 'flex-end',
		maxWidth: 32,
		paddingRight: 8,
		paddingTop: 4,
	},
	fullWidth: {
		width: '100%',
	},
	moreButtonOnHover: {
		display: 'none',
	},
	remoteImage: {
		height: 84,
		width: 84,
		borderRadius: '4px',
	},
	subtitle: {
		// opacity: opacity.tertiaryDefault,
	},
})


// export const MoreButton = ({
// 	recordType, recordId, filterStoreKey, liked,
// 	classes,
// }) => {
// 	if (recordType === trackRecordType || recordType === followingPlayedTrackRecordType) {
// 		return (
// 			<TrackMoreButtonMenu
// 				css={classes.moreButtonOnHover}
// 				recordId={recordId}
// 				filterStoreKey={filterStoreKey}
// 				liked={liked}
// 			/>
// 		)
// 	}
// 	if (recordType === profileRecordType) {
// 		return (
// 			<ProfileMoreMenuButton
// 				css={classes.moreButtonOnHover}
// 				recordId={recordId}
// 				filterStoreKey={filterStoreKey}
// 			/>
// 		)
// 	}
// 	return null
// }

export const CardItem = ({
	title, recordId, subtitle,
	to, css, imageUuid,
	recordType, collaborators,
	filterStoreKey, index,
	passportSrc, passportTitle, loading, showPassport,
	passportRecordId, passportSubtitle,
	emptyListCardText, wip, campaigns,
	liked, passportTo, titleTo,
	search, onClick, annotated,
}) => {
	const theme = useTheme()
	const classes = styles(theme)
	if (!recordId) {
		return (
			<div css={[ classes.cardWrapper, classes.emptyCardWrapper, css ]}>
				<div css={{ ...classes.cardDisplay, ...classes.emptyCardDisplay }}>
					<div css={{ ...classes.cardDisplayBody, ...classes.emptyCardBody }}>
						{emptyListCardText}
					</div>
				</div>
			</div>
		)
	}
	return (
		<div
			css={[
				classes.cardWrapper,
				search ? classes.searchCardWrapper : {},
			]}
		>
			<div css={classes.cardDisplay}>
				{/* <Link
					noHover
					href={to}
					css={classes.cardDisplayBody}
					linkcss={classes.fullWidth}
				> */}
					<div css={[classes.cardDisplayBody, classes.albumArt]}>
						<RemoteImage
							uuid={imageUuid}
							imageSize={150}
							imageCss={classes.remoteImage}
						>
							<div></div>
						</RemoteImage>
					</div>
					<div css={classes.trackMeta}>
						<Link
							// onClick={onClick}
							href={titleTo}
							// css={classes.titleClickable}
						>
							{title}
						</Link>
						{subtitle}
						{/* <CommunityChips
							useDisplayNames
							recordId={recordId}
							recordType={recordType}
							justify="start"
							disabled
						/> */}
					</div>
				{/* </Link> */}
				{/* {orNull(
					!loading,
					<div css={classes.moreButton}>
						<MoreButton
							css={classes.moreButtonOnHover}
							classes={classes}
							recordId={recordId}
							filterStoreKey={filterStoreKey}
							liked={liked}
							recordType={recordType}
						/>
					</div>,
				)} */}
			</div>
			{orNull(
				showPassport,
				<div
					css={classes.passportArea}
				>
					<Passport
						recordId={passportRecordId}
						title={passportTitle}
						subtitle={passportSubtitle}
						src={passportSrc}
						reverse
					/>
					</div>
			)}
		</div>
	)
}

export default CardItem