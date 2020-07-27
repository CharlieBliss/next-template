import { useQuery, queryCache } from 'react-query'
import apiRequest from 'api/apiRequest'

export default (queryKey, id, queryParams = {}, settings) => useQuery(
	[queryKey, id],
	apiRequest({path: `${queryKey}/${id}`,}),
	{
		initialData: () => {
			return queryCache.getQueryData([queryKey, queryParams])?.results?.find(data => String(data.id) === id)
		},
		refetchOnWindowFocus: false,
		...settings
	}
)