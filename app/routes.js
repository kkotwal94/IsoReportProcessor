import React from 'react';
import { Route } from 'react-router';

import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import NavMenu from 'components/NavMenu';

const routes = (
<Route>
 <Route name ="signup" path="/signup" handler={Signup} />
 <Route name ="login" path="/" handler={Login} />
 <Route name ="app" path="/dashboard" handler={App} />
  <Route name ="logout" path="/logout" handler={NavMenu} />

</Route>
	);

export default routes;

