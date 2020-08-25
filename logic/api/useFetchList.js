import { useQuery, queryCache } from 'react-query'
import apiRequest from 'logic/api/apiRequest'

export default ({
	queryKey,
	queryParams,
	enabled,
	dnsOverride,
}) => {
	const {
		data = {}, status, error, isLoading
	} = useQuery(
		[queryKey, { queryParams }],
		() => apiRequest({ path: queryKey, queryParams, dnsOverride }),
		{
			initialData: queryCache.getQueryData(queryKey),
			refetchOnWindowFocus: false,
			enabled,
		},
	)
	return {
		data: data.results,
		isLoading,
		status,
		error,
		total: data.total,
	}
}
