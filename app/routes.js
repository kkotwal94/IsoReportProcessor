import React from 'react';
import { Route } from 'react-router';
import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Dashboard from 'components/Dashboard';
import Report from 'components/Report';
import Employees from 'components/Employees';
import AddReports from 'components/AddReports';

const routes = (
<Route>
 <Route name ="signup" path="/signup" handler={Signup} />
 <Route name ="login" path="/" handler={Login} />
 <Route name ="dash" path="/dashboard" handler={App}>
    <Route name ="dashboard" path="/dashboard" handler={Dashboard}/>
    <Route name ="reports" path="/reports" handler={Report} />
    <Route name ="employees" path="/employees" handler={Employees} />
    <Route name ="addReport" path="/addReport" handler={AddReports} />
 </Route>
</Route>
	);

export default routes;

