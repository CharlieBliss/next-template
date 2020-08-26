import { useRouter } from 'next/router'
import useFetchRecord from 'logic/api/useFetchRecord'

export default function Home() {
	const router = useRouter()
	const { id } = router.query
	const { status, data, error } = useFetchRecord({
		queryKey: 'tracks',
		id,
	})
	return (
		<>
			<div>
				Welcome to the track detail page
			</div>
			<div>
				{data?.title}
			</div>
		</>
	)
}
