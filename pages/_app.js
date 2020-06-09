import { useEffect } from 'react'
import Layout from 'components/Layout'
import { createContext, useState } from 'react'
import { getCurrentJwtToken } from 'auth/awsAmplify'

const emptyObj = {}
export const AuthContext = createContext(emptyObj)

const App = ({ Component, pageProps }) => {
	const [authenticated, setAuthenticated] = useState()
	const [activeProfileId, setActiveProfileId] = useState()
	useEffect(
		() => {
			const jwt = getCurrentJwtToken()
			if (jwt) {
				setAuthenticated(true)
			}
		},
		[]
	)
	const context = {
		authenticated, setAuthenticated, activeProfileId, setActiveProfileId,
	}
	return (
		<AuthContext.Provider value={context} >
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContext.Provider>
	)
}

export default App