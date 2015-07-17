import React from 'react';
import Navbar from './NavBar';
import {RouteHandler} from 'react-router';
import 'scss/main.scss';
export default class App extends React.Component {
render() {
    return (
      <div>
        <Navbar/>
        <RouteHandler/>
      </div>
    );
  }
}

