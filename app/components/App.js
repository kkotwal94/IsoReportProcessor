import React from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import {RouteHandler} from 'react-router';
import 'scss/main.scss';
export default class App extends React.Component {
render() {
    return (
      <div>
        <Dashboard />
        
      </div>
    );
  }
}

