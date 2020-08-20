import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import debounce from 'lodash/debounce'
import omit from 'ramda/src/omit'
import apiRequest from 'api/apiRequest'
import TextField from '@material-ui/core/TextField'

const getOptions = async (setOptions, setLoading, path, queryParams = {}) => {
	setLoading(true)
	const res = await apiRequest({
		path,
		queryParams,
	})()
	setOptions(res.results)
	setLoading(false)
}

const debouncedSearch = debounce(
	async (setOptions, setLoading, path, query, queryParams = {}) => {
		setLoading(true)
		const res = await apiRequest({
			path,
			queryParams: {
				q: query,
				sort: 'relevance',
				...queryParams
			}
		})()
		setOptions(res.results)
		setLoading(false)
	}, 500
)


export const AsyncAutoComplete = ({
	setTempFilters,
	path,
	filterKey,
	value = [],
	label,
	clearFilters,
	onChange,
	queryParams,
	multi,
}) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(
		() => {
			if (loading) {
				return
			}
			if (open) {
				getOptions(setOptions, setLoading, path)
			}
		}, [open, filterKey]
	)
	return (
		<Autocomplete
			options={options}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			multiple={multi}
			getOptionLabel={(option) => option.name || ''}
			getOptionSelected={(option, nextValue) => {
				if (!value) {
					return false
				}
				return option.id === nextValue.id
			}}
			value={value}
			onChange={(event, newValue) => onChange(newValue)
				// if (newValue) {
				// 	setTempFilters(options => (omit(clearFilters, { ...options, [filterKey]: newValue.id })))
				// } else {
				// 	setTempFilters(options => omit([filterKey, ...clearFilters], options))
				// }
			}
			style={{ width: 300 }}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					onChange={e => debouncedSearch(setOptions, setLoading, path, e.target.value, queryParams)}
				/>
			)}
		/>
	)
}

export default AsyncAutoComplete
