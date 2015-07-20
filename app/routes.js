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

const routes = (
<Route>
 <Route name ="dash" path="/dashboard" handler={App}>
    <Route name ="dashboard" path="/dashboard" handler={Dashboard}/>
    <Route name ="reports" path="/reports" handler={Report} />
    <Route name ="employees" path="/employees" handler={Employees}/>
      <Route name ="MyEmployees" path="/MEmployees" handler={MyEmployees}/>
      <Route name ="AllEmployees" path="/AEmployees" handler={AllEmployees}/>
      <Route name ="Profile" path="/profile" handler={Profile}/>
      <Route name ="reportstocomplete" path="/reportsc" handler={ReportsToComplete}/>
    <Route name ="addReport" path="/addReport" handler={AddReports}/>
    <Route name ="readme" path="/readme" handler={Readme}/>
    <Route name ="statistics" path="/statistics" handler={Stats}/>
    <Route name ="signup" path="/signup" handler={Signup} />
 <Route name ="login" path="/" handler={Login} />
 </Route>
</Route>
	);

export default routes;

