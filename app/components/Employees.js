import React from 'react';
import 'scss/main.scss';
import {Link} from 'react-router';
export default class Employees extends React.Component {
render() {
    return (
      <div>
        <main>
          <div className="body">
          <div className="containers">
  <div className="spacer">
   <Link to="MyEmployees">
    <a className="wide blue">
    <i className="fa fa-user"></i>
      <h2>View My Employees</h2>
    </a>
    </Link>
    <Link to="AllEmployees">
    <a className="wide blue">
    <i className="fa fa-users"></i>
      <h2>View All Employees</h2>
    </a>
    </Link>
    <Link to="dashboard">
    <a className="wide redgay">
    <i className="fa fa-tachometer"></i>
      <h2>Head back to dashboard</h2>
    </a>
    </Link>
    </div>
    </div>
    </div>
        </main>
      </div>
    );
  }
}
