/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import Link from 'components/base/Link'
import RemoteImage from 'components/base/RemoteImage'
import { truncateStyles, flexContainerStyles } from 'styles/common'

const useStyles = ({ opacity, colors, typography }) => ({
	wrapper: {
		...truncateStyles,
	},
	avatar: {
		height: 36,
		width: 36,
		marginRight: 8,
	},
	reverseAvatar: {
		marginRight: 0,
		marginLeft: 8,
	},
	link: {
		'&:hover': {
			// opacity: opacity.primaryHover,
			textDecoration: 'underline',
		},
	},
	text: {
		...truncateStyles,
	},
	subtitle: {
		color: colors.text,
		// opacity: opacity.tertiaryDefault,
	},
	blackText: {
		color: colors.black,
	},
	overflowHidden: {
		overflow: 'hidden',
		width: '85%',
	},
	textArea: {
		...flexContainerStyles,
		overflow: 'hidden',
		flexWrap: 'nowrap',
		flexDirection: 'column',
	},
	reverseTextArea: {
		alignItems: 'flex-end',
	},
	titleWrapper: {
		maxWidth: 'fit-content',
		width: '100%',
	},
	titleClickable: {
		width: '100%',
	},
	endAlign: {
		overflow: 'hidden',
		textAlign: 'end',
	},
	passport: {
		...flexContainerStyles,
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	passportReverse: {
		flexDirection: 'row-reverse',
	},
})

const imageStyle = css`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`

const Title = ({ title, titleLink, noHover, truncate, blackText }) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	if (titleLink) {
		return (
			// <Link
			// 	href={titleLink}
			// 	className={classes.titleClickable}
			// 	noHover={noHover}
			// >
				<div
					css={[
							truncate && classes.text,
							titleLink && classes.link,
							blackText && classes.blackText,
					]}
				>
					{title}
				</div>
			// {/* </Link> */}
		)
	}
	return (
		<div
			css={[
				truncate && classes.text,
				titleLink && classes.link,
				blackText && classes.blackText,
			]}
		>
			{title}
		</div>
	)
}

export const Passport = ({
	className, avatarLink, titleLink,
	src, title, subtitle, blackText, truncate = true,
	avatarBadge, imageBorder, avatarClassName, recordId,
	noHover, loading, disabled, reverse, subtitleTo,
}) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	return (
		<div
			css={[
				classes.passport,
				reverse && classes.passportReverse,
				truncate && classes.wrapper,
			]}
		>
			<div css={imageStyle}>
				<RemoteImage
					src={src}
					imageSize={'xs'}
					badge={avatarBadge}
					passport
					cover
					href={disabled ? null : avatarLink}
					rounded
					withBorder={imageBorder}
					imageCss={[
						imageStyle,
						reverse ? classes.reverseAvatar : {},
						avatarClassName,
					]}
					loading={loading}
				/>
			</div>
			<div
				css={[
					classes.overflowHidden,
					reverse && classes.endAlign,
				]}
			>
				<div
					css={[
						classes.textArea,
						reverse && classes.reverseTextArea,
					]}
				>
					<div css={classes.titleWrapper}>
						<Title
							title={title}
							titleLink={disabled ? null : titleLink}
							noHover={noHover}
							blackText={blackText}
							truncate={truncate}
							classes={classes}
						/>
					</div>
				</div>
				{/* <Link
					href={subtitleTo}
					className={clsx(classes.text, classes.subtitle)}
				> */}
					<div css={blackText}>
						{subtitle}
					</div>
				{/* </Link> */}
			</div>
		</div>
	)
}

export default Passport
