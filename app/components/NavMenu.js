import React from 'react';
import {Link} from 'react-router';
import UserStore from 'stores/UserStore';

export default class NavMenu extends React.Component {
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
      user: UserStore.getState().user,
      userProfile: UserStore.getState().userProfile
    });
  }
  render() {
    console.log(this.state.user.get('authenticated'));
    console.log(this.state.user);
    let userProf = this.state.userProfile;
    return (
        <div>
          <header className="cd-header">
    <a className="cd-3d-nav-trigger">
      Menu
      <span></span>
    </a>
    
  </header>
  <nav className="cd-3d-nav-container">
    <ul className="cd-3d-nav">
      <li className="cd-selected">
        <Link to="dashboard">Dashboard</Link>
      </li>

      <li>
        <Link to="report">Reports</Link>
      </li>

      <li>
        <Link to="employees">Employees</Link>
      </li>

      <li>
        <a href="/logout">Logout</a>
      </li>

      <li>
        <Link to="addReport">Create New Report</Link>
      </li>
    </ul>

    <span className="cd-marker color-1"></span>
  </nav>
        </div>
		);
  }

}

/**
back button
<a className="cd-logo">
    </a>
    <a>
    {userProf.email}
    </a>
**/