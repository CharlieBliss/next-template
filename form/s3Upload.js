import { v4 as uuidv4 } from 'uuid'
import { Storage } from 'aws-amplify'
import { getIdentityId } from 'auth/awsAmplify'

const publicAssetBucketName = process.env.NEXT_PUBLIC_AWS_PUBLIC_ASSET
const rawAudioBucketName = process.env.NEXT_PUBLIC_AWS_RAW_AUDIO

const bucketLevelMap = {
	[rawAudioBucketName]: 'private',
	[publicAssetBucketName]: 'private',
}

// If level is set to private Storage.put prepends the users identityId to the
// key and doesn't return it.
const getUrlFromStoragePut = async (level, bucket, key) => {
	if (level === 'private') {
		const identityId = await getIdentityId()
		return `https://${bucket}.s3.amazonaws.com/${`${identityId}/${key}`}`
	}
	return `https://${bucket}.s3.amazonaws.com/${key}`
}

export default async ({
	file, bucket, key, type, onProgress,
}) => {
	const uuid = uuidv4()
	const level = bucketLevelMap[bucket]
	const { key: uploadedKey } = await Storage.put(
		key,
		file,
		{
			bucket,
			ContentType: type,
			level,
			metadata: {
				uuid,
			},
			progressCallback(evt) {
				const { loaded, total } = evt
				const progress = parseInt((loaded * 100) / total, 10)
				if (onProgress) {
					onProgress(progress, evt)
				}
			},
		},
	)
	const url = await getUrlFromStoragePut(level, bucket, uploadedKey)
	return { url: encodeURI(url), uuid }
}
