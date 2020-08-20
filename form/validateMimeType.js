import without from 'ramda/src/without'

export default (validFormats, files) => without(
	validFormats,
	files.map(file => file.type),
).length !== 0
