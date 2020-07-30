import { useInfiniteQuery, queryCache } from 'react-query'
import { useState } from 'react'
import apiRequest from 'api/apiRequest'
import flatten from 'ramda/src/flatten'

export default (queryKey, queryParams = {}, dnsOverride, shouldFetch = true) => {
	const [total, setTotal] = useState(0)
	const apiFetchMore = async (key, nextId = 1) => {
		console.log(nextId)
		const params = {
			...queryParams,
			page: nextId,
		}
		if (!shouldFetch) {
			return []
		}
		const data = await apiRequest({path: queryKey, queryParams: params, dnsOverride })()
		setTotal(data.total)
		return data.results
	}
	const {
		status,
		data,
		error,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		} = useInfiniteQuery(
			queryKey,
			apiFetchMore,
			{
				getFetchMore: (lastResults, allResults) => {
					console.log(allResults, allResults.length + 1)
					return allResults.length + 1
				}
			}
		)
	return {
		data: flatten(data),
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		status,
		error,
		total,
	}
}