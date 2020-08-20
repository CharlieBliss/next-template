import React, {
	useEffect, useState, useCallback, useContext
} from 'react'
import { StreamChat } from 'stream-chat'

import { streamKey } from 'envDefaults'

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
// import segmentSentMessage from '@/client/logic/segment/events/segmentSentMessage'
// import segmentRecievedMessage from '@/client/logic/segment/events/segmentRecievedMessage'

const client = new StreamChat(streamKey)

// GET FULL CHANNEL
const getFullChannel = async (halfChannel, hidden) => {
	const [fullChannel] = await client.queryChannels({
		cid: { $eq: halfChannel.channel.cid },
		hidden,
	}, {}, { watch: true, state: true })
	return fullChannel
}

// START - CHANNEL LISTENERS - START
const handleMoveChannel = setChannels => async (newChannel) => {
	setChannels((currentChannels) => {
		const { cid } = newChannel
		const channelIndex = findIndex(propEq('cid', cid), currentChannels)
		if (channelIndex === -1) {
			return [newChannel, ...currentChannels]
		}
		const newChannels = move(channelIndex, 0, currentChannels)
		return setChannels(newChannels)
	})
}

const handleUpdateChannels = setChannels => () => {
	setChannels(currentChannels => [...currentChannels])
}

const handleHideChannel = setChannels => (channel) => {
	setChannels((currentChannels) => {
		const notHidden = c => prop('cid', c) !== prop('cid', channel)
		return [...filter(notHidden, currentChannels)]
	})
}

const setListeners = (
	setChannels, activeProfileId, activeUserId,
	target, senders, setUnreadMessages,
) => (channel) => {
	const includesActiveProfile = true
	const meProfile = target || path(['data', 'userProfilesObj', activeUserId], channel)
	// const themProfiles = senders || values(omit([String(activeUserId)], path(['data', 'userProfilesObj'], channel)))
	if (includesActiveProfile) {
		channel.on('message.new', (message) => {
			if (String(activeUserId) === message.user.id) {
				// segmentSentMessage({ activeProfileId, themProfiles })
				return handleMoveChannel(setChannels, activeProfileId, activeUserId)(channel)
			}
			// segmentRecievedMessage({ activeProfileId, themProfiles })
			setUnreadMessages(unreadMessages => unreadMessages + 1)
			// dispatch(notifyChatRecipient(meProfile, themProfiles))
			if (meProfile === String(activeProfileId)) {
				handleMoveChannel(setChannels, activeProfileId, activeUserId)(channel)
			}
		})
		channel.on(
			'notification.mark_read', () => {
				handleMoveChannel(setChannels, activeProfileId, activeUserId)
			},
		)
		channel.on(
			'message.read', () => {
				handleUpdateChannels(setChannels)
				setUnreadMessages(0)
			},
		)
	}
}
// END - CHANNEL LISTENERS - END

// START - CLIENT LISTENERS - START
const setClientListeners = (
	setChannels, activeProfileId, activeUserId,
	setUnreadMessages, setChannelProfiles,
) => (streamClient) => {
	streamClient.on('notification.message_new', async (event) => {
		const channel = await getFullChannel(event)
		const meProfile = path(['data', 'userProfilesObj', activeUserId], channel)
		const themProfiles = values(omit([String(activeUserId)], path(['data', 'userProfilesObj'], channel)))
		if (meProfile) {
			setUnreadMessages(unreadMessages => unreadMessages + 1)
			// dispatch(notifyChatRecipient(meProfile, themProfiles))
			setListeners(
				setChannels, activeProfileId, activeUserId,
				meProfile, themProfiles, setUnreadMessages,
			)(channel)
			if (any(message => message.user.id === String(activeUserId), channel.state.messages)) {
				// segmentRecievedMessage({ activeProfileId, themProfiles, paginated: true })
			} else {
				// segmentRecievedMessage({ activeProfileId, themProfiles, newChat: true })
			}
			if (meProfile === String(activeProfileId)) {
				handleMoveChannel(setChannels, activeProfileId, activeUserId)(channel)
				// const queryParams = {
				// 	profile_ids: channel.data.profiles,
				// 	active_profile_id: 112,
				// }
				// const res = await apiRequest({ path: 'profiles', queryParams })
				// queryCache.setQueryData('profiles', () =>)
				setChannelProfiles(channel.data.profiles)

				// dispatch(
				// 	bulkAddRecords(profileRecordType, 'profiles', channel.data.profiles),
				// )
			}
		}
	})
}
// END - CLIENT LISTENERS - END

