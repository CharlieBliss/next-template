import length from 'ramda/src/length'
import times from 'ramda/src/times'
import { ternary, indexedMap } from 'util/ramdaPlus'
import useFetchList from 'api/useFetchList'

// Components
import LinkedPageSection from 'components/base/LinkedPageSection'
import Carousel from 'components/base/Carousel'
import TrackCard from 'components/track/TrackCard'

// import {
// 	trackCardWidthXs, trackCardSpacing, emptyTrackCardText,
// 	followingRecentlyPlayedDelay,
// } from '@/client/constants/homePage'

export const NewStateTracks = () => {
	const queryParams = {
		page_size: 4,
		sort: '-created',
		status: 'completed',
		'exclude_remoted': true,
		state: 8,
		active_profile_id: 112,
	}
	const { data = [], isLoading } = useFetchList(`tracks`, queryParams)
	const playedTracks = indexedMap(
			(item, index) => {
				const { id } = item
				return (
					<TrackCard
						key={id}
						index={index}
						item={item}
						showPassport
					/>
				)
			},
			data,
		)

	return (
		<LinkedPageSection
			title="New tracks from your state"
		>
			<Carousel
				slidesPerPage={3}
				slidesPerScroll={2}
				disabled={isLoading}
				processing={isLoading}
			>
				{
					isLoading
						? times(
							i => (
								<TrackCard
									key={`loading-${i}`}
									recordId="loading"
									passportRecordId="loading"
									showPassport
									loading
								/>
							), 4,
						)
						: ternary(
							length(playedTracks),
							playedTracks,
							[
								<TrackCard
									key="empty"
								/>,
							],
						)
				}
			</Carousel>
		</LinkedPageSection>
	)
}

export default NewStateTracks