import { Field } from 'react-final-form'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

import Radio from '@material-ui/core/Radio'

const inputStyle = ({ }) => css`
	height: 40px;
`

export const RadioField = ({ apiKey, label, options }) => {
	return (
		<Field
			name={apiKey}
			type="radio"
			render={({ input }) => (
				<>
					<FormLabel component="legend">{label}</FormLabel>
					<RadioGroup
						aria-label={label}
						label={label}
						options={options}
						color="primary"
						onChange={input.onChange}
						value={input.checked}
						variant="outlined"
					>
						{options.map(
							(option) => {
								return (
									<FormControlLabel
										checked={input.value === option.value}
										value={option.value}
										control={<Radio color="primary" />}
										label={option.label}
									/>
								)
							}

						)}
					</RadioGroup>
				</>
			)}
		/>
	)

}

export default RadioField
