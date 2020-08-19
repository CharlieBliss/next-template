import { Field } from 'react-final-form'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import TextField from '@material-ui/core/TextField'

const inputStyle = ({ }) => css`
	height: 40px;
`

export const InputField = ({ apiKey, label }) => {
	return (
		<Field
			name={apiKey}
			render={({ input }) => <TextField label={label} onChange={input.onChange} variant="outlined"  />}
		/>
	)

}

export default InputField