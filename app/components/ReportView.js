import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
let finalData = [];
var treecycle = data => {
  console.log(data);
};

function treeCycle(data) {
  console.log(data);
}
export default class ReportView extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.singleReport = [{subreport :["Hello"]}];
  this.state.link = window.location.href;
  this.state.fullView = [];
	}

componentDidMount() {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-1];
  console.log(state);
 //this._fullView(this.state.singleReport);
  ReportsActions.getSoloReport(state);
  this._cycle;
  ReportsStore.listen(this._onChanges);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChanges);
	}

_cycle = () => {
  treecycle(this.state.singleReport);
}

_onChanges = () => {
  this.setState({
      singleReport: ReportsStore.getState().singleReport,
      duplicate: ReportsStore.getState().singleReport
    });
}

_fullView = (data) => {
  if(data.subreport.length != 0) {
      for(let i = 0; i < data.subreport.length; i++) {
        this.state.finalView.push(data.subreport[i]);
        if(data.subreport[i].subreport.length != 0) {
             this._fullView(data.subreport[i]);
        }
      }
    }
  }


_onDelete = () => {
  if(confirm("Are you sure you want to delete this report?")) {
  let id = this.state.link;
  let location = '/reports';
  id = id.split('/');
  id = id[id.length-1];
  console.log(id);
  ReportsActions.removeReport({
    id : id
  });
  setTimeout(function() {window.location.href = '/reportsall';}, 1);
  }
}
render() {
	let state = this.state.link;
	state = state.split('/');
	state = state[state.length - 1];
  let reports = this.state.singleReport;
	console.log(reports);
    return (
      <div>
        <main>
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
   <a className="wide redgay" onClick = {this._onDelete}>
    <i className="fa fa-times"></i>
      <h2>Delete this Report</h2>
    </a>
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
        <ul>
        {reports.map((report) =>
        <div className = "AEmp">
        <div className = "searchTable">
          <h1>{report.title}</h1>
          <h1>{"Author: " + report.authors}</h1>
        </div>
        {report.body}
        </div>
        )}
        </ul>
        </main>
      </div>
    );
  }
}