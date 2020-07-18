import React, { useEffect, useState, useCallback, useContext } from 'react'
import { AuthContext } from 'pages/_app'
import stream from 'getstream'
import { streamKey, streamFeedId } from 'envDefaults'

import forEach from 'ramda/src/forEach'
import reduce from 'ramda/src/reduce'
import move from 'ramda/src/move'
import findIndex from 'ramda/src/findIndex'
import propEq from 'ramda/src/propEq'
import reject from 'ramda/src/reject'
import isEmpty from 'ramda/src/isEmpty'
import filter from 'ramda/src/filter'
import path from 'ramda/src/path'
import pick from 'ramda/src/pick'
import omit from 'ramda/src/omit'
import values from 'ramda/src/values'
import find from 'ramda/src/find'
import keys from 'ramda/src/keys'
import any from 'ramda/src/any'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import assocPath from 'ramda/src/assocPath'

// import { profileRecordType } from '@/client/logic/api2/recordTypes'

// import bulkAddRecords from '@/client/logic/api/thunks/bulkAddRecords'
import useFetchRecord from 'api/useFetchRecord'
import apiRequest from 'api/apiRequest'

// START - CHAT CONTEXT - START
const undefinedFeedContext = {}
const FeedContext = React.createContext(undefinedFeedContext)

const initFeed = async (authenticated, setActivityFeed, setFollowingFeed, setInit) => {
	const res = await apiRequest({
		path: 'feeds/auth',
		activeProfileId: 112,
		method: 'POST',
		authenticated,
	})()
	const followToken = res.follow_notification_tokens.find(item => item.profile_id === 112).token
	const token = res.notification_tokens.find(item => item.profile_id === 112).token
	const client = stream.connect(streamKey, token, streamFeedId)
	const followClient = stream.connect(streamKey, followToken, streamFeedId)
	setActivityFeed(client.feed('notification', '506_112'))
	setFollowingFeed(followClient.feed('follow_notification', 112))
	setInit(true)
}

export const FeedContextProvider = ({ children }) => {
	// START - CONTEXT STATE - START
	const [init, setInit] = useState(false)
	const [activityFeed, setActivityFeed] = useState({})
	const [followingFeed, setFollowingFeed] = useState({})

	const { authenticated } = useContext(AuthContext)


	useEffect(() => {
		if(stream) {
			initFeed(authenticated, setActivityFeed, setFollowingFeed, setInit)
		}
	}, [stream])


	// START - CONTEXT OBJ - START
	const context = {
		init,
		activityFeed,
		followingFeed,
	}
	// END - CONTEXT OBJ - END

	return (
		<FeedContext.Provider value={context}>
			{children}
		</FeedContext.Provider>
	)
}
// END - CHAT CONTEXT - END

export const useFeedContext = () => useContext(FeedContext)

export default FeedContext
