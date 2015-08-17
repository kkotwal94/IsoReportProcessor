import React from 'react';
import {Link} from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';

export default class NewReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.isWaiting;
  this.state.reports = [{_id : '1234'}];
	}

componentDidMount() {
ReportsActions.getMyReports();
ReportsStore.listen(this._onChange);
CKEDITOR.replace( 'ckedits', {
  allowedContent : true,      
  pasteFromWordRemoveFontStyles : false,
  pasteFromWordRemoveStyles : false
  });
console.log(CKEDITOR.instances);
console.log("called");
	}

componentWillUnmount() {
ReportsStore.unlisten(this._onChange);
	}

 _onChange = () => {
    this.setState({
      isWaiting: ReportsStore.getState().isWaiting,
      reports: ReportsStore.getState().globalreports,
    });
  }

_onCreateReport = (event) => {
  for ( var instance in CKEDITOR.instances )
        CKEDITOR.instances[instance].updateElement();
  const title = React.findDOMNode(this.refs.title).value;
  const date = React.findDOMNode(this.refs.date).value;
  const body = React.findDOMNode(this.refs.body).value;
  ReportsActions.addNewReport({
        title: title,
        date: date,
        body: body
    });
  
  ReportsActions.getGlobalReports();
}

_change = () => {
  this.setState({
    isWaiting : "blah"
  });
//CKEDITOR.replaceAll();
  /*CKEDITOR.replace( 'ckedits', {
  allowedContent : true,      
  pasteFromWordRemoveFontStyles : false,
  pasteFromWordRemoveStyles : false
  });*/
}

render() {
  //console.log(treecycle(2));
  let reports = this.state.reports;
  let route = reports[0];

  if (route == undefined) {
    route = 123;
  }
  else{
    route = route._id;
  }
  //console.log(route);
  //console.log(reports);
  let renderedResult;
  //console.log(this.state.isWaiting);
  if(this.state.isWaiting == true) {
    renderedResult = (<h1 className = "fieldSet2">Currently creating Document.....</h1>);
  }

  else{
    if(this.state.isWaiting == false) {
    renderedResult = (<div className = "fieldSet2"><h1>Done creating document</h1>
      <div className="containers1">
  <div className="spacer">
   <Link to="singlereports" params = {{id:route}}>
    <a className="wide redgay">
    <i className="fa fa-file-text-o"></i>
      <h2>View Created Report</h2>
    </a>
    </Link>
    </div>
    </div>

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
   <a className="wide lime" onClick = {this._change} href = "/newreport">
    <i className="fa fa-file-o"></i>
      <h2>Create another report</h2>
    </a>
  
    </div>
    </div>
    </div>);
    }
     else {
          renderedResult = (<fieldset className = "fieldSet2">
          <input type = "text" placeholder = "Give the document a title" ref = "title"/>
          <input type = "text" placeholder = "Enter date here.." ref = "date"/>
          <textarea className = "ckedits" name = "ckedits" id = "ckedits" ref = "body" defaultValue = "Enter Body Here"></textarea>
          <button type="submit" rows = "5" cols = "5" className ="superButton" onClick={this._onCreateReport}>Add Report</button>
          </fieldset>);
   }
 }
    return (
      <div>
        <main>
          <h1>Currently trying to add a NEW report</h1>
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
   <Link to="report">
    <a className="wide redgay">
    <i className="fa fa-pencil-square-o"></i>
      <h2>View Or Edit Reports</h2>
    </a>
    </Link>
    </div>
    </div>
        </div>

         <div className ="toMyEmployees5">
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
