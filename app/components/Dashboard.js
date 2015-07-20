import React from 'react';
import {Link} from 'react-router';
import 'scss/main.scss';
export default class Dashboard extends React.Component {
render() {
    return (
      <div>
        <main>
        <div className="body">
          <div className="containers">
  <div className="spacer">
   <Link to="addReport">
    <a className="wide redgay">
    <i className="fa fa-file-pdf-o"></i>
      <h2>Create a Report</h2>
    </a>
    </Link>
    <Link to="reports">
    <a className="wide redgay">
    <i className="fa fa-pencil-square-o"></i>
      <h2>View or Edit My Reports</h2>
    </a>
    </Link>
    <Link to="MyEmployees">
    <a className="box blue">
    <i className="fa fa-user"></i>
      <h2>View My Employees</h2>
    </a>
    </Link>
    <Link to="AllEmployees">
    <a className="box blue">
    <i className="fa fa-users"></i>
      <h2>View All Employees</h2>
    </a>
    </Link>
    </div>
</div>

</div>

<div className="body">
          <div className="containers">
  <div className="spacer">
    <Link to="Profile">
    <a className="wide orange">
    <i className="fa fa-cog"></i>
      <h2>View or Update my profile</h2>
    </a>
    </Link>
    <Link to="reportstocomplete">
    <a className="wide redgay">
    <i className="fa fa-exclamation-triangle"></i>
      <h2>Reports Assigned to Complete!</h2>
    </a>
    </Link>
    <Link to="readme">
    <a className="wide bluefish">
    <i className="fa fa-newspaper-o"></i>
      <h2>README</h2>
    </a>
    </Link>
    </div>
</div>


          <div className="containers">
  <div className="spacer">
    <Link to="statistics">
    <a className="box lime">
    <i className="fa fa-bar-chart"></i>
      <h2>Statistics</h2>
    </a>
    </Link>
    <a href ="https://github.com/kkotwal94/IsoReportProcessor" target = "_blank"className="box bluefish">
    <i className="fa fa-github"></i>
      <h2>Github</h2>
    </a>
    <a href ="/logout" className="box redgay">
    <i className="fa fa-sign-out"></i>
      <h2>Logout</h2>
    </a>
    </div>
</div>

</div>
        </main>
      </div>
    );
  }
}

