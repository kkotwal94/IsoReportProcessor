import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Dropdown from 'components/Dropdown';
export default class AddSubReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state = UserStore.getState();
  this.state.singleReport = [];
  this.state.link = window.location.href;
	}

componentDidMount() {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-2];
  ReportsActions.getSoloReport(state);
  UserActions.buttonAction();
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
      myEmployees: UserStore.getState().myLackeys
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

_onCreateReport = (id) => {
  let state = this.state.link; 
  console.log(this.state.selectedId);
  state = state.split('/');
  state = state[state.length-2];
  const title = React.findDOMNode(this.refs.title).value;
  const date = React.findDOMNode(this.refs.date).value;
  const body = React.findDOMNode(this.refs.body).value;
  const masterform = state;
  const user = user;
  ReportsActions.addSubReport({
        title: title,
        date: date,
        body: body,
        id: id
    });
}

render() {
  let singleReport = this.state.singleReport;
  let state = this.state.link;
  let myEmployees = this.state.myEmployees;
  console.log(this.state.selectedId);
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
  state = state.split('/');
  state = state[state.length-2];
  return(
    <div>
    <main>
    <h1>Adding a subreport</h1>
    <fieldset className = "fieldSet2">
          <input type = "text" placeholder = "Sub Report Title" ref = "title"/>
          <input type = "text" placeholder = "Sub Report Data" ref = "date"/>
          <textarea className = "ckeditor" id = "ckedit" ref = "body" defaultValue = "Enter subreport here"></textarea>
          <Dropdown list = {myEmployees} selected={initial} />
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
