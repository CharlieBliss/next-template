import { useMutation, queryCache } from 'react-query'
import apiRequest from 'logic/api/apiRequest'
import { searchHistoryApiPath } from 'logic/api/apiPaths'

const queryParams = {
	limit: 5,
}


export default () => useMutation(
	({ queryKey, payload, method = "POST", queryParams }) => apiRequest(
		{path: queryKey, method, queryParams, payload  }
	),
	{
		onMutate: (data, variables) => {
			queryCache.setQueryData(
				[searchHistoryApiPath, queryParams], filter(data => data.id === variables.id)
			)
		},
		onError: (err, data, rollback) => rollback()
	}
)