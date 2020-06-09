import Amplify, { Auth, Storage } from 'aws-amplify'
import initApp from 'auth/initApp'

const region = 'us-east-1'
const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL
const clientId = process.env.NEXT_PUBLIC_AWS_CLIENT_ID
const identityPoolId = process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL
const publicAssetBucketName = process.env.NEXT_PUBLIC_AWS_PUBLIC_ASSET

Amplify.configure({
	region,
	identityPoolId,
	userPoolId,
	userPoolWebClientId: clientId,
})
// Amplify.register(AmpAuth)

Storage.configure({
	AWSS3: {
		region,
		bucket: publicAssetBucketName,
		customPrefix: {
			private: '',
			public: '',
		},
	},
})


export const getCurrentJwtToken = async () => {
	const session = await Auth.currentSession()
	return session.getIdToken().getJwtToken()
}

export const getIdentityId = async () => new Promise((resolve, reject) => {
	Auth.currentCredentials().then((credentials) => {
		resolve(credentials.identityId)
	})
})



export const login = async (username, password, setAuth) => {
	const request = await Auth.signIn(username, password)
	initApp(setAuth)
}
