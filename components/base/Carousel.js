import Slider from 'react-slick'

export const Carousel = ({ slidesPerPage, slidesPerScroll, children }) => {
	const settings = {
		// dots: true,
		className: "center",
		infinite: false,
		speed: 500,
		slidesToShow: slidesPerPage,
		slidesToScroll: slidesPerScroll,
	}
	return (
		<Slider
			{...settings}
		>
			{children}
		</Slider>
	)
}

export default Carousel