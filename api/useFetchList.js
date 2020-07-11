import { useQuery, queryCache } from 'react-query'
import apiRequest from 'api/apiRequest'

export default (queryKey, queryParams, dnsOverride) => {

	const { data = {}, status, error, isLoading } = useQuery(
		[queryKey, { queryParams }],
		apiRequest({path: queryKey, queryParams, dnsOverride }),
		{
			initialData: queryCache.getQueryData(queryKey),
			refetchOnWindowFocus: false,
		}
	)
	return {
		data: data.results,
		isLoading,
		status,
		error,
		total: data.total,
	}
}