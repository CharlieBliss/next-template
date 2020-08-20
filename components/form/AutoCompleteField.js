import { Field } from 'react-final-form'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import AsyncAutoComplete from 'components/form/AsyncAutocomplete'

const inputStyle = ({ }) => css`
	height: 40px;
`

export const AutoCompleteField = ({ apiKey, label, path, multi, queryParams }) => {
	return (
		<Field
			name={apiKey}
			render={({ input }) => {
				return (
					<AsyncAutoComplete
						onChange={input.onChange}
						label={label}
						variant="outlined"
						path={path}
						multi={multi}
						queryParams={queryParams}
						value={input.value || (multi ? [] : '')}
					/>
				)
			}}
		/>
	)

}

export default AutoCompleteField