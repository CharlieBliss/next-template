import length from 'ramda/src/length'
import times from 'ramda/src/times'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ternary, indexedMap } from 'util/ramdaPlus'
import useFetchList from 'api/useFetchList'

// Components
import LinkedPageSection from 'components/base/LinkedPageSection'
import Carousel, { emblaSlide } from 'components/base/Carousel'
import ProfileCard from 'components/profile/ProfileCard'

// import {
// 	trackCardWidthXs, trackCardSpacing, emptyTrackCardText,
// 	followingRecentlyPlayedDelay,
// } from '@/client/constants/homePage'

export const NewCommunityArtists = () => {
	const queryParams = {
		page_size: 4,
		categories: [1,2],
		communities: 659,
		sort: '-created',
		status: 'completed',
		'exclude_remoted': true,
		active_profile_id: 112,
	}
	const { data = [], isLoading } = useFetchList(`profiles`, queryParams)
	const playedTracks = indexedMap(
			(item, index) => {
				const { id } = item
				return (
					<ProfileCard
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
			title="New artists from your community"
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
								<div css={emblaSlide}>
									<ProfileCard
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
								<ProfileCard
									key="empty"
								/>,
							],
						)
				}
			</Carousel>
		</LinkedPageSection>
	)
}

export default NewCommunityArtists