import React from 'react';
import {RouteHandler, Link} from 'react-router';


export default class Signup extends React.Component {
	render() {
  return (
	<div>
	<div className="wrapper">
	<div className="container">
		<h1>Welcome</h1>
		<form action = "/signup" method = "post">
			<input type="text" className = "form-control" placeholder="Username" name = "email"/>
			<input type="password" className = "form-control" placeholder="Password" name = "password"/>
			<button type="submit" id="login-button">Signup</button>
		</form>
		<hr/>
<p>Already have an account? <Link to="login">Log in</Link></p>
	</div>
</div>
</div>
			);
	}
}
