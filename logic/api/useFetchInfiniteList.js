import { useInfiniteQuery, queryCache } from 'react-query'
import { useState } from 'react'
import apiRequest from 'logic/api/apiRequest'
import flatten from 'ramda/src/flatten'

export default ({
	recordType,
	path,
	queryParams = {},
	dnsOverride,
	settings,
}) => {
	const [total, setTotal] = useState(0)
	const apiFetchMore = async (key, qp, nextId = 1) => {
		const params = {
			...queryParams,
			page: nextId,
		}
		const data = await apiRequest({
			path,
			queryParams: params,
			dnsOverride,
		})
		setTotal(data.total)
		return data.results
	}
	const {
		status,
		data = [],
		error,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		query,
	} = useInfiniteQuery(
		[recordType, {
			path,
			...queryParams,
		}],
		apiFetchMore,
		{
			getFetchMore: (lastResults, allResults) => allResults.length + 1,
			...settings,
		},
	)
	console.log(data)

	return {
		data: flatten(data),
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
		status,
		error,
		total,
		infinite: true,
		queryKey: query.queryKey,
	}
}
