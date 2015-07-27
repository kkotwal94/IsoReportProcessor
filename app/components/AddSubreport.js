import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class AddSubReport extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state.singleReport = [];
  this.state.link = window.location.href;
	}

componentDidMount() {
  let state = this.state.link;
  state = state.split('/');
  state = state[state.length-1];
  ReportsActions.getSoloReport(state);
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
    <h1>Hello im trying to add a Sub REPORT here</h1>
    </main>
    </div>
    )
}
}