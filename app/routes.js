import React from 'react';
import { Route} from 'react-router';

import App from 'components/App';

const routes = (
<Route name="app" path="/" handler={App} />
	);

export default routes;

