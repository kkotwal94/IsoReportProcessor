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

render() {
  let userProf = this.state.userProfile;
  return (
      <div>
        <main>
        <div className = "masterDiv">
        <div className = "userInfo">
        <div className = "data">
        <ul className = "uProfile">
          <li>{userProf.firstName}</li>
          <li>{userProf.lastName}</li>
          <li>{userProf.dob}</li>
          <li>{userProf.department}</li>
          <li>{userProf.position}</li>
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
        <button type="submit" className ="superButton">Update</button>
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
        </div>
        </main>
      </div>
    );
}
}
