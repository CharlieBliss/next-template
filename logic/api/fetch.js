import { stringify } from 'qs'

export default async ({
	url, method, body, queryParams, headers,
}) => {
	const queryString = stringify(queryParams, { arrayFormat: 'comma', encode: false })
	const response = await fetch(
		`${url}?${queryString}`,
		{
			method,
			body,
			headers,
		},
	)
	return response.json()
}
