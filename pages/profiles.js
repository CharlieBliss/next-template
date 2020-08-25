/** @jsx jsx */
import { useContext } from 'react'
import { jsx } from '@emotion/core'

import { useQuery, queryCache } from 'react-query'
import useFetchList from 'logic/api/useFetchList'
import Link from 'next/Link'
import { AuthContext } from 'pages/_app'


const createStyles = (id) => {
	const colors = ['papayawhip', 'cadetblue', 'lightcoral', 'darkseagreen']
	const color = colors[id % 4]
	return ({
		padding: '0.5em',
		margin: '0.5em',
		color: `RGB(${id % 240}, ${id % 23}, ${id % 20})`,
		backgroundColor: color,
		border: 'none',
		borderRadius: '3px',
	})
}


const Profiles = () => {
	const { authenticated } = useContext(AuthContext)
	const { status, data, error } = useFetchList({ queryKey: 'profiles' })
	if(authenticated) {
		return (
			<div>
				<div>
					Hello, this is the community page. You need to be authenticated to see me.
				</div>
				<ul>
					{
						data?.map(
							item => (
								<Link href="profiles/[id]" as={`profiles/${item.id}`} key={item.id}>
									<a>
										<li
											css={createStyles(item.id)}
										>
											{item.name}
										</li>
									</a>
								</Link>
							)
						)
					}
				</ul>
			</div>
		)
	}
	return (
		<div>
			Warning you are banned
		</div>
	)
}

export default Profiles
