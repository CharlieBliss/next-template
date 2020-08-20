import ajax from 'api/ajax'
import { getCurrentJwtToken } from 'auth/awsAmplify'

export default async ({
	path, payload, method = 'GET', queryParams = {}, activeProfileId, authenticated = true, dnsOverride,
}) => {
	let jwtToken
	if (authenticated) {
		jwtToken = await getCurrentJwtToken()
	}
	const finalParams = {
		...queryParams,
		...(activeProfileId ? { active_profile_id: activeProfileId } : {}),
	}
	const finalPayload = {
		...payload,
		...(activeProfileId ? { active_profile_id: activeProfileId } : {}),
	}
	const req = await ajax({
		url: `https://${dnsOverride || 'staging.api.quadio.com'}/${path}/`,
		method,
		body: finalPayload,
		queryParams: finalParams,
		headers: {
			...jwtToken ? { Authorization: `JWT ${jwtToken}` } : {},
			'Content-Type': 'application/json',
		},
	})
	return req
}
