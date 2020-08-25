/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import Link from 'components/base/Link'
import RemoteImage from 'components/base/RemoteImage'
import { truncateStyles, flexContainerStyles } from 'styles/common'
import Body30 from 'components/typography/Body30'
import * as classes from './styles'

const Title = ({ title, titleLink, noHover, truncate, blackText }) => {
	if (titleLink) {
		return (
			// <Link
			// 	href={titleLink}
			// 	css={classes.titleClickable}
			// 	noHover={noHover}
			// >
				<Body30
					css={[
						truncate && classes.text,
						titleLink && classes.link,
						blackText && classes.blackText,
					]}
				>
					{title}
				</Body30>
			// </Link>
		)
	}
	return (
		<Body30
			css={[
				truncate && classes.text,
				titleLink && classes.link,
				blackText && classes.blackText,
			]}
		>
			{title}
		</Body30>
	)
}

export const Passport = ({
	className, avatarLink, titleLink,
	src, title, subtitle, blackText, truncate = true,
	avatarBadge, imageBorder, avatarClassName, recordId,
	noHover, loading, disabled, reverse, subtitleTo,
}) => {
	return (
		<div
			css={[
				classes.passport,
				reverse && classes.passportReverse,
				truncate && classes.wrapper,
			]}
		>
			<div css={classes.imageStyle}>
				<RemoteImage
					src={src}
					imageSize={50}
					badge={avatarBadge}
					passport
					cover
					href={disabled ? null : avatarLink}
					rounded
					withBorder={imageBorder}
					imageCss={[
						classes.imageStyle,
						reverse ? classes.reverseAvatar : {},
						// avatarClassName,
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
				<Body30>
					{subtitle}
				</Body30>
				{/* </Link> */}
			</div>
		</div>
	)
}

export default Passport
