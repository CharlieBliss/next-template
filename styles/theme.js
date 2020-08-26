import { createMuiTheme } from '@material-ui/core'

export const theme = {
	colors: {
		base10: '#121317',
		base20: '#25272B',
		base30: '#1B1D22',
		base40: '#121317',
		text: 'white',
		black: 'black',
		white: '#FFFFFF',
	},
	zIndex: {
		appBar: 10000,
	},
	opacity: {
		primaryActive: 1,
		inputActive: '.98',
		secondaryHover: '.95',
		primaryHover: '.80',
		inputHover: '.78',
		secondaryDefault: '.75',
		tertiaryHover: '.70',
		primaryInactive: '.60',
		inputDefault: '.58',
		tertiaryDefault: '.50',
		iconButtonInactive: '.40',
		inputPlaceholder: '.38',
		progressBarInactive: '.30',
		primaryDisabled: '.20',
		secondaryDisabled: '.20',
		tertiaryDisabled: '.20',
		inputDisabled: '.20',
		buttonHover: '.10',
	},
}

export default createMuiTheme({
	palette: {
		primary: {
			light: '#00404a',
			main: '#28a4ba',
			dark: '#cce0e7',
		},
		background: {
			paper: '#121317',
			base20: '#25272B',
			default: '#1B1D22',
			base40: '#121317',
		},
		text: {
			primary: '#fff',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(255, 255, 255, 0.5)',
			hint: 'rgba(255, 255, 255, 0.5)',
			icon: 'rgba(255, 255, 255, 0.5)',
		},
	},
})
