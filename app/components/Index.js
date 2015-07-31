import React from 'react';
import Navbar from './NavBar';
import {RouteHandler} from 'react-router';
import 'scss/main.scss';
export default class Index extends React.Component {
render() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
}

