// import LoadingPlaceholder from 'base/LoadingPlaceholder'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useQuery, queryCache } from 'react-query'
import fetchRemoteImage from 'api/fetchRemoteImage'

const styles = css`
	height: 100%;
	width: 100%;
`

const urlFromUuid = (uuid, imageSize = 150, recordId = 100) => {
	const defaultImageId = recordId % 50 || 50
	if (!uuid || uuid === 'None') {
		return `https://${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/defaultProfileImages/${defaultImageId}.png`
	}
	if (imageSize) {
		return `https://${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${uuid}/${imageSize}.jpg`
	}
	return `https://${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${uuid}/${150}.jpg`
}

export const RemoteImage = ({
	uuid, imgSrc, alt, imageTag, imageCss = [],
	rounded, hideLoading, css, imgMissing, recordId,
	imageSize,
}) => {
	const url = urlFromUuid(uuid, imageSize, recordId)
	if (imgMissing) {
		return (
			<div>
				<span>D:</span>
			</div>
		)
	}
	if (url && !imageTag) {
		return (
			<img
				css={[css, ...imageCss]}
				src={url}
				alt={alt}
			/>
		)
	}
	if (imageTag) {
		return (
			<image
				href={url}
				width="100%"
				height="100%"
				css={[css, ...imageCss]}
			/>
		)
	}
	if (hideLoading) {
		return null
	}
	return (
		<div className={styles}>
			{/* <LoadingPlaceholder rounded={rounded} className="layout-fill" /> */}
		</div>
	)
}

export default RemoteImage