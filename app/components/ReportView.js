import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class ReportView extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.singleReport = [];
  this.state.link = window.location.href;
	}

componentDidMount() {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-1];
  ReportsActions.getSoloReport(state);
  ReportsStore.listen(this._onChanges);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChanges);
	}

_onChanges = () => {
  this.setState({
      singleReport: ReportsStore.getState().singleReport,
      duplicate: ReportsStore.getState().singleReport
    });
}

render() {
	let state = this.state.link;
	state = state.split('/');
	state = state[state.length - 1];
    let report = this.state.singleReport;
	console.log(report);
    return (
      <div>
        <main>
        <div className = "AEmp">
        <div className = "searchTable">
          <h1>{report.title}</h1>
          <h1>{"Author: " + report.authors}</h1>
        </div>
        {report.body}
        </div>
        <div className ="toMyEmployees2">
        <div className="containers1">
  <div className="spacer">
   <Link to="editreports" params = {{id: state}}>
    <a className="wide orange">
    <i className="fa fa-pencil-square-o"></i>
      <h2>Edit this report</h2>
    </a>
    </Link>
    </div>
    </div>
    <div className ="toMyEmployees3">
        <div className="containers1">
  <div className="spacer">
   <Link to="reports">
    <a className="wide redgay">
    <i className="fa fa-times"></i>
      <h2>Delete this Report</h2>
    </a>
    </Link>
    </div>
    </div>
    <div className ="toMyEmployees3">
        <div className="containers1">
  <div className="spacer">
   <Link to="addsubreport" params ={{id: state}}>
    <a className="wide lime">
    <i className="fa fa-plus-square"></i>
      <h2>Add a Subreport</h2>
    </a>
    </Link>
    </div>
    </div>
        </div>
        <div className ="toMyEmployees4">
        <div className="containers1">
  <div className="spacer">
   <Link to="dashboard">
    <a className="wide blue">
    <i className="fa fa-print"></i>
      <h2>Print this report</h2>
    </a>
    </Link>
    </div>
    </div>
        </div>
        </div>

         </div>
        </main>
      </div>
    );
  }
}