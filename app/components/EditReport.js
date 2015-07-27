import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class EditReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.singleReport = [];
  this.state.link = window.location.href;
	}

componentDidMount() {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-2];
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

_onCreateReport = () => {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-2];
  const title = React.findDOMNode(this.refs.title).value;
  const date = React.findDOMNode(this.refs.date).value;
  const body = React.findDOMNode(this.refs.body).value;
  const id = state;
  ReportsActions.editReport({
        title: title,
        date: date,
        body: body,
        id: id
    });
}

render() {
  let singleReport = this.state.singleReport;
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-2];
  return(
    <div>
    <main>
    <h1>Hello im trying to edit</h1>
    <fieldset className = "fieldSet2">
          <input type = "text" placeholder = {singleReport.title} ref = "title"/>
          <input type = "text" placeholder = {singleReport.date} ref = "date"/>
          <textarea className = "ckeditor" id = "ckedit" ref = "body" defaultValue = {singleReport.body}></textarea>
          <Link to="singlereports" params = {{id: state}}><button type="submit" rows = "5" cols = "5" className ="superButton" onClick={this._onCreateReport}>Edit Report</button></Link>
          </fieldset>
          <div className ="toMyEmployees2">
        <div className="containers1">
  <div className="spacer">
   <Link to="AllEmployees">
    <a className="wide blue">
    <i className="fa fa-users"></i>
      <h2>View All Employees</h2>
    </a>
    </Link>
    </div>
    </div>
    <div className ="toMyEmployees3">
        <div className="containers1">
  <div className="spacer">
   <Link to="dashboard">
    <a className="wide redgay">
    <i className="fa fa-tachometer"></i>
      <h2>Dashboard</h2>
    </a>
    </Link>
    </div>
    </div>
        </div>
        </div>
    </main>
    </div>
    );
}
}