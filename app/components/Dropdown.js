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
  this.state.singleReport = [];
  this.state.listVisible = false;
  this.state.display ="";
  
	}

componentDidMount() {
	}

componentWillUnmount() {
	}

_onChanges = () => {
}

select = (item) => {
  this.props.selected = item;
  UserActions.getSelected(this.props.selected);
  ReportsActions.getSelected(this.props.selected);
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
  let selected = this.props.selected;
          if(this.props.selected == undefined) {
            this.props.selected = {email: 'Select Item', profile: {firstName: '', lastName: ''}};
          }
          return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
            <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
              <span style={{ color: 'white' }}>{selected}</span>
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
            let str;
            if(item.email != null) {
              str = item.email + " : " + item.profile.firstName + " " + item.profile.lastName;
            }
            else {
              str = item.title;
            }
            items.push(<div onClick={this.select.bind(null, item)}>
              <span style={{ color: 'black' }}>{str}</span>
              <i style={{ color: 'black' }} className="fa fa-check"></i>
            </div>);
          }
          return items;
        }
}
