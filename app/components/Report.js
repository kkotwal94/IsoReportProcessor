import React from 'react';
import 'scss/main.scss';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
import ReportView from './ReportView';
import CompleteButton from './CompleteButton';
import Dropdown from './Dropdown';
import Icon from './Icon';
import {Link} from 'react-router';
export default class Report extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.allReports = [];
  this.state.globalReports = [];
  this.state.userProfile = [];
	}

componentDidMount() {
  ReportsActions.getGlobalReports();
  ReportsStore.listen(this._onChanges);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChanges);
	}

_titleSearch = (event) => {
  let updatedList = this.state.duplicate;
  updatedList = updatedList.filter(function(item) {
  return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
  this.setState({globalReports: updatedList});
}
  _dateSearch = (event) => {
    let updatedList = this.state.duplicate;
    updatedList = updatedList.filter(function(item) {
  return item.date.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({globalReports: updatedList});
  }
  _authorSearch = (event) => {
    let updatedList = this.state.duplicate;
    updatedList = updatedList.filter(function(item) {
  return item.authors[0].toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({globalReports: updatedList});
  }

_onChanges = () => {
  this.setState({
      allReports: ReportsStore.getState().reports,
      globalReports: ReportsStore.getState().globalreports,
      duplicate: ReportsStore.getState().globalreports,
      userProfile: ReportsStore.getState().userProfile,
      title: ReportsStore.getState().userProfile.title,
      joinList: ReportsStore.getState().userProfile.joinList,
      test: ReportsStore.getState().test,
      selected: ReportsStore.getState().selected
    });
}

_onSetTitle = () => {
  const title = React.findDOMNode(this.refs.title).value;
  ReportsActions.setTitle({title: title});
}

_onRemove = () => {
  if(confirm("Are you sure you want to delete this from the join/merge table?")) {
  ReportsActions.removeJoinDoc({id:this.state.selected});
  this.setState({
  selected : {title: "Select a item"}
  });
}
}

_onRemoveAll = () => {
  if(confirm("Are you sure you want to clear your join/merge table?")) {
    ReportsActions.removeAllJoinDoc();
  }
}

_onJoin = () => {
  if(confirm("Are you sure you want to create this merged document?")) {
    //setTimeout(function() {ReportsActions.removeAllJoinDoc();}, 50000);
    ReportsActions.join();
  }
}



render() {
  let allReports = this.state.allReports;
  let duplicate = this.state.duplicate;
  let global = this.state.globalReports;
  let userProfile = this.state.userProfile;
  let joinList = this.state.joinList;
  let title = this.state.title;
  console.log(this.state.test);
  let icon = "fa fa-plus";
  if(global == undefined) {
     global = [{title: 'none', profile: {firstName: 'yup', lastName: 'yup'}}];
  }

  if(joinList == undefined) {
     joinList = [{title: 'none', profile: {firstName: 'yup', lastName: 'yup'}}];
  }
  else {
    joinList = this.state.joinList;
  }
  if (title == undefined) {
    title = "Default";
  }
  let dat = this.state.selected;
  let init = this.state.selected.title;
  console.log(init);
  console.log(dat);
  let searchByTitle = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-6" onChange = {this._titleSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Title!</span>
					</label>
					</span>);
  let searchByDate = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-0" onChange = {this._dateSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Date!</span>
					</label>
					</span>);
  let searchByAuthor = (<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-1" onChange = {this._authorSearch}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Author!</span>
					</label>
					</span>);
  let titleInput = (<span className="input input--hoshi">
          <input className="input__field input__field--hoshi" type="text" id="input-12" ref="title"/>
          <label className="input__label input__label--hoshi input__label--hoshi-color-3" htmlFor="input-44">
            <span className="input__label-content input__label-content--hoshi">Insert Title here!</span>
          </label>
          </span>);
  return (
            <div>
        <main>
        <h1>My Reports</h1>
        <div className = "AEmp">
        <div className = "searchTable">
        {searchByTitle}
        {searchByDate}
        {searchByAuthor}
		</div>
        <table className ="table table-bordered table-hover data-toggle table-striped">
        <thead>
        <tr>
        <th>Options</th><th>Title</th><th>Date</th> <th>Author</th> <th>View/Edit</th> <th>Set Complete/Incomplete</th>
        </tr>
        </thead>
          <tbody>
          {global.map((report) =>
            <tr key={'report' + report._id}>
              <td><Icon isList = {report.isListed} id = {report._id}/></td><td>{" " + report.title}</td> <td>{report.date}</td> <td>{report.authors}</td> <td><Link to ='singlereports' params ={{id: report._id}}>View/Edit</Link></td> <td><CompleteButton buttonText = {report.buttonText} buttonClass = {report.buttonClass} id = {report._id}/></td>
            </tr>
          )}
          </tbody>
          </table>
          </div>
<div className ="toMyEmployees2">
        <div className="containers1">
  <div className="spacer">
   <Link to="newreport">
    <a className="wide redgay">
    <i className="fa fa-file"></i>
      <h2>Create a completely new report</h2>
    </a>
    </Link>
    </div>
    </div>
    <div className ="toMyEmployees3">
        <div className="containers1">
  <div className="spacer">
   <Link to="templatereport">
    <a className="wide redgay">
    <i className="fa fa-file-text"></i>
      <h2>Create a template</h2>
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
        <div className ="toMyEmployees4">
        <div className ="joinTool">
        <h1>{title}</h1>
        {titleInput}
        <div className ="joining">
        <button type="submit" className ="btn btn-lg btn-primary" onClick={this._onSetTitle}>Set Joined Report Title</button>
        </div>
        <div className = "joinings">
         <Dropdown list = {joinList} selected={init} />
         </div>
         <div className = "joinings2">
         <button className = "btn btn-lg btn-danger" onClick={this._onRemove}>Remove item</button>
         </div>
         <div className = "joinings2">
         <button className = "btn btn-lg btn-danger" onClick={this._onRemoveAll}>Remove all</button>
         </div>
         <div className = "joinings2">
         <button className ="btn btn-lg btn-danger" onClick = {this._onJoin}>Merge documents</button>
         </div>
        </div>
        </div>
        </div>
         </div>
         </main>
      </div>
    );
}  
}
