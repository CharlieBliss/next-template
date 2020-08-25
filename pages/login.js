import { useContext } from 'react'
import { login } from 'logic/auth/awsAmplify'
import { Form, Field } from 'react-final-form'
import { AuthContext } from 'pages/_app'

const Login = () => {
	const { setAuthenticated } = useContext(AuthContext)
	const onSubmit = ({ email, password }) => {
		login(email, password, setAuthenticated)
	}
	return (
		<Form
		onSubmit={onSubmit}
		render={({ handleSubmit }) => (
			<form onSubmit={handleSubmit}>
			<h2> Login </h2>
			<div>
				<label>Email</label>
				<Field name="email" component="input" placeholder="Email" />
			</div>
			<div>
				<label>Passwprd</label>
				<Field name="password" component="input" placeholder="Password" />
			</div>
			<button type="submit">Submit</button>
			</form>
		)}
		/>
	)
}

export default Login