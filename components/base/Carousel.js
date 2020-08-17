import { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
/** @jsx jsx */
import Slider from 'react-slick'
import { useEmblaCarousel } from 'embla-carousel/react'


const emblaCss = css`
	overflow: hidden;
`
const emblaContainer = css`
	display: flex;
`

export const emblaSlide = css`
	position: relative;
`

export const Carousel = ({ slidesPerPage, slidesPerScroll, children }) => {

	const [EmblaCarouselReact, embla] = useEmblaCarousel({
		loop: false,
		slidesToScroll: 1,
		align: 'start',
	})
	useEffect(() => {
		if (embla) {
		  // Embla API is ready
		}
	  }, [embla])

	const settings = {
		// dots: true,
		className: "center",
		infinite: false,
		speed: 500,
		slidesToShow: slidesPerPage,
		slidesToScroll: slidesPerScroll,
	}
	return (
		<div css={emblaCss}>
			<EmblaCarouselReact>
				<div css={emblaContainer}>
					{children}
				</div>
			</EmblaCarouselReact>
		</div>
	)
}

export default Carousel