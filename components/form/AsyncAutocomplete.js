import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import debounce from 'lodash/debounce'
import omit from 'ramda/src/omit'
import apiRequest from 'api/apiRequest'
import TextField from '@material-ui/core/TextField'

const getOptions = async (setGenres, setLoading, path) => {
	setLoading(true)
	const res = await apiRequest({
		path,
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


export const AsyncAutoComplete = ({ setTempFilters, path, filterKey, value='', label }) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if(loading) {
			return
		}
		if(open && !options.length) {
			getOptions(setOptions, setLoading, path)
		}
	}, [open]
	)
	return (
		<Autocomplete
			options={options}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			getOptionLabel={(option) => option.name || ''}
			getOptionSelected={(option, value) => {
				if(!value) {
					return null
				}
				return option.id === value.id
			}}
			value={options.find(option => option.id === value)}
			onChange={(event, newValue) => {
				if(newValue) {
					setTempFilters(options => ({ ...options, [filterKey]: newValue.id }))
				} else {
					setTempFilters(options => omit([filterKey], options))
				}
			}}
			style={{ width: 300 }}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					onChange={e => debouncedSearch(setOptions, setLoading, path, e.target.value)}
				/>
			)}
		/>
	)
}

export default AsyncAutoComplete