import { useQuery, queryCache } from 'react-query'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/Link'
import Body30 from 'components/typography/Body30'
import useFetchRecord from 'api/useFetchRecord'
import useFetchList from 'api/useFetchList'

const Playlists = ({ playlists = [], playlistLoading }) => {
	if(playlistLoading) {
		return <CircularProgress />
	}
	if(!playlistLoading && !playlists.length) {
		return null
	}
	return playlists.map(
		playlist => (
			<Link href="/playlists/[id]" as={`/playlists/${playlist.id}`} key={playlist.id}>
				<a>
					<Body30>
						{playlist.title}
					</Body30>
				</a>
			</Link>
		)
	)
}

export default function Home() {
	const router = useRouter()
	const { id } = router.query
	const { data } = useFetchRecord('profiles', id)
	const { loading: playlistLoading, data: playlists } = useFetchList({
		queryKey: 'collections',
		queryParams: {
			page_size: 10,
			is_playlist: true,
			profile_id: id,
			active_profile_id: 112,
		},
	})
	return (
		<>
			<div>
				Welcome to the profile detail page
			</div>
			<div>
				{data?.name}
			</div>
			<div>
				<Playlists playlists={playlists} playlistLoading={playlistLoading}/>
			</div>
		</>
	)
}
