import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

import Clickable from 'components/base/Clickable'
import RemoteImage from 'components/base/RemoteImage'
import { ternary, orNull } from 'util/ramdaPlus'
import * as classes from './styles'

// TODO: I dont know that there will be any chips in new designs

// const ChipImage = ({ chip }) =>

const Chips = ({ chips = [], hideChips }) => {
	return null
	// if (hideChips || !chips.length) {
	// 	return null
	// }
	// return (
	// 	<div css={classes.chipContainer}>
	// 		{
	// 			chips.map(
	// 				(chip) => (
	// 					<img
	// 						src={`https://${imageDomain}/${staticImagesKey}/${file}`}
	// 						className={classes.campaignChip}
	// 						alt={alt}
	// 					/>
	// 				)
	// 			)
	// 		}
	// 	</div>
	// )
}

const AlbumOverlay = ({
	iconSize, noOverlay, icon, isPlaying, hideIcon,
}) => {
	const variableIcon = icon || (isPlaying ? 'pause' : 'play')

	return orNull(
		!noOverlay,
		<>
			<div
				css={classes.iconOverlay}
				data-hidden
			/>
			<div
				css={[
					classes.iconWrapper,
					{ [classes.hideIcon]: hideIcon },
				]}
				data-hidden
			>
				{ternary(
					isPlaying,
					<PauseCircleOutlineIcon css={theme => classes.icon(theme, iconSize)} />,
					<PlayCircleOutlineIcon css={theme => classes.icon(theme, iconSize)} />
				)}
			</div>
		</>,
	)
}

const TrackPendingOverlay = () => (
	<>
		<div
			css={[
				classes.iconOverlay,
				classes.forceHover,
			]}
		/>
		<div
			css={classes.iconWrapper}
		>
			<div css={classes.processingText}>
				Track processing. Check back soon!
			</div>
		</div>
	</>
)

export const AlbumArt = ({
	record, className, onClick,
	chips, imageSize, hideChips,
	isTrackPending, noOverlay,
	iconSize, icon, isPlaying,
}) => {
	const {
		image_uuid: imageUuid,
	} = record
	return (
		<Clickable
			classes={theme => [
				classes.container(theme),
				classes.clickableContainer(onClick),
			]}
			onClick={onClick}
		>
			<div css={classes.grid}>
				<RemoteImage
					uuid={imageUuid}
					imageSize={imageSize}
				/>
				<div css={classes.childContainer}>
					{ternary(
						isTrackPending,
						<TrackPendingOverlay />,
						<AlbumOverlay
							isPlaying={isPlaying}
							noOverlay={noOverlay}
							classes={classes}
							iconSize={iconSize}
							icon={icon}
						/>,
					)}
				</div>
			</div>
			<Chips
				chips={chips}
				hideChips={hideChips}
			/>
		</Clickable>
	)
}

export default AlbumArt
