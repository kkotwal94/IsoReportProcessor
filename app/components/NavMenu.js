import React from 'react';
import {Link} from 'react-router';
export default class NavMenu extends React.Component {
	render() {
  return (
        <div>
          <header className="cd-header">
    <a className="cd-3d-nav-trigger">
      Menu
      <span></span>
    </a>
    <a className="cd-logo">
    </a>
  </header>
  <nav className="cd-3d-nav-container">
    <ul className="cd-3d-nav">
      <li className="cd-selected">
        <Link to="dashboard">Dashboard</Link>
      </li>

      <li>
        <Link to="reports">Reports</Link>
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
