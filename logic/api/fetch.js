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
	const text = await response.text()
	// Certain api responses (track/{id}/like and profile{id}/follow)
	// respond with no body
	const res = text.length ? JSON.parse(text) : {}
	return res
}
