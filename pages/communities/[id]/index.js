import { useQuery, queryCache } from 'react-query'
import { useRouter } from 'next/router'
import useFetchRecord from 'logic/api/useFetchRecord'

export default function Home() {
	const router = useRouter()
	const { id } = router.query
	const { status, data, error } = useFetchRecord({
		queryKey: 'communities',
		id,
	})
	return (
		<>
			<div>
				Welcome to the community detail page
			</div>
			<div>
				{data?.name}
			</div>
		</>
	)
}
