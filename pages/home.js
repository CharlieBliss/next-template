/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Container from '@material-ui/core/Container'
import RecentLikedTracks from 'components/home/RecentLikedTracks'
import FollowingRecentlyPlayed from 'components/home/FollowingRecentlyPlayed'
import NewCommunityArtists from 'components/home/NewCommunityArtists'
import NewStateTracks from 'components/home/NewStateTracks'
// import HomePageChart from 'components/home/HomePageChart'

import QuadioSpotlight from 'components/home/QuadioSpotlight'
// import BusinessZone from 'components/home/BusinessZone'

// const useStyles = makeStyles(({ breakpoints }) => ({
// 	pageWrapper: {
// 		width: '100%',
// 		overflow: 'hidden',
// 	},
// 	container: {
// 		[breakpoints.up('lg')]: {
// 			overflow: 'hidden',
// 		},
// 	},
// 	sectionItem: {
// 		width: '100%',
// 	},
// }))

const pageWrapper = css`
  width: '100%';
  overflow: 'hidden';
`

const sectionItem = css`
  width: 100%;
`


export const Home = () => {
	return (
		<Container css={pageWrapper}>
      <div css={sectionItem}>
        <QuadioSpotlight section="home_spotlight_1" />
      </div>
      <div css={sectionItem}>
        <FollowingRecentlyPlayed />
      </div>
      <div css={sectionItem}>
        <QuadioSpotlight section="home_spotlight_2" />
      </div>
      {/* <div css={sectionItem}>
        <HomePageChart />
      </div> */}
      <div css={sectionItem}>
        <NewStateTracks />
      </div>
      <div css={sectionItem}>
        <NewCommunityArtists />
      </div>
      <div css={sectionItem}>
        <RecentLikedTracks title="Your recent likes" />
      </div>
      {/* <div css={sectionItem}>
        <BusinessZone />
      </div> */}
		</Container>
	)
}

export default Home
