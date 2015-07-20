import React from 'react';
import {Link} from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';

export default class Login extends React.Component {


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

  _onLoginSubmit = () => {
    const email = React.findDOMNode(this.refs.email).value;
    const password = React.findDOMNode(this.refs.password).value;
    UserActions.manuallogin({
      email: email,
      password: password
    });
  }

	render() {
  let renderedResult;
  console.log(this.state.user);
  if (this.state.user.get('authenticated')) {
    renderedResult = (
       <div>
	<div className="wrapper">
	<div className="container">
		<h1 className="login__header">LoggedIN!</h1>
		<Link to="/dashboard">Lets head to the dashboard </Link>
		<hr />
		</div>
		</div>
		</div>
		);
  } else {
    if (this.state.user.get('isWaiting')) {
      renderedResult = (
       <div>
	<div className="wrapper">
	<div className="container">
		<h1 className="login__header">Waiting..... Maybe you need to try again <a href="/">here</a></h1>
		<hr />
		</div>
		</div>
		</div>
		);
    } else {
      renderedResult = (
       <div>
	<div className="wrapper">
	<div className="container">
		<h1>Welcome, If ya just signed up then go ahead and sign in</h1>
		<fieldset>
			<input type="text" className = "form-control" placeholder="Username" ref = "email" name = "email" />
			<input type="password" className = "form-control" placeholder="Password" ref = "password" name = "password" />
			<button type="submit" id="login-button" to = "dashboard" onClick={this._onLoginSubmit}>Login</button>
		</fieldset>
		<hr/>

<p>Need an account? <Link to="signup">Signup</Link></p>

	</div>
</div>
</div>
);
    }}
  console.log(this.state.user.get('authenticated'));
  return (
    <div>
	{renderedResult}
	</div>
			);
	}
}
Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
