/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef, useState } from 'react'
import dayjs from 'dayjs'
import { orNull, ternary } from 'util/ramdaPlus'
import Body30 from 'components/typography/Body30'
import AlbumArt from 'components/base/AlbumArt'
import LikeButton from 'components/track/LikeButton'
import Link from 'components/base/Link'
import * as emoClasses from './styles'
import { trackDetailRoute } from 'logic/routes'

// import { useMediaQuery } from '@material-ui/core/styles'
// const xs = useMediaQuery(theme => theme.breakpoints.only('xs'))
// const sm = useMediaQuery(theme => theme.breakpoints.only('sm'))
// const md = useMediaQuery(theme => theme.breakpoints.only('md'))
// START - MD+ GENRES LIST - START
const GenresList = ({ subGenres = [], classes }) => (
	<Body30 className={classes.fontStyle}>
		{
			subGenres.map(genre => genre.name).join(', ')
		}
	</Body30>
)
// END - MD+ GENRES LIST - END

// START - SIMPLE TRACK LIST ITEM - START
const SimpleTrackListItem = ({
	record, queryKey, showGenres, small, medium, onClick,
	canRemoveFromPlaylist, playlistId,
	noMenu, index, buttonLabel, buttonHoverLabel,
}) => {
	const classes = {}
	const itemRef = useRef()
	const [collabModalOpen, setCollabModalOpen] = useState(false)
	const {
		title, artist_name: artistName, duration, added, artist,
		sub_genres: subGenres, collaborator_ids: collaborators = [],
		liked, collection_item_id: collectionItemId, liked_at: likedAt,
		id, total_likes: totalLikes,
	} = record

	const trackDuration = duration ? duration.replace(/^(00:0)|(00:)/, '') : duration
	const addedTime = added || likedAt
	const trackAdded = dayjs(addedTime).format('MMM DD, YYYY')
	const collabCount = collaborators.length

	// const playTrack = () => dispatch(thunkQueueTracks({ recordId, filterStoreKey }))
	const handlePlayTrack = (e) => {
		if ((e.key === 'Enter') || !e.key) {
			console.log(`playing ${title}`)
		}
	}

	const handleFocus = () => {
		itemRef.current.focus()
	}

	return (
		<>
			<div
				ref={itemRef}
				tabIndex="0"
				onClick={handleFocus}
				onKeyPress={handlePlayTrack}
				onDoubleClick={handlePlayTrack}
				role="button"
				css={emoClasses.listItemWrapper}
			>

				<div css={emoClasses.albumArtWrapper}>
					<AlbumArt
						className={classes.albumArt}
						record={record}
						onClick={handlePlayTrack}
						iconSize="large"
					/>
				</div>
				<Link href={trackDetailRoute(id)}>
					<Body30>
						{title}
					</Body30>
				</Link>
				<div className={classes.likeWrapper}>
					<LikeButton
						liked={liked}
						likes={totalLikes}
						showLikes
						id={id}
						queryKey={queryKey}
					/>
				</div>
			</div>
				{/* <div
					className={clsx(
						classes.titleWrapper,
						{ [classes.genrelessTitle]: !showGenres },
					)}
				>
					<Body30>
						{title}
					</Body30>
				</div>
				<div
					className={clsx(
						classes.artistWrapper,
						{ [classes.genrelessArtist]: !showGenres },
					)}
				>
					<div
						css={clsx(
							classes.fontStyle,
							classes.truncateArtist,
						)}
						to={artistDetailLink}
					>
						<Body30>{artistName}</Body30>
					</div>
					{
						orNull(
							collabCount,
							<div
								onClick={() => setCollabModalOpen(true)}
								className={classes.plusStyle}
							>
								<Body30>
									&nbsp;
									{`+${collabCount}`}
								</Body30>
							</div>,
						)
					}
				</div>
				<div className={classes.communityWrapper}>
					<CommunityChips
						numberOfChipsDisplay={2}
						recordId={recordId}
						justify="flex-start"
						recordType={trackRecordType}
						useLetterOnMulti
					/>
				</div>
				{ternary(
					showGenres,
					<div className={classes.genresWrapper}>
						<GenresList classes={classes} subGenres={subGenres} />
					</div>,
					<div className={classes.durationWrapper}>
						<Body50 className={classes.plusStyle}>
							{trackDuration}
						</Body50>
					</div>,
				)}
				{ternary(
					showGenres && md,
					<div className={classes.durationWrapper}>
						<Body50 className={classes.plusStyle}>
							{trackDuration}
						</Body50>
					</div>,
					<div className={classes.durationWrapper}>
						<Body50 className={classes.fontStyle}>
							{trackAdded}
						</Body50>
					</div>,
				)}
				<div className={classes.moreWrapper}>
					{orNull(
						!noMenu,
						<TrackMoreButtonMenu
							liked={liked}
							recordId={recordId}
							artistId={artist}
							canRemoveFromPlaylist={canRemoveFromPlaylist}
							playlistId={playlistId}
							collectionItemId={collectionItemId}
						/>,
					)}
				</div>
			</div>
			<Modal open={collabModalOpen} setOpen={setCollabModalOpen}>
				<PassportModalList
					title="Collaborators"
					path={trackArtistsApiPath(recordId)}
					recordId={recordId}
				/>
			</Modal> */}
		</>
	)
}
// END - SIMPLE TRACK LIST ITEM - END

export default SimpleTrackListItem
