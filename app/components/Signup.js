import React from 'react';
import {Link} from 'react-router';
import UserStore from 'stores/UserStore';


export default class Signup extends React.Component {
		constructor(props) {
    super(props);
    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }
render() {
  return (
	<div>
	<div className="wrapper2">
	<div className="container">
		<h1>Welcome</h1>
		<form action = "/signup" method = "post">
			<input type="text" className = "form-control" placeholder="Username" name = "email"/>
			<input type="password" className = "form-control" placeholder="Password" name = "password"/>
			<button type="submit" id="login-button2">Signup</button>
		</form>
		<hr/>
<p>Already have an account? <Link to="login">Log in</Link></p>
	</div>
</div>
</div>
			);
	}
}
