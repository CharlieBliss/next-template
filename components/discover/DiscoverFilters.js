/** @jsx jsx */
import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AsyncAutoComplete from 'components/form/AsyncAutocomplete'

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
				path="genres"
			/>
		</div>
	)
}

export default Filters