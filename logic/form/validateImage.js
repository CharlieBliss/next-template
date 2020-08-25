export const imageFromDataUrl = src => new Promise((resolve, reject) => {
	const image = new Image()
	image.addEventListener('load', () => resolve(image))
	image.addEventListener('error', error => reject(error))
	image.setAttribute('crossOrigin', 'anonymous')
	image.src = src
})

export default async (dataUrlImage, minWidth, minHeight) => {
	const img = await imageFromDataUrl(dataUrlImage)
	const { width, height } = img
	const imageDimensionsError = (
		width < minWidth || height < minHeight ? 'dimensions' : null
	)
	if (imageDimensionsError) {
		return `Image file must be at least ${minWidth} x ${minHeight} pixels`
	}
}
