import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
export default class EmployeesButton extends React.Component {
constructor(props: {
	id: String;
	buttonText: String;
	buttonClass: String;
}) {
  super(props);
  this.state = UserStore.getState();
}

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      allUsers: UserStore.getState().allUsers,
      search: UserStore.getState().allUsers,
      user: UserStore.getState().user,
      userProfile: UserStore.getState().userProfile.profile,
      userProfileFull: UserStore.getState().userProfile,
      myEmployees: UserStore.getState().lackeys,
      myId: UserStore.getState().userProfile._id
    });
  }

render() {
  let id = this.props.id;
  let buttonClass = this.props.buttonClass;
  let buttonText = this.props.buttonText;
  return (
    <div>
      <button onClick = {function(event) { let data = id; UserActions.handleEmployeeUpdate({data: data}); }} className ={buttonClass}>{buttonText}</button>
    </div>
		);
}
}
