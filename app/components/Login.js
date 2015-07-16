import React from 'react';
import {RouteHandler, Link} from 'react-router';


export default class Login extends React.Component {
	render() {
  return (
	<div>
	<div className="wrapper">
	<div className="container">
		<h1>Welcome</h1>
		<form action = "/login" method = "post">
			<input type="text" className = "form-control" placeholder="Username" name = "email" />
			<input type="password" className = "form-control" placeholder="Password" name = "password" />
			<button type="submit" id="login-button">Login</button>
		</form>
		<hr />

<p>Need an account? <Link to="signup">Signup</Link></p>

	</div>
</div>
</div>
			);
	}
}
