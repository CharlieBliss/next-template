import { useCallback } from 'react'
import Hidden from '@material-ui/core/Hidden'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { noop } from 'util/ramdaPlus'

import Passport from 'components/base/Passport'

import { useChatContext } from 'components/chat/ChatContext'

export const ProfileSearchItem = (profile) => {
	const { createNewChannel } = useChatContext()
	const { name, image_uuid: imageUrl, id, communities } = profile
	const communityString = communities.map(community => community.name).join(', ')
	const windowSizeLtSm = useMediaQuery('(min-width:600px)')
	const handleMessageChannel = useCallback((e) => {
		e.preventDefault()
		createNewChannel(profile)
	}, [id])
	return (
		<ListItem
			divider
			disableGutters={windowSizeLtSm}
			onClick={windowSizeLtSm ? handleMessageChannel : noop}
		>
			<Passport
				src={imageUrl}
				recordId={id}
				title={name}
				subtitle={communityString}
			/>
			<Hidden only="xs">
				<div>
					<Button
						onClick={handleMessageChannel}
						type="tertiary"
						transparent
						size="small"
					>
						Message
					</Button>
				</div>
			</Hidden>
		</ListItem>
	)
}

export default ProfileSearchItem
