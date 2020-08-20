import React, { useCallback, useMemo, useState } from 'react'
// import { makeStyles } from '@material-ui/styles'
import map from 'ramda/src/map'
import debounce from 'lodash.debounce'

import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import utilApiRequest from 'api/apiRequest'
// @TODO: deprecate getFollowing
import { useChatContext } from 'components/chat/ChatContext'

import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import ProfileSearchItem from 'components/chat/ProfileSearchItem'
import Body10 from 'components/typography/Body10'

// import typography from '@/client/themes/typography'
// import { common } from '@/client/themes/colors'
import useFetchList from 'api/useFetchList'

// const useStyles = makeStyles(theme => ({
// 	modalHeader: {
// 		'& h2': {
// 			color: common.white.main,
// 			...typography.h2,
// 		},
// 	},
// 	drawer: {
// 		width: 400,
// 	},
// 	profileList: {
// 		overflowY: 'scroll',
// 		height: '100%',
// 		width: '100%',
// 		paddingRight: 12,
// 		boxSizing: 'border-box',
// 	},
// 	searchInput: {
// 		'& div': {
// 			'.MuiInput-underline:hover:not(.Mui-disabled):before': {
// 				borderBottom: [[1, 'solid', 'rgba(255, 255, 255, 0.5)']],
// 			},
// 			'&:before': {
// 				borderBottom: [[1, 'solid', 'rgba(255, 255, 255, 0.5)']],
// 				'& hover': {
// 					borderBottom: [[1, 'solid', 'rgba(255, 255, 255, 0.3)']],
// 				},
// 			},
// 		},
// 		'& input': {
// 			color: common.white.main,
// 		},
// 	},
// 	searchIcon: {
// 		width: 20,
// 		fill: common.white.main,
// 		opacity: 0.5,
// 	},
// 	modalHeaderContainer: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		height: '100%',
// 	},
// 	dialogContentRoot: {
// 		[theme.breakpoints.only('xs')]: {
// 			padding: [[8, 16]],
// 		},
// 		height: 360,
// 	},
// 	closeButton: {
// 		position: 'absolute',
// 		right: theme.spacing(1),
// 		top: theme.spacing(1),
// 		'& svg': {
// 			width: 18,
// 			fill: common.white.main,
// 			opacity: 0.5,
// 		},
// 	},
// 	resultsMessageContainer: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		flexGrow: 1,
// 		alignItems: 'center',
// 		overflow: 'hidden',
// 	},
// 	enterTerm: {
// 		marginTop: 8,
// 	},
// }))

const ProfileList = ({ profileList }) => map(profile => (
	<ProfileSearchItem key={profile.id} {...profile} />
), profileList)

const SearchResults = ({ loading, profileList, searchTerm, following }) => {
	const classes = {}
	if (loading) {
		return (
			<div className={classes.resultsMessageContainer}>
				<CircularProgress />
			</div>
		)
	}
	if (searchTerm && profileList.length) {
		return (
			<List className={classes.profileList}>
				<ProfileList profileList={profileList} />
			</List>
		)
	}
	if (searchTerm) {
		return (
			<div className={classes.resultsMessageContainer}>
				<Body10>No Results</Body10>
			</div>
		)
	}
	return (
		<div className={classes.resultsMessageContainer}>
			<Body10 className={classes.enterTerm}>Enter a search term</Body10>
			<List className={classes.profileList}>
				<ProfileList profileList={following} />
			</List>
		</div>
	)
}

const emptyProfileList = []
export const ChatModal = () => {
	// START - STATE, CONTEXT, ETC - START
	const { newChatModalOpen, setNewChatModalOpen } = useChatContext()
	const classes = {}
	const [profileList, setProfileList] = useState(emptyProfileList)
	const [searchTerm, setSearchTerm] = useState()
	const [loading, setLoading] = useState(false)
	const activeProfileId = 112
	const auth = true

	const adornment = useMemo(() => ({
		startAdornment: (
			<InputAdornment position="start">
				<Search className={classes.searchIcon} />
			</InputAdornment>
		),
	}), [])

	const handleClose = useCallback(() => {
		setProfileList(emptyProfileList)
		setNewChatModalOpen(false)
	}, [])
	// END - STATE, CONTEXT, ETC - END

	// START - GET FOLLOWING - START
	const { data: followingList } = useFetchList({ queryKey: 'profiles/112/following' })

	// END - GET FOLLOWING - END

	// START - SEARCH METHODS - START
	const debouncedHandleSearch = debounce(async (e) => {
		const { value } = e.target
		setSearchTerm(value)
		if (value) {
			setLoading(true)
			const { results } = await utilApiRequest({
				auth,
				path: 'profiles',
				method: 'GET',
				queryParams: {
					q: value,
					sort: '-relevance',
					exclude_me: true,
					can_chat: true,
				},
				activeProfileId,
				authenticated: auth,
			})
			setProfileList(results || emptyProfileList)
			setLoading(false)
		}
	}, 250)
	const handleSearch = (e) => {
		e.persist()
		debouncedHandleSearch(e)
	}
	// END - SEARCH METHODS - END

	return (
		<Dialog
			open={newChatModalOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle className={classes.modalHeader}>
				New Chat
				<IconButton
					className={classes.closeButton}
					onClick={handleClose}
					aria-label="Close chat drawer"
				>
					<Close className={classes.iconWidth} />
				</IconButton>
			</DialogTitle>
			<DialogContent classes={{ root: classes.dialogContentRoot }}>
				<div className={classes.modalHeaderContainer}>
					<TextField
						placeholder="Search"
						fullWidth
						type="text"
						onChange={handleSearch}
						InputProps={adornment}
						className={classes.searchInput}
						autoFocus={newChatModalOpen}
					/>
					<SearchResults
						profileList={profileList}
						following={followingList}
						searchTerm={searchTerm}
						loading={loading}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ChatModal