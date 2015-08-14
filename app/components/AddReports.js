import React from 'react';
import {Link} from 'react-router';
export default class AddReports extends React.Component {
render() {
    return (
      <div>
        <main>
          <div className="body">
          <div className="containers">
  <div className="spacer">
   <Link to="newreport">
    <a className="wide redgay">
    <i className="fa fa-file"></i>
      <h2>Create a completely new Report</h2>
    </a>
    </Link>
    <Link to="assignReport">
    <a className="wide redgay">
    <i className="fa fa-level-down"></i>
      <h2>Assign Report to a employee</h2>
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
