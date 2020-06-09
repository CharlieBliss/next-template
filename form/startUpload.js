import head from 'ramda/src/head'
import splitAt from 'ramda/src/splitAt'
import concat from 'ramda/src/concat'
import lastIndexOf from 'ramda/src/lastIndexOf'
import s3Upload from 'form/s3Upload'

// import { UPLOAD_STARTED_NOTIFICATION_ID } from '@/client/descriptions/notifications/notificationIds'

export default (file, bucket) => {
	// dispatch(addNotification(UPLOAD_STARTED_NOTIFICATION_ID))
	const { name } = file
	const [baseName, ext] = splitAt(lastIndexOf('.', name), name)
	const uploadName = concat(
		head(splitAt(296, baseName)), ext,
	).replace(/[+]/g, '_')
	const uploadKey = `${Date.now()}/${uploadName}`
	return s3Upload({
		file,
		bucket,
		key: uploadKey,
		// onProgress: (progress) => {
		// 	dispatch(uploadProgressFn(
		// 		moduleKey, fieldId, uploadId, progress,
		// 	))
		// },
	})
}
