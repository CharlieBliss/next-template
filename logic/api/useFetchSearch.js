import { useQuery, queryCache } from 'react-query'
import reduce from 'ramda/src/reduce'
import head from 'ramda/src/head'
import keys from 'ramda/src/keys'

import apiRequest from 'logic/api/apiRequest'
import { searchDomain } from 'envDefaults'

const normalizeSearchResults = (res) => {
	if (res) {
		return reduce(
			(acc, value) => {
				const recordType = head(keys(value))
				const { results } = value[recordType]
				const records = reduce(
					(accum, searchRecords) => ({ ...accum, [searchRecords.record.id]: searchRecords.record }),
					{},
					results,
				)
				return [
					...acc,
					{
						recordType,
						...value[recordType],
					},
				]
			},
			[],
			res,
		)
	}
	return []
}

export default ({
	path,
	queryParams,
	config,
	enabled,
}) => {
	const queryKey = `v2/search/${path}`
	const query = useQuery(
		[queryKey, queryParams],
		() => apiRequest({
			path: queryKey,
			queryParams,
			dnsOverride: searchDomain,
		}),
		{
			enabled,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...config,
		},
	)

	let formattedData = []
	if (query.data && path === 'all') {
		formattedData = normalizeSearchResults(query.data.results)
	} else if (query.data) {
		formattedData = query.data.results
	}

	// queryCache.setQueryData(
	// 	[queryKey, queryParams],
	// 	formattedData,
	// 	{
	// 		enabled,
	// 		refetchOnWindowFocus: false,
	// 		refetchOnMount: false,
	// 		...config,
	// 	},
	// )

	return {
		data: formattedData,
		error: query.error,
		refetch: query.refetch,
		loading: query.isLoading,
	}
}
