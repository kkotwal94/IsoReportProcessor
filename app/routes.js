import React from 'react';
import { Route } from 'react-router';

import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import NavMenu from 'components/NavMenu';
import Dashboard from 'components/Dashboard';

const routes = (
<Route name = "app" path = "/dashboard" handler ={App}>
 <Route name ="signup" path="/signup" handler={Signup} />
 <Route name ="login" path="/" handler={Login} />
 <Route name ="logout" path="/logout" handler={NavMenu} />
</Route>
	);

export default routes;

