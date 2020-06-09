import path from 'ramda/src/path'
import map from 'ramda/src/map'

export default (e) => {
	e.preventDefault()
	let files = []
	if (path(['dataTransfer', 'items'], e)) {
		files = map(
			(item) => {
				if (item.kind === 'file') {
					return item.getAsFile()
				}
				return null
			},
			e.dataTransfer.items,
		)
	} else {
		files = [...e.target.files]
	}
	e.target.value = null
	return files
}
