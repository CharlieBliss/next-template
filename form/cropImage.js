import { imageFromDataUrl } from 'form/validateImage'


const getRadianAngle = degreeValue => (
	(degreeValue * Math.PI) / 180
)

export default async (imgSrc, crop, name, rotation) => {
	// https://github.com/ricardo-ch/react-easy-crop/issues/91#issuecomment-575786538
	console.log(imgSrc, crop, name, rotation)
	const image = await imageFromDataUrl(imgSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	image.width /= 2
	image.height /= 2

	const safeArea = Math.max(image.width, image.height) * 2

	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = safeArea
	canvas.height = safeArea

	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(safeArea / 2, safeArea / 2)
	ctx.rotate(getRadianAngle(rotation))
	ctx.translate(-safeArea / 2, -safeArea / 2)

	// draw rotated image and store data.
	ctx.drawImage(
		image,
		safeArea / 2 - image.width,
		safeArea / 2 - image.height,
	)
	const data = ctx.getImageData(0, 0, safeArea, safeArea)

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = crop.width
	canvas.height = crop.height

	// paste generated rotate image with correct offsets for x,y crop values.
	ctx.putImageData(
		data,
		0 - safeArea / 2 + image.width - crop.x,
		0 - safeArea / 2 + image.height - crop.y,
	)

	// As a blob
	return new Promise((resolve) => {
		canvas.toBlob((file) => {
			// eslint-disable-next-line no-param-reassign
			file.name = name
			resolve(file)
		}, 'image/jpeg')
	})
}
