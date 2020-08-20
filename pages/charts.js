/** @jsx jsx */
import { useContext } from 'react'
import { jsx } from '@emotion/core'

import useFetchList from 'api/useFetchList'
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


const Discover = () => {
	const { authenticated } = useContext(AuthContext)
	const queryParams = {
		sort: 'hotness',
		exclude_removed: true,
	}
	const { data } = useFetchList({ queryKey: 'tracks', queryParams })
	if (authenticated) {
		return (
			<div>
				<div>
					Hello, this is the charts page. You need to be authenticated to see me.
				</div>
				<ul>
					{
						data?.map(
							item => (
								<Link href="tracks/[id]" as={`tracks/${item.id}`} key={item.id}>
									<a>
										<li
											css={createStyles(item.id)}
										>
											{item.title}
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
			Warnign you are banned
		</div>
	)
}

export default Discover
