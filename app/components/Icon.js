import React from 'react';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class EmployeesButton extends React.Component {
constructor(props: {
  id: String;
  isList: String;
}) {
  super(props);
  this.state = ReportsStore.getState();
}

  componentDidMount() {
    ReportsStore.listen(this._onChange);
  }

  componentWillUnmount() {
    ReportsStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      allReports: ReportsStore.getState().reports,
      globalReports: ReportsStore.getState().globalreports,
      duplicate: ReportsStore.getState().globalreports,
      userProfile: ReportsStore.getState().userProfile.joinList,
      joinList: ReportsStore.getState().userProfile.joinList,
    });
  }

render() {
  let id = this.props.id;
  let isList = this.props.isList;
  return (
    <div>
      <i className = {isList} onClick = {function(event) { let data = id; console.log(data); ReportsActions.joinList({data: data}); }}></i>
    </div>
    );
}
}
