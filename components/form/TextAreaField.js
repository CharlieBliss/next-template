import { Field } from 'react-final-form'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import TextField from '@material-ui/core/TextField'


export const TextAreaField = ({ apiKey, rows = 4, label }) => {
	return (
		<Field
			name={apiKey}
			render={({ input }) => (
				<TextField
					multiline
					rows={rows}
					label={label}
					onChange={input.onChange}
					color="primary"
					variant="outlined"
				/>
			)}
		/>
	)

}

export default TextAreaField