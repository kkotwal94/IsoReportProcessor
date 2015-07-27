import React from 'react';
import 'scss/main.scss';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
import ReportView from './ReportView';
import {Link} from 'react-router';

export default class ReportsToComplete extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.allReports = [];
  this.state.notComplete = [];
	}

componentDidMount() {
  ReportsActions.getMyReports();
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
  this.setState({allReports: updatedList});
}
  _dateSearch = (event) => {
    let updatedList = this.state.duplicate;
    updatedList = updatedList.filter(function(item) {
  return item.date.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allReports: updatedList});
  }
  _authorSearch = (event) => {
    let updatedList = this.state.duplicate;
    updatedList = updatedList.filter(function(item) {
  return item.author[0].toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({allReports: updatedList});
  }

_onChanges = () => {
  this.setState({
      allReports: ReportsStore.getState().notComplete,
      duplicate: ReportsStore.getState().notComplete
    });
}

render() {
  let allReports = this.state.allReports;
  console.log(this.state.allReports);
  let duplicate = this.state.duplicate;
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
  return (
            <div>
        <main>
        <h1>My Incomplete Reports</h1>
        <div className = "AEmp">
        <div className = "searchTable">
        {searchByTitle}
        {searchByDate}
        {searchByAuthor}
		</div>
        <table className ="table table-bordered table-hover data-toggle table-striped">
        <thead>
        <tr>
        <th>Title</th><th>Date</th> <th>Author</th> <th>View/Edit</th> <th>Delete</th>
        </tr>
        </thead>
          <tbody>
          {allReports.map((report) =>
            <tr key={'report' + report._id}>
              <td>{report.title}</td> <td>{report.date}</td> <td>{report.authors}</td> <td><Link to ='singlereports' params ={{id: report._id}}>View/Edit</Link></td> <td><a>Delete</a></td>
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
        </div>

         </div>
        </main>
      </div>
    );
}  
}


