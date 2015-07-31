import React from 'react';
import { Route, DefaultRoute } from 'react-router';
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
import NotFound from 'components/NotFound';
import ReportHandler from 'components/ReportHandler'
import Index from 'components/Index';
import { history } from 'react-router';

const routes = (
<Route>
 <Route name ="dashboard" path="/dashboard" handler={App}>
    <Route name ="dash" path="/dashboard" handler={Dashboard}/>
    <Route name ="assignReport" path="/user" handler={AssignReport}/>
    <Route name ="assignReported" path="/user/:id" handler={AssignReported}/>
    <Route name ="employees" path="/employees" handler={Employees}/>
    <Route name ="reports" path="/reports" handler={ReportHandler}>
      <Route name ="report" path="/reportsall" handler={Report}/>
      <Route name ="singlereports" path=":id" handler={ReportView}/>
      <Route name ="addsubreport" path=":id/addsubreport" handler={AddSubreport}/>
      <Route name ="editreports" path=":id/edit" handler={EditReport}/>
    </Route>
      <Route name ="MyEmployees" path="/MEmployees" handler={MyEmployees}/>
      <Route name ="AllEmployees" path="/AEmployees" handler={AllEmployees}/>
      <Route name ="Profile" path="/profile" handler={Profile}/>
      <Route name ="reportstocomplete" path="/reportsc" handler={ReportsToComplete}/>
    <Route name ="addReport" path="/addReport" handler={AddReports}/>
    <Route name ="readme" path="/readme" handler={Readme}/>
    <Route name ="statistics" path="/statistics" handler={Stats}/>
    <Route name ="signup" path="/signup" handler={Signup} />
    <Route name ="newreport" path="/newreport" handler={NewReport}/>
    <Route name ="templatereport" path="/templatereport" handler={TemplateReport}/>
    <Route name ="404" path="/404NotFound" handler={NotFound}/>
    <Route name ="login" path="/" handler={Login}/>
 </Route>
</Route>
	);

export default routes;

