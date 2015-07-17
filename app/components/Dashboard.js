import React from 'react';
import NavBar from './NavBar';
import Body from './Body';
import {RouteHandler} from 'react-router';
import 'scss/main.scss';
export default class Dashboard extends React.Component {
render() {
    return (
      <div>
        <NavBar/>
        <main>
          <Body />
        </main>
      </div>
    );
  }
}
