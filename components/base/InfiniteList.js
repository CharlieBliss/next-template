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


export const InfiniteList = ({ loadMore, Component, itemCount, listData, isLoading }) => {
	return (
		<InfiniteLoader
			itemCount={itemCount}
			// Default argument here is itemcount which messes up react-query infinite scroll
			loadMoreItems={() => loadMore()}
			isItemLoaded={index => {
       			return listData[index]?.id
    		}}
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
