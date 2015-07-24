import React from 'react';
import {Link} from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class NewReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
	}

componentDidMount() {

	}

componentWillUnmount() {

	}

_onCreateReport = () => {
  const title = React.findDOMNode(this.refs.title).value;
  const date = React.findDOMNode(this.refs.date).value;
  const body = React.findDOMNode(this.refs.body).value;
  ReportsActions.addNewReport({
        title: title,
        date: date,
        body: body
    });
}

render() {
    return (
      <div>
        <main>
          <h1>Currently trying to add a NEW report</h1>
          <fieldset className = "fieldSet2">
          <input type = "text" placeholder = "Give the document a title" ref = "title"/>
          <input type = "text" placeholder = "Enter date here.." ref = "date"/>
          <textarea className = "ckeditor" id = "ckedit" ref = "body" defaultValue = "Enter Body Here"></textarea>
          <Link to="reports"><button type="submit" rows = "5" cols = "5" className ="superButton" onClick={this._onCreateReport}>Add Report</button></Link>
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
