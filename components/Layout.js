import { useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/Link'
import useFetchList from 'api/useFetchList'
import { AuthContext } from 'pages/_app'

export default function Home({ children }) {
	const { data } = useFetchList('account/profiles')
	const { setActiveProfileId } = useContext(AuthContext)
	useEffect(
		() => {
			if (data) {
				setActiveProfileId(data[0].id)
			}
		}, [data]
	)
  return (
	<div>
		<ul>
		<li>
			<Link href="/">
			<a>
				Home
			</a>
			</Link>
		</li>
		<li>
			<Link href="/login">
			<a>
				Login
			</a>
			</Link>
		</li>
		<li>
			<Link href="/discover">
				<a>
					Discover
				</a>
			</Link>
		</li>
		<li>
			<Link href="/communities">
				<a>
					Communities
				</a>
			</Link>
		</li>
		<li>
			<Link href="/charts">
				<a>
					Charts
				</a>
			</Link>
		</li>
		<li>
			<Link href="/profiles">
				<a>
					Profiles
				</a>
			</Link>
		</li>
		<li>
			<Link href="/create">
				<a>
					Create Track
				</a>
			</Link>
		</li>
		</ul>
		{children}
	</div>
  )
}
