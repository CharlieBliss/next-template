import { Storage } from 'aws-amplify'

export default (bucket, key, expiresSeconds = 1200) => (
	Storage.get(key, { bucket, expires: expiresSeconds })
)
