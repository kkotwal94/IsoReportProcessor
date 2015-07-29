import React from 'react';
import {Link,State, Route} from 'react-router';
import Router from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import ReportsStore from 'stores/ReportsStore';
import ReportsActions from 'actions/ReportsActions';
export default class Dropdown extends React.Component {
constructor(props) {
  super(props);
  this.state = ReportsStore.getState();
  this.state = UserStore.getState();
  this.state.link = window.location.href;
  this.state.singleReport = [];
  this.state.listVisible = false;
  this.state.display ="";
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
      duplicate: ReportsStore.getState().singleReport,
      
    });
}

select = (item) => {
  UserActions.getSelected(this.props.selected);
  this.props.selected = item;
}

show = () => {
  this.setState({listVisible: true});
  document.addEventListener("click", this.hide);
}

hide = () => {
  this.setState({listVisible: false});
  document.removeEventListener("click", this.hide);
}



render(){
          if(this.props.selected == undefined) {
            this.props.selected.email = "Ui";
            this.props.selected.profile.firstName = "jajaj";
            this.props.selected.profile.lastName = "blahablah";
          }
          return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
            <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
              <span style={{ color: 'white' }}>{this.props.selected.email + " : " + this.props.selected.profile.firstName + " " + this.props.selected.profile.lastName}</span>
              <i style={{ color: 'red' }} className="fa fa-angle-down"></i>
            </div>
            <div className="dropdown-list">
              <div>
                {this.renderListItems()}
              </div>
            </div>
          </div>;
        }

renderListItems() {
          let items = [];
          for (let i = 0; i < this.props.list.length; i++) {
            let item = this.props.list[i];
            items.push(<div onClick={this.select.bind(null, item)}>
              <span style={{ color: 'black' }}>{item.email + " : " + item.profile.firstName + " " + item.profile.lastName}</span>
              <i style={{ color: 'black' }} className="fa fa-check"></i>
            </div>);
          }
          return items;
        }
}
