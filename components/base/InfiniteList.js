import React from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
	noChannelsContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})


export const InfiniteList = ({ loadMore, Component, itemCount, listData }) => {
	const load = () => {console.log('i losf')}
	return (
		<InfiniteLoader
			itemCount={itemCount}
			loadMoreItems={loadMore}
			isItemLoaded={() => {true}}
		>
			{
				({ onItemsRendered, ref }) => (
					<FixedSizeList
						onItemsRendered={onItemsRendered}
						height={800}
						itemSize={100}
						itemCount={itemCount}
						ref={ref}
					>
						{Component}
					</FixedSizeList>
				)
			}
		</InfiniteLoader>
	)
}

export default InfiniteList