// START - CHAT CONTEXT - START
const undefinedChatContext = {}
const ChatContext = React.createContext(undefinedChatContext)
export const ChatContextProvider = ({ children }) => {
	// START - CONTEXT STATE - START
	const { data = {}, isLoading } = useFetchRecord('profiles', 112)

	const [chatDrawerOpen, setChatDrawerOpen] = useState(false)
	const [chatDrawerTab, setChatDrawerTab] = useState('notification')
	const [newChatModalOpen, setNewChatModalOpen] = useState(false)
	const [channelProfiles, setChannelProfiles] = useState([])
	const [streamClient, setStreamClient] = useState()
	const [openChannel, setOpenChannel] = useState()
	const [channels, setChannels] = useState([])
	const [unreadMessages, setUnreadMessages] = useState([])
	const [allChannelsFetched, setAllChannelsFetched] = useState(false)
	const [blocks, setBlocks] = useState([])
	const [feedActions, setFeedActions] = useState({})
	// END - CONTEXT STATE - END

	// START - CONTEXT SELECTORS - START
	const activeProfile = data
	const xsWindowSize = false
	const inactiveProfiles = []
	const userProfiles = [112]
	const activeUserId = 506
	const auth = true
	const { id: activeProfileId } = activeProfile
	// END - CONTEXT SELECTORS - END

	// START - TOGGLING & OPENING CALLBACKS - START
	const toggleDrawer = useCallback((type) => {
		if (xsWindowSize) {
			setOpenChannel(false)
		}
		if (chatDrawerOpen === type) {
			setChatDrawerOpen(false)
		} else {
			setChatDrawerOpen(type)
		}
	}, [chatDrawerOpen, xsWindowSize])

	const handleOpenChannel = useCallback((channel) => {
		if (xsWindowSize) {
			setChatDrawerOpen(false)
		}
		setOpenChannel(channel)
	}, [openChannel, xsWindowSize])
	// END - TOGGLING & OPENING CALLBACKS - END

	// START - CREATING NEW CHANNEL - START
	const createNewChannel = useCallback(async (profile) => {
		const recipientProfileId = profile.id.toString()
		const recipientUserId = profile.user_id.toString()
		const senderProfileId = activeProfile.id.toString()
		const senderUserId = activeProfile.user_id.toString()
		const sortedProfiles = [senderProfileId, recipientProfileId].sort()
		const profilePick = profileData => pick(
			['id', 'name', 'image_url', 'image_uuid', 'user_id'],
			profileData,
		)
		const channelData = {
			profiles: sortedProfiles,
			userProfilesObj: {
				[senderUserId]: senderProfileId,
				[recipientUserId]: recipientProfileId,
			},
			profileData: {
				[senderProfileId]: profilePick(activeProfile),
				[recipientProfileId]: profilePick(profile),
			},
		}
		const conversation = streamClient.channel(
			'messaging',
			sortedProfiles.join('-'),
			{
				members: [senderUserId, recipientUserId],
				...channelData,
			},
		)
		const newChannel = await conversation.create()
		const newChannelCid = newChannel.channel.cid
		let fullChannel = await getFullChannel(newChannel)
		if (!fullChannel) { // If a channel was previously hidden, getFullChannel returns undefined
			fullChannel = await getFullChannel(newChannel, true) // queryParam hidden: true,
		}
		const isBlocked = false
		if (!isBlocked) {
		// Move new channel to top of the list, don't add it if its already
		// in my list of channels
			setListeners(setChannels, activeProfileId, activeUserId)(fullChannel)
			setChannels([
				fullChannel,
				...reject(propEq('cid', newChannelCid), channels),
			])
		}
		setNewChatModalOpen(false)
		// dispatch(
		// 	bulkAddRecords(profileRecordType, 'profiles', fullChannel.data.profiles),
		// )
		handleOpenChannel(fullChannel)
	}, [activeProfile, channels])
	// END - CREATING NEW CHANNEL - END

	// START - FETCHING & SETTING CHANNELS - START
	const fetchAndSetNextChannels = useCallback(async ({
		offset = 0, passedLimit = 20, passedBlocks,
	}) => {
		const streamFilter = {
			$and: [
				{ members: { $in: [String(activeProfile.user_id)] } },
				{ profiles: { $in: [String(activeProfile.id)] } },
			],
		}
		const sort = { last_message_at: -1 }
		const limit = 20 >= passedLimit ? 20 : passedLimit
		const myChannels = await client.queryChannels(streamFilter, sort, {
			watch: true,
			state: true,
			limit,
			offset,
		})
		const blockedIds = passedBlocks || blocks
		forEach( // Check for unreads on inactive profiles
			async (profile) => {
				// Stream uses "MongoDB like" queries
				// https://getstream.io/chat/docs/query_channels/?language=js

				// It also won't let you pass an empty array as a value of $nin,
				// (necessary for filtering out blocked chats)
				// hence the conditional logic below
				let membersFilter = {
					$and: [
						{ members: {
							$in: [String(profile.user_id)], // include my user
						} },
					],
				}
				if (blockedIds.length) {
					membersFilter = assocPath(
						['$and', 1],
						{ members: {
							$nin: blockedIds, // but don't include blocked users
						} },
						membersFilter,
					)
				}

				const inactiveFilter = { // Filter by chats that...
					$and: [
						membersFilter, // See above comments on membersFilter
						{ profiles: { $in: [String(profile.id)] } }, // include specifically this profile
					],
				}
				const unreadSort = { unread_count: -1 }
				const topChannel = await client.queryChannels(inactiveFilter, unreadSort, {
					watch: false,
					state: true,
					limit: 1,
				})
				// If there is a channel that has unread notifications, increment unreads
				// for that profile to display red dot on profile switcher
				if (topChannel.length) {
					// dispatch(incrementUnreadMessages(profile.id, path([0, 'id'], topChannel), prop(0, topChannel).countUnread()))
				}
			},
			inactiveProfiles,
		)
		// If current request returns fewer channels than the page limit
		// assume there are no more chats to fetch
		setAllChannelsFetched(myChannels.length < 20)
		// If you're at the end of the channel list or you have no chats
		// skip the rest of this function
		if (myChannels.length) {
			// On init the blocks state change happens too fast
			// so we need to pass the blocked list directly
			// otherwise, use the blocks state
			const allowedChannels = myChannels
			// If the new active profile doesn't have any chats
			// skip the rest of this function
			if (allowedChannels.length) {
				forEach(async (channel) => {
					// const themProfiles = values(omit([String(activeUserId)], path(['data', 'userProfilesObj'], channel)))
					const unread = channel.countUnread()
					setUnreadMessages(unreadMessages => unreadMessages + unread)
					if (unread) {
						if (any(message => message.user.id === String(activeUserId), channel.state.messages)) {
							// segmentRecievedMessage({ activeProfileId, themProfiles, wasOffline: true })
						} else {
							// segmentRecievedMessage({
							// 	activeProfileId, themProfiles, newChat: true, wasOffline: true,
							// })
						}
					}
					// needs listeners for new messages also
					if (activeProfile.id === activeProfileId) {
						setListeners(setChannels, activeProfileId, activeUserId)(channel)
					}
				}, allowedChannels)
				if (activeProfile.id === activeProfileId) {
					if (offset) { // if this is a paginated request, merge channels
						setChannels([...channels, ...allowedChannels])
					} else { // else, replace with a new list
						setChannels(allowedChannels)
					}
					const channelsToFetch = reduce((acc, channel) => [
						...acc,
						...channel.data.profiles,
					], [], allowedChannels)
					setChannelProfiles(channelsToFetch)

				}
			}
		}
	}, [channels, activeProfileId, blocks, userProfiles.length])
	// END - FETCHING & SETTING CHANNELS - END

	// START - INIT EFFECT - START
	useEffect(() => {
		const init = async () => {
			setChatDrawerOpen(false)
			setOpenChannel(false)
			if (!auth) {
				return null
			}
			if (!isEmpty(activeProfile)) {
				let blockedIds = blocks
				if (streamClient || prop('userToken', streamClient)) {
					client.disconnect()
				}
				const userId = activeProfile.user_id.toString()
				const { token } = await apiRequest({
					path: 'chat/auth', method: 'POST', authenticated: auth,
				})
				const userEvent = await client.setUser(
					{ id: userId },
					token,
				)
				setStreamClient(client)
				blockedIds = map( // Stream mutes are Quadio blocks
					mutedObj => path(['target', 'id'], mutedObj), path(['me', 'mutes'], userEvent),
				)
				setBlocks(blockedIds)
				setChannels([]) // Clear channels on active profile switch
				setUnreadMessages(0)
				setClientListeners(setChannels, activeProfileId, activeUserId, setUnreadMessages, setChannelProfiles)(client)
				fetchAndSetNextChannels({ passedBlocks: blockedIds })
			}
		}
		init()
	}, [activeProfileId])
	// END - INIT EFFECT - END

	// START - HIDING - START
	const hideChannel = async (channel) => {
		await channel.hide()
		setOpenChannel(false)
		handleHideChannel(setChannels)(channel)
	}
	// END - HIDING - END

	// START - BLOCKING & UNBLOCKING - START
	const getBlockingActionTargetId = (channel, currentUserId) => {
		// quadio profile ids of chat participants
		const chatProfiles = path(['data', 'profiles'], channel)
		// mappings of quadio user ids to profile ids of chat participants
		const chatUsers = path(['data', 'userProfilesObj'], channel)
		// find the non-'me' user in chat
		const targetProfileId = find(id => id !== `${currentUserId}`, chatProfiles)
		// find the key (user id) whose value equals the target profile id
		//
		// by blocking or unblocking the user id, we block or unblock ALL profiles
		// of that user
		return find(
			key => prop(key, chatUsers) === targetProfileId, keys(chatUsers),
		)
	}

	const blockUser = async (channel, currentUserId) => {
		const blockedUserId = getBlockingActionTargetId(channel, currentUserId)
		await streamClient.muteUser(`${blockedUserId}`)
		hideChannel(channel)
		channel.listeners = {}
		const newBlockedList = [...blocks, blockedUserId]
		setBlocks(newBlockedList)
		fetchAndSetNextChannels({ passedLimit: channels.length, passedBlocks: newBlockedList })
	}

	const unblockUser = async (channel, currentUserId) => {
		const unblockedUserId = getBlockingActionTargetId(channel, currentUserId)
		await streamClient.unmuteUser(`${unblockedUserId}`)
		await channel.show()
		setListeners(channel, activeProfileId, activeUserId)
		const newBlockedList = filter(blockedId => blockedId !== unblockedUserId, blocks)
		setBlocks(newBlockedList)
		fetchAndSetNextChannels({ passedLimit: channels.length, passedBlocks: newBlockedList })
	}
	// END - BLOCKING & UNBLOCKING - END

	// START - CONTEXT OBJ - START
	const context = {
		streamClient,
		openChannel,
		channels,
		toggleDrawer,
		handleOpenChannel,
		setChatDrawerOpen,
		chatDrawerOpen,
		channelProfiles,
		chatDrawerTab,
		setChatDrawerTab,
		createNewChannel,
		newChatModalOpen,
		setNewChatModalOpen,
		fetchAndSetNextChannels,
		allChannelsFetched,
		unreadMessages,
		setUnreadMessages,
		hideChannel,
		blockUser,
		unblockUser,
		blocks,
		feedActions,
		setFeedActions,
		getBlockingActionTargetId,
	}
	// END - CONTEXT OBJ - END

	return (
		<ChatContext.Provider value={context}>
			{children}
		</ChatContext.Provider>
	)
}
// END - CHAT CONTEXT - END

export const useChatContext = () => useContext(ChatContext)

export default ChatContext
