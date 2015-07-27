import React from 'react';
import { Route } from 'react-router';
import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Dashboard from 'components/Dashboard';
import Report from 'components/Report';
import Employees from 'components/Employees';
import AddReports from 'components/AddReports';
import AllEmployees from 'components/AllEmployees';
import MyEmployees from 'components/MyEmployees';
import Profile from 'components/Profile';
import ReportsToComplete from 'components/ReportsToComplete';
import Readme from 'components/Readme';
import Stats from 'components/Stats';
import NewReport from 'components/NewReport';
import TemplateReport from 'components/TemplateReport';
import ReportView from 'components/ReportView';
import EditReport from 'components/EditReport';
import AssignReport from 'components/AssignReport';
import AssignReported from 'components/AssignReported';
import AddSubreport from 'components/AddSubreport';
import { history } from 'react-router';

const routes = (
<Route>
 <Route name ="dash" path="/dashboard" handler={App}>
    <Route name ="dashboard" path="/dashboard" handler={Dashboard}/>
    
    
    <Route name ="assignReport" path="/user" handler={AssignReport}/>
    <Route name ="assignReported" path="/user/:id" handler={AssignReported}/>
    <Route name ="employees" path="/employees" handler={Employees}/>
    <Route name ="reports" path="/reports" handler={Report}/>
      <Route name ="singlereports" path="/reports/:id" handler={ReportView}/>
      <Route name ="addsubreport" path="/reports/:id/addsubreport" handler={AddSubreport}/>
      <Route name ="editreports" path="/reports/:id/edit" handler={EditReport}/>
      <Route name ="MyEmployees" path="/MEmployees" handler={MyEmployees}/>
      <Route name ="AllEmployees" path="/AEmployees" handler={AllEmployees}/>
      <Route name ="Profile" path="/profile" handler={Profile}/>
      <Route name ="reportstocomplete" path="/reportsc" handler={ReportsToComplete}/>
    <Route name ="addReport" path="/addReport" handler={AddReports}/>
    <Route name ="readme" path="/readme" handler={Readme}/>
    <Route name ="statistics" path="/statistics" handler={Stats}/>
    <Route name ="signup" path="/signup" handler={Signup} />
    <Route name ="login" path="/" handler={Login} />
    <Route name ="newreport" path="/newreport" handler={NewReport}/>
    <Route name ="templatereport" path="/templatereport" handler={TemplateReport}/>
 </Route>
</Route>
	);

export default routes;

