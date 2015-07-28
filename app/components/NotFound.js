import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class NotFound extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
	}

componentDidMount() {
  ReportsStore.listen(this._onChanges);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChanges);
	}

_onChanges = () => {
  this.setState({
      singleReport: ReportsStore.getState().singleReport,
      duplicate: ReportsStore.getState().singleReport
    });
}

render() {
  return(
    <div>
    <main>
    <div className = "readME">
    <h1>This is a 404 NOT FOUND Page</h1>
    <h1>So why were you directed here?</h1>
    <p>Maybe the report you were trying to view was suddenly deleted, maybe you tried to delete something, that just got deleted by another owner.</p>
    <p>Return back to dashboard and check it out or view the database and inspect it. <Link to = "dashboard"><a>See ya</a></Link></p>
    </div>
    </main>
    </div>
    )
}
}