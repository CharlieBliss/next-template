import { createMuiTheme } from "@material-ui/core"

export const theme = {
	colors: {
		base10: '#121317',
		base20: '#25272B',
		base30: '#1B1D22',
		base40: '#121317',
		text: 'white',
		black: 'black',
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
	}
})
