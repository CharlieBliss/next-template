import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { ternary } from 'util/ramdaPlus'
import useFetchSearch from 'logic/api/useFetchSearch'
import H2 from 'components/typography/H2'
import { getSearchTab } from 'logic/search/searchUtils'
import { useSearchContext } from 'logic/contexts/SearchContext'
import { SearchResultGroup } from 'components/search/SearchItemComponents'


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
// 	emptyMessage: {
// 		paddingTop: 20,
// 		textAlign: 'center',
// 	},
// }))


export default () => {
	const classes = { }
	const router = useRouter()
	const { searchTerm, setSearchTerm } = useSearchContext()
	const { tab } = router.query

	useEffect(
		() => {
			if (router.query.q) {
				setSearchTerm(router.query.q)
			}
		}, [router.query],
	)

	const queryParams = {
		q: searchTerm,
	}

	const { data, error, loading } = useFetchSearch({
		path: tab,
		queryParams,
		enabled: searchTerm,
	})

	if (loading) {
		return (
			<div className={classes.emptyMessage}>
				<LoadingSpinner />
			</div>
		)
	}
	return (
		<div className={classes.pageWrapper}>
			<Container fixed className={classes.container}>
				{
					ternary(
						data.length,
						<SearchResultGroup recordType={tab} records={data} idsOnly />,
						<div className={classes.emptyMessage}>
							<H2>
								{
									searchTerm
										? `No results found for "${searchTerm}"`
										: 'Enter a search term above'
								}
							</H2>
						</div>,
					)
				}
			</Container>
		</div>
	)
}
