import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import debounce from 'lodash/debounce'
import apiRequest from 'api/apiRequest'
import TextField from '@material-ui/core/TextField'

const getOptions = async (setGenres, setLoading) => {
	setLoading(true)
	const res = await apiRequest({
		path: 'genres',
	})()
	setGenres(res.results)
	setLoading(false)
}

const debouncedSearch = debounce(
	async (setGenres, setLoading, path, query) => {
		setLoading(true)
		const res = await apiRequest({
			path,
			queryParams: {
				q: query,
				sort: 'relevance',
			}
		})()
		console.log(res)
		setGenres(res.results)
		setLoading(false)
	}, 500
)


export const AsyncAutoComplete = ({ setTemporaryOptions, path }) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if(loading) {
			return
		}
		if(open && !options.length) {
			getOptions(setOptions, setLoading)
		}
	}, [open]
	)
	return (
		<Autocomplete
			id="combo-box-demo"
			options={options}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			getOptionLabel={(option) => option.name}
			style={{ width: 300 }}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Genres"
					variant="outlined"
					onChange={e => debouncedSearch(setOptions, setLoading, path, e.target.value)}
				/>
			)}
		/>
	)
}

export default AsyncAutoComplete