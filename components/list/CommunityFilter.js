/** @jsx jsx */
import { useState } from 'react'
import AsyncAutoComplete from 'components/form/AsyncAutocomplete'
import Button from '@material-ui/core/Button'
import { css, jsx } from '@emotion/core'
import filter from 'ramda/src/filter'
import keys from 'ramda/src/keys'
import { without } from 'ramda'


const buttonGroup = css`
	display: flex;
	flex-direction: row;
	width: 20em;
`

const buttonStyles = css`
	width: 50%;
`

const pathMap = {
	region: 'regions',
	state: 'states',
	communities: 'communities'
}

const labelMap = {
	region: 'Region',
	state: 'State',
	communities: 'University',
}

export const CommunityFilter = ({ tempFilters, setTempFilters }) => {
	const [active, setActive] = useState('region')
	return (
		<div>
			<div css={buttonGroup}>
				<Button
					onClick={() => setActive(false)}
					css={buttonStyles}
				>
					National
				</Button>

				<Button
					onClick={() => setActive('region')}
					css={buttonStyles}
				>
					Region
				</Button>
				<Button
					onClick={() => setActive('state')}
					css={buttonStyles}
				>
					State
				</Button>
				<Button
					onClick={() => setActive('communities')}
					css={buttonStyles}
				>
					University
				</Button>
			</div>
			<AsyncAutoComplete
				label={labelMap[active]}
				path={pathMap[active]}
				filterKey={active}
				setTempFilters={setTempFilters}
				clearFilters={without([active], ['region', 'state', 'communities'])}
				value={tempFilters[active] || null}
			/>
		</div>
	)
}

export default CommunityFilter