import { useRouter } from 'next/router'

export default () => {
	const router = useRouter()
	return (
		<div>
			{router.pathname}
		</div>
	)
}
