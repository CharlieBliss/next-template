import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import path from 'ramda/src/path'

export const getSearchTab = pathname => pathname && propOr('all', 1, pathname.match(/\/search\/([a-z]*)/))

export const linkMap = (recordType, recordId) => {
	switch (recordType) {
		case 'track':
			return `tracks/${recordId}`
		case 'collections':
			return `playlists/${recordId}`
		case 'profile':
			return `profiles/${recordId}`
		default:
			console.warn('recordType not Supported in searchUtils')
			return null
	}
}

export const suggestSubtitle = (recordType, record) => {
	switch (recordType) {
		case 'track':
			return prop('artist_name', record)
		case 'collections':
			return prop('profile_name', record)
		case 'profile':
			return path(['community', 'name'], record)
		default:
			console.warn('recordType not Supported in searchUtils')
			return null
	}
}

export const suggestHistorySubtitle = (recordType, record) => {
	const communityName = path(['community', 'name'], record) || path(['communities', 0, 'name'], record)
	switch (recordType) {
		case 'track':
			return `Track | ${prop('artist_name', record)}`
		case 'collections':
			return `Playlist | ${prop('profile_name', record)}`
		case 'profile':
			return `User | ${communityName}`
		default:
			console.warn('recordType not Supported in searchUtils')
			return null
	}
}

export const suggestSubtitleTo = (recordType, recordId) => {
	if (recordType === 'track' || recordType === 'collections') {
		return `profiles/${recordId}`
	}
	return null
}
export const titleMap = (recordType) => {
	switch (recordType) {
		case 'track':
			return 'Tracks'
		case 'collections':
			return 'Playlists'
		case 'profile':
			return 'Users'
		default:
			console.warn('recordType not Supported in searchUtils')
			return null
	}
}

export const resourceTypeMap = {
	['track']: 'track',
	['profile']: 'profile',
	['collections']: 'collection',
}

export const searchResourceTypeMap = {
	track: 'track',
	profile: 'profile',
	collection: 'collections',
}
