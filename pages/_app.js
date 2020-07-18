import { useEffect, createContext, useState } from 'react'
import { getCurrentJwtToken } from 'auth/awsAmplify'
import { ThemeProvider } from 'emotion-theming'
import theme from 'styles/theme'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { ChatContextProvider } from 'components/chat/ChatContext'
import { FeedContextProvider } from 'components/activityFeed/FeedContext'
import Layout from 'components/Layout'
import 'stream-chat-react/dist/css/index.css'
import { ReactQueryDevtools } from "react-query-devtools";
import { StylesProvider } from '@material-ui/core/styles';


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
		<StylesProvider injectFirst>
			<AuthContext.Provider value={context}>
				<FeedContextProvider>
					<ChatContextProvider>
						<ThemeProvider theme={theme}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ThemeProvider>
					</ChatContextProvider>
				</FeedContextProvider>
				{/* <ReactQueryDevtools initialIsOpen /> */}
			</AuthContext.Provider>
		</StylesProvider>
	)
}

export default App