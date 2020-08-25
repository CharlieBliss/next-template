import forEach from 'ramda/src/forEach'
import toPairs from 'ramda/src/toPairs'
import { stringify } from 'qs'

export default ({
	url, method, body, queryParams, headers,
}) => new Promise((resolve, reject) => {
	const queryString = queryParams
		? `?${stringify(queryParams, { arrayFormat: 'comma', encode: false })}` : ''
	const xhr = new XMLHttpRequest()
	const jsonBody = body ? JSON.stringify(body) : undefined
	const defaultMethod = method || getMethodType
	const defaultHeaders = {
		...headers,
		// 'Content-Type': headers['Content-Type'] || 'application/json',
	}
	xhr.open(defaultMethod, `${url}${queryString}`)
	forEach(
		([key, value]) => {
			xhr.setRequestHeader(key, value)
		},
		toPairs(defaultHeaders),
	)
	xhr.onload = () => {
		let parsed = xhr.response
		try {
			parsed = JSON.parse(parsed)
		} catch (e) {
			// response not json, leave parsed as text and continue
		}
		const { status } = xhr
		if (status >= 200 && status < 300) {
			resolve(parsed)
		} else {
			resolve({ statusCode: status, error: parsed })
		}
	}
	xhr.onerror = () => {
		reject(new Error('Network Error'))
	}
	xhr.send(jsonBody)
})
