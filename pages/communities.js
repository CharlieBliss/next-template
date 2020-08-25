/** @jsx jsx */
import { useContext } from 'react'
import { jsx } from '@emotion/core'

import useFetchList from 'logic/api/useFetchList'
import Link from 'next/Link'
import { AuthContext } from 'pages/_app'


const createStyles = (id) => ({
	padding: '0.5em',
	margin: '0.5em',
	color: `RGB(${id % 256}, 200, 200)`,
	background: 'papayawhip',
	border: 'none',
	borderRadius: '3px',
})


const Communities = () => {
	const { authenticated } = useContext(AuthContext)
	const { status, data, error } = useFetchList({ queryKey: 'communities' })
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
								<Link href="communities/[id]" as={`communities/${item.id}`} key={item.id}>
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

export default Communities
