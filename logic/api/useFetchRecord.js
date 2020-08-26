import { useQuery, queryCache } from 'react-query'
import apiRequest from 'logic/api/apiRequest'

export default ({
	queryKey,
	id,
	queryParams = {},
	settings,
}) => {
	return useQuery(
		[queryKey, id],
		() => apiRequest({ path: `${queryKey}/${id}` }),
		{
			initialData: () => queryCache.getQueryData(
				[queryKey, queryParams],
			)?.results?.find(data => String(data.id) === id),
			refetchOnWindowFocus: false,
			...settings,
		},
	)
}
