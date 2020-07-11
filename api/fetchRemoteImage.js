import getSignedUrl from 'auth/awsAmplify'
// import bucketAndKeyFromUrl from '@/client/util/bucketAndKeyFromUrl'
// import { getMethodType } from '@/client/descriptions/endpoints/lenses'


const bucketAndKeyFromUrl = (url) => {
	const splitUrl = decodeURIComponent(
		url.replace(/\+/g, '%20'),
	).split('.s3.amazonaws.com/')
	return [
		splitUrl[0].replace(/https?:\/\//, ''),
		splitUrl[1],
	]
}

export const signUrl = async (url) => {
	if (url) {
		let signedUrl = bucketAndKeyFromUrl(url)
		console.log(signedUrl)
		if (signedUrl.indexOf([process.env.NEXT_PUBLIC_AWS_PUBLIC_ASSET]) !== -1) {
			signedUrl = await getSignedUrl(
				...signedUrl,
			)
		}
		return signedUrl
	}
}

export default url => new Promise((resolve, reject) => {
	signUrl(url).then((signedUrl) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', signedUrl)
		xhr.responseType = 'blob'
		xhr.onload = () => {
			if (xhr.status === 200) {
				const urlCreator = window.URL || window.webkitURL
				const imageUrl = urlCreator.createObjectURL(xhr.response)
				resolve(imageUrl)
			} else {
				reject(xhr.status)
			}
		}
		xhr.onerror = reject
		xhr.send()
	})
})
