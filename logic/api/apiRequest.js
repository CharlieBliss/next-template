import fetch from 'logic/api/fetch'
import { getCurrentJwtToken } from 'logic/auth/awsAmplify'

export default async ({
	path, payload, method = 'GET', queryParams = {}, authenticated = true, dnsOverride,
}) => {
	if(!path) {
		throw new Error()
	}
	let jwtToken
	if (authenticated) {
		jwtToken = await getCurrentJwtToken()
	}
	const req = await fetch({
		url: `https://${dnsOverride || 'staging.api.quadio.com'}/${path}/`,
		method,
		body: payload,
		queryParams,
		headers: {
			...jwtToken ? { Authorization: `JWT ${jwtToken}` } : {},
			'Content-Type': 'application/json',
		},
	})
	if (req.error) {
		throw new Error(req.error)
	}
	return req
}
