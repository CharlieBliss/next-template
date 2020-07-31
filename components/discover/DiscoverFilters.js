/** @jsx jsx */
import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AsyncAutoComplete from 'components/form/AsyncAutocomplete'
import { Button } from '@material-ui/core'

const filterWrapper = css`
	display: flex;
	flex-direction: column;
	width: 20em;

`

export const Filters = ({ filters = {}, setFilters }) => {
	const [tempFilters, setTempFilters] = useState(filters)
	return (
		<div css={filterWrapper}>
			<TextField
				label="Search"
				value={tempFilters.q}
				onChange={e => {
					e.preventDefault()
					setTempFilters({ ...tempFilters, q: e.target.value })
				}}
			/>
			 <Select
				value={tempFilters.campaign}
				onChange={e => {
					e.preventDefault()
					setTempFilters({ ...tempFilters, campaign: e.target.value })
				}}
			>
				<MenuItem value={'collab'}>Collab Challenge </MenuItem>
				<MenuItem value={undefined}>Clear </MenuItem>
			</Select>
			<AsyncAutoComplete
				label="Genre"
				path="genres"
				filterKey="genre"
				setTempFilters={setTempFilters}
				value={tempFilters.genre}
			/>
			<AsyncAutoComplete
				label="Looking For"
				path="track-looking-for-tags"
				filterKey="looking_for_ids"
				setTempFilters={setTempFilters}
				value={tempFilters.looking_for_ids}
			/>
			<Button
				onClick={() => setFilters(tempFilters)}
			>
				Filter
			</Button>
		</div>
	)
}

export default Filters