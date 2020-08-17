/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import Link from 'components/base/Link'


import Carousel, { emblaSlide } from 'components/base/Carousel'
import LinkedPageSection from 'components/base/LinkedPageSection'
import useFetchList from 'api/useFetchList'

const spotlightStyles = ({ breakpoints }) => ({
	width: 540,
	height: 288,
	// [breakpoints.down('md')]: {
	// 	width: 420,
	// 	height: 237,
	// },
	// [breakpoints.only('sm')]: {
	// 	width: 460,
	// 	height: 262,
	// },
	// [breakpoints.only('xs')]: {
	// 	width: 280,
	// 	height: 159,
	// },
})



let mediaQueryString = ''
export const QuadioSpotlight = ({ section }) => {
	// const small = useMediaQuery(theme => theme.breakpoints.only('xs'))
	// const medium = useMediaQuery(theme => theme.breakpoints.down('md'))
	// const large = useMediaQuery(theme => theme.breakpoints.down('xl'))

	// if (small) {
	// 	mediaQueryString = 'small'
	// } else if (medium) {
	// 	mediaQueryString = 'medium'
	// } else if (large) {
	// 	mediaQueryString = 'large'
	// }

	// Selectors
	const queryParams = { section }

	// Effects
	const dnsOverride = process.env.NEXT_PUBLIC_BANNER_DOMAIN
	const { data, isLoading } = useFetchList('carousels', queryParams, dnsOverride)

	if (!data?.[0]) {
		return null
	}

	const carouselAssets = map(
		(asset) => {
			const { position, link_to: linkTo } = asset
			return (
				// <Link
				// 	key={`${linkTo}-${position}`}
				// 	href={linkTo}
				// >
				<div
					css={emblaSlide}
				>
					<img
						alt={linkTo}
						css={spotlightStyles}
						className="embla__slide__img"
						src={`https://${prop('large', asset)}`}
					/>
				</div>
				// </Link>

			)
		},
		data[0].assets,
	)

	return (
		<Carousel
			slidesPerPage={2}
			slidesPerScroll={2}
			// smSlidesPerPage={1}
			// smSlidesPerScroll={1}
			// xsSlidesPerPage={1}
			// xsSlidesPerScroll={1}
			// xsItemWidth={320}
			// processing={isLoading}
		>
			{carouselAssets}
		</Carousel>
	)
}

export default QuadioSpotlight
