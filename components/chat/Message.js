import React from 'react'
import clsx from 'clsx'
import map from 'ramda/src/map'
import makeStyles from '@material-ui/styles/makeStyles'
// import AttachFile from '@material-ui/icons/AttachFile'
// import AttachFile from '@/client/web/svg/AttachFile'

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
	},
	wrapperMe: {
		justifyContent: 'flex-end',
	},
	wrapperThem: {

		justifyContent: 'flex-start',
	},
	common: {
		wordBreak: 'break-word',
		// color: theme.palette.white.main,
		borderRadius: 18,
		padding: 10,
		marginBottom: 5,
	},
	me: {
		backgroundColor: 'blue',
		maxWidth: 200,
	},
	them: {
		backgroundColor: 'white',
		maxWidth: 200,
	},
	messageContentWrapper: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		alignItems: 'space-between',
	},
	attachmentImage: {
		width: '100%',
	},
	attachmentAttachFileContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
		alignItems: 'center',
		textDecoration: 'none',
		// color: theme.palette.white.main,
		'& svg': {
			width: 50,
		},
		'&:hover': {
			// color: theme.palette.white.main,
			opacity: 0.7,
		},
	},
})

const Attachment = ({ attachment }) => {
	const classes = useStyles()
	const {
		type, image_url: imageUrl, fallback, title, asset_url: assetUrl,
	} = attachment
	if (type === 'image') {
		return (
			<img
				src={imageUrl}
				alt={fallback}
				className={classes.attachmentImage}
			/>
		)
	}
	return (
		<a
			className={classes.attachmentAttachFileContainer}
			target="_blank"
			rel="noopener noreferrer"
			href={assetUrl}
		>
			{/* <AttachFile /> */}
			{title}
		</a>
	)
}

export const Message = ({ message, client }) => {
	const classes = useStyles()
	const viewingUser = client.userID
	const userId = message.user.id
	const me = viewingUser === userId
	const { text, attachments } = message
	return (
		<div
			className={clsx(
				classes.wrapper,
				{
					[classes.wrapperMe]: me,
					[classes.wrapperThem]: !me,
				},
			)}
		>
			<div
				className={clsx(
					classes.common,
					{
						[classes.me]: me,
						[classes.them]: !me,
					},
				)}
			>
				<div className={classes.messageContentWrapper}>
					{attachments.length ? map(attachment => (
						<Attachment attachment={attachment} />
					), attachments) : null}
					{text}
				</div>
			</div>
		</div>
	)
}

export default Message