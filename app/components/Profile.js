import React from 'react';
import 'scss/main.scss';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import {Link} from 'react-router';
export default class Profile extends React.Component {

constructor(props) {
    super(props);
    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserActions.fetchUserProfile();
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user,
      userProfile: UserStore.getState().userProfile.profile,
      userProfileFull: UserStore.getState().userProfile
    });
  }

  _onProfileUpdate = () => {
    const firstName = React.findDOMNode(this.refs.firstName).value;
    const lastName = React.findDOMNode(this.refs.lastName).value;
    const dob = React.findDOMNode(this.refs.dob).value;
    const department = React.findDOMNode(this.refs.department).value;
    const position = React.findDOMNode(this.refs.position).value;

    UserActions.updateMyProfile({
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      department: department,
      position: position
    });
  }

render() {
  let userProf = this.state.userProfile;
  return (
      <div>
        <main>
        <div className = "masterDiv">
        <div className = "userInfo">
        <div className = "data">
        <ul className = "uProfile">
          <li>{'FirstName: ' + userProf.firstName}</li>
          <li>{'LastName: ' + userProf.lastName}</li>
          <li>{'Date Of Birth: ' + userProf.dob}</li>
          <li>{'Department: ' + userProf.department}</li>
          <li>{'Position: ' + userProf.position}</li>
        </ul>
        </div>
        </div>
        <div className = "updateInfo">
        <hr/>
        <fieldset className = "fieldSet">
        <h1>Update Info Here</h1>
        <input type="text" className = "form-control" placeholder="First Name..." ref = "firstName" name = "email" />
        <input type="text" className = "form-control" placeholder="Last Name" ref = "lastName" name = "lastName" />
        <input type="text" className = "form-control" placeholder="Age(MM/DD/YYYY)" ref = "dob" name = "dob" />
        <input type="text" className = "form-control" placeholder="Department" ref = "department" name = "department" />
        <input type="text" className = "form-control" placeholder="Position" ref = "position" name = "position" />
        <button type="submit" className ="superButton" onClick={this._onProfileUpdate}>Update</button>
        </fieldset>
        </div>
        <div className ="toMyEmployees">
        <div className="containers1">
  <div className="spacer">
   <Link to="MyEmployees">
    <a className="wide blue">
    <i className="fa fa-user"></i>
      <h2>View My Employees</h2>
    </a>
    </Link>
    </div>
    </div>
        </div>
        <div className = "toMyReports">
    <Link to="reports">
    <a className="wide redgay">
    <i className="fa fa-pencil-square-o"></i>
      <h2>View or Edit My Reports</h2>
    </a>
    </Link>
    </div>
        </div>
        </main>
      </div>
    );
}
}
