import { useMutation, queryCache } from 'react-query'
import apiRequest from 'logic/api/apiRequest'

export default (onSuccess) => useMutation(
	({ queryKey, payload, method = "POST", queryParams, activeProfileId }) => {
		apiRequest({path: queryKey, method, queryParams, payload, activeProfileId })()
	},
	{
		onSuccess: (data) => {
			if (onSuccess && data) {
				onSuccess(data)
			}
		}
	}
)