import Tabs from 'components/base/Tabs'
import { useRouter } from 'next/router'
import SearchAll from 'components/search/SearchAll'
import SearchType from 'components/search/SearchType'

const SearchTab = ({ tab }) => {
	if (tab === 'all') {
		return <SearchAll />
	}
	return <SearchType />
}

export default () => {
	const router = useRouter()
	const { tab } = router.query
	const pathName = router.asPath
	const handleChange = (newValue) => {
		console.log(router)
		router.push('/search/[tab]', `${newValue}?q=${router.query.q}`)
	}

	return (
		<div>
			<Tabs
				onChange={handleChange}
				defaultOption="/search/all"
				options={[
					{
						value: '/search/all',
						label: 'All',
					},
					{
						value: '/search/tracks',
						label: 'Tracks',
					},
					{
						value: '/search/profiles',
						label: 'People',
					},
					{
						value: '/search/collections',
						label: 'Collections',
					},
				]}
			/>
			<SearchTab
				tab={tab}
			/>
		</div>
	)
}
