import length from 'ramda/src/length'
import times from 'ramda/src/times'
import { ternary, indexedMap } from 'util/ramdaPlus'
import useFetchList from 'api/useFetchList'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
// Components
import LinkedPageSection from 'components/base/LinkedPageSection'
import Carousel, { emblaSlide } from 'components/base/Carousel'
import TrackCard from 'components/track/TrackCard'

// import {
// 	trackCardWidthXs, trackCardSpacing, emptyTrackCardText,
// 	followingRecentlyPlayedDelay,
// } from '@/client/constants/homePage'

const slide = css`
	min-width: 25%;
`

export const FollowingRecentlyPlayed = () => {
	const recordId = 112
	const queryParams = {
		page_size: 12,
		active_profile_id: 112,
	}
	const { data = [], isLoading } = useFetchList(`profiles/${recordId}/following-plays`, queryParams)
	const playedTracks = indexedMap(
			(item, index) => {
				const { id } = item
				return (
					<div
						css={[emblaSlide, slide]}
					>
						<TrackCard
							key={id}
							index={index}
							item={item}
							showPassport
						/>
					</div>
				)
			},
			data,
		)

	return (
		<LinkedPageSection
			title="Plays from people you follow"
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
								<div
									css={[emblaSlide, slide]}
								>
									<TrackCard
										key={`loading-${i}`}
										recordId="loading"
										passportRecordId="loading"
										showPassport
										loading
									/>
								</div>
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

export default FollowingRecentlyPlayed