import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
let finalData = [];
export default class ReportView extends React.Component {


constructor(props, context) {
  super(props, context);
  this.state = ReportsStore.getState();
  this.state.singleReport = [{subreport :["Hello"]}];
  this.state.fullView = [];
	}
 static contextTypes = {
        router: React.PropTypes.func.isRequired
    }
componentDidMount() {
  let state = this.context.router.getCurrentParams().id;
  console.log(state);
 //this._fullView(this.state.singleReport);
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
  let id = this.context.router.getCurrentParams().id;
  let location = '/reports';
  console.log(id);
  ReportsActions.removeReport({
    id : id
  });
  setTimeout(function() {window.location.href = '/reportsall';}, 1);
  }
}
render() {
  console.log(this.context.router.getCurrentParams().id);
	let state = this.context.router.getCurrentParams().id;
  let reports = this.state.singleReport;
  let fr = "report"
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
        {
        reports.map((report => {
         if(report._id == undefined || null) {
            report._id = "123";
         }
         })
        )}
        </ul>
        <ul>
        {
        reports.map((report => 
        <div className = "AEmp2">
        <div className = "searchTable">
          <h1>{report.title}</h1>
          <h1>{"Author: " + report.authors}</h1>
          <Link to = "editreports" params ={{id: report._id}}><div className = "EditButton redgay">Edit</div></Link>
        </div>
        <div id = "editable">
        <div dangerouslySetInnerHTML={{__html: report.body}} />
        </div>
        </div>
        
        ))}
        </ul>
        </main>
      </div>
    );
  }
}