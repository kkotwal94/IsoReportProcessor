import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Dropdown from 'components/Dropdown';
export default class AssignReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state = UserStore.getState();
  this.state.singleReport = [];
  this.state.isWaiting;
	}

componentDidMount() {
  UserActions.buttonAction();
  ReportsActions.getMyReports();
  ReportsStore.listen(this._onChanges);
  UserStore.listen(this._onUserChanges);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChanges);
  UserStore.unlisten(this._onUserChanges);
	}

_onChanges = () => {
  this.setState({
      singleReport: ReportsStore.getState().singleReport,
      duplicate: ReportsStore.getState().singleReport,
      reports: ReportsStore.getState().reports,
      isWaiting: ReportsStore.getState().isWaiting3
    });
}

_onUserChanges = () => {
  this.setState({
      allUsers: UserStore.getState().allUsers,
      search: UserStore.getState().myLackeys,
      user: UserStore.getState().user,
      userProfile: UserStore.getState().userProfile.profile,
      userProfileFull: UserStore.getState().userProfile,
      myEmployees2: UserStore.getState().lackeys,
      myId: UserStore.getState().userProfile._id,
      myEmployees: UserStore.getState().myLackeys,
      selectedId: UserStore.getState().selectedData
    });
}

_change = () => {
  this.setState({
    isWaiting : "blah"
  });
}

_onCreateReport = () => {
  const title = React.findDOMNode(this.refs.title).value;
  const date = React.findDOMNode(this.refs.date).value;
  const body = React.findDOMNode(this.refs.body).value;
  ReportsActions.addAssignedReport({
        title: title,
        date: date,
        body: body,
        id: this.state.selectedId
    });
  ReportsActions.getMyReports();
}


render() {
   let singleReport = this.state.singleReport;
  let state = this.state.link;
  let myEmployees = this.state.myEmployees;
 let wait = this.state.isWaiting;
 console.log(wait);
  let initial = this.state.selectedId;
  if(initial == undefined) {
    initial = [{email: 'none', profile: {firstName: 'yup', lastName: 'yup'}}];
  }
  else {
    initial = this.state.selectedId;
  }

  if (myEmployees == undefined) {
    myEmployees = [{email: 'none', profile: {firstName: 'yup', lastName: 'yup'}}];
  }
  else {
    myEmployees = this.state.myEmployees;
  }
  console.log(initial); 
  let renderedResult;
  if(this.state.isWaiting == true) {
    renderedResult = (<h1 className = "fieldSet2">Currently creating Document.....</h1>);
  }
  else {
    if(this.state.isWaiting == false) {
    renderedResult = (<div className = "fieldSet2"><h1>Done creating and assigning document</h1>
    <div className="containers1">
  <div className="spacer">
   <Link to="report">
    <a className="wide blue">
    <i className="fa fa-file"></i>
      <h2>View My Reports</h2>
    </a>
    </Link>
    </div>
    </div>

    <div className="containers1">
  <div className="spacer">
   <a className="wide lime" onClick = {this._change}>
    <i className="fa fa-file-o"></i>
      <h2>Create another report</h2>
    </a>
  
    </div>
    </div>
    </div>);
    }
    else {
      renderedResult = ( <fieldset className = "fieldSet2">
          <input type = "text" placeholder = "Report Title" ref = "title"/>
          <input type = "text" placeholder = "Report Date" ref = "date"/>
          <textarea className = "ckeditor" id = "ckedit" ref = "body" defaultValue = "Enter subreport here"></textarea>
          <Dropdown list = {myEmployees} selected={initial} />
          <button type="submit" rows = "5" cols = "5" className ="superButton" onClick={this._onCreateReport}>Add Subreport</button>
          </fieldset>);
    }
  }
  return(
    <div>
    <main>
    <h1>Assigning a Report</h1>
     {renderedResult}
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
    )
}
}
