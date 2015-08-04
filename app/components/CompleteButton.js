import React from 'react';
import ReportsActions from 'actions/ReportsActions';
import ReportsStore from 'stores/ReportsStore';
export default class CompleteButton extends React.Component {
constructor(props: {
	id: String;
	buttonText: String;
	buttonClass: String;
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
      duplicate: ReportsStore.getState().globalreports
    });
  }

render() {
  let id = this.props.id;
  let buttonClass = this.props.buttonClass;
  let buttonText = this.props.buttonText;
  return (
    <div>
      <button onClick = {function(event) { let data = id; ReportsActions.setComplete({data: data}); }} className ={buttonClass}>{buttonText}</button>
    </div>
		);
}
}
