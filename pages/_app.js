import { useEffect } from 'react'
import Layout from 'components/Layout'
import { createContext, useState } from 'react'
import { getCurrentJwtToken } from 'auth/awsAmplify'
import { ThemeProvider } from 'emotion-theming'
import theme from 'styles/theme'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

const emptyObj = {}
export const AuthContext = createContext(emptyObj)

dayjs.extend(relativeTime)

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
		<AuthContext.Provider value={context}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</AuthContext.Provider>
	)
}

export default App