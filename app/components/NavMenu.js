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
  </header>
  <nav className="cd-3d-nav-container">
    <ul className="cd-3d-nav">
      <li className="cd-selected">
        <a>Dashboard</a>
      </li>

      <li>
        <a>Reports</a>
      </li>

      <li>
        <a>Employees</a>
      </li>

      <li>
        <Link to="logout">Logout</Link>
      </li>

      <li>
        <a>Create New Report</a>
      </li>
    </ul>

    <span className="cd-marker color-1"></span>
  </nav>
        </div>
		);
	}

}
