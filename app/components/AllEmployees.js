import React from 'react';
import 'scss/main.scss';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import {Link} from 'react-router';
import EmployeesButton from './aEmployeesButton';
export default class AllEmployees extends React.Component {
   constructor(props) {
    super(props);
    this.state = UserStore.getState();
    // this.state.allUsers = [];
  }

  componentDidMount() {
    UserActions.fetchUserProfile();
    UserActions.buttonAction();
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
  _emailSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.email.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }
  _firstNameSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.profile.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }
  _lastNameSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.profile.lastName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }
  _dobSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.profile.dob.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }
  _departmentSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.profile.department.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }
  _positionSearch = (event) => {
    let updatedList = this.state.search;
    updatedList = updatedList.filter(function(item) {
  return item.profile.position.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allUsers: updatedList});
  }

  _assignOrunassign = (data, event) => {
    console.log(event);
  }

render() {
  let allUsers = this.state.allUsers;
  let allEmployees = this.state.myEmployees;
  console.log(allEmployees);
  console.log(allUsers);
  console.log(this.state.userProfileFull);
  let searchByEmail = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-6" onChange = {this._emailSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Email!</span>
					</label>
					</span>);
  let searchByfirstName = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-0" onChange = {this._firstNameSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by First Name!</span>
					</label>
					</span>);
  let searchBylastName = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-1" onChange = {this._lastNameSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Last Name!</span>
					</label>
					</span>);
  let searchBydob = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-2" onChange = {this._dobSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by DOB!</span>
					</label>
					</span>);
  let searchByDepartment = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this._departmentSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Department!</span>
					</label>
					</span>);
  let searchByPosition = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-3" onChange = {this._positionSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Position!</span>
					</label>
					</span>);

  return (
      <div>
        <main>
        <h1>All Employees</h1>
        <div className = "AEmp">
        <div className = "searchTable">
        {searchByEmail}
        {searchByfirstName}
        {searchBylastName}
        {searchBydob}
        {searchByDepartment}
        {searchByPosition}
		</div>
        <table className ="table table-bordered table-hover data-toggle table-striped">
        <thead>
        <tr>
        <th>Email</th><th>First Name</th> <th>Last Name</th> <th>DoB</th> <th> Department</th> <th>Position</th> <th>Assign as your Employee</th>
        </tr>
        </thead>
          <tbody>
          {allUsers.map((user) =>
            <tr key={'user' + user._id}>
              <td>{user.email}</td> <td>{user.profile.firstName}</td> <td>{user.profile.lastName}</td> <td>{user.profile.dob}</td> <td>{user.profile.department}</td> <td>{user.profile.department}</td> <td><EmployeesButton buttonClass = {user.buttonClass} buttonText = {user.buttonText} id ={user._id}/></td>
            </tr>
          )}</tbody>
          </table>
          </div>
<div className ="toMyEmployees2">
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
