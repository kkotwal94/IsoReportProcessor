import React from 'react';
import 'scss/main.scss';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class Report extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
	}

componentDidMount() {
  ReportsActions.getMyReports();
  ReportsStore.listen(this._onChange);
	}

componentWillUnmount() {
  ReportsStore.unlisten(this._onChange);
	}
_onChange = () => {
  this.setState({
      allReports: ReportsStore.getState().reports
    });
}
render() {
  console.log(this.state.allReports);
  return (
      <div>
        <main>
          <h1>My Reports</h1>
        </main>
      </div>
    );
}  
}
