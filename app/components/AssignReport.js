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
  ReportsActions.addSubReport({
        title: title,
        date: date,
        body: body,
        id: this.state.selectedId
    });
}


render() {
  return(
    <div>
    <main>
    <h1>Hello im trying to Assign a report</h1>
    </main>
    </div>
    )
}
}
