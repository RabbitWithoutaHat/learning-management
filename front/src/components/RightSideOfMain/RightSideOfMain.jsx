import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Authorization/Login';
import Logout from '../Authorization/Logout';
import Registration from '../Authorization/Registration';
import Profile from '../../pages/Profile';
import Home from '../../pages/Home';
import Lections from '../../pages/Lections';
import Users from '../../pages/Users';
import Topic from '../../pages/Topic';
import Tests from '../../pages/Tests';
import TestPage from '../../pages/TestPage';
export default class NavBar extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
        <Route exact path="/lections" component={Lections} />
        <Route name="lection" path="/lections/:id" component={Topic} />
        <Route exact path="/tests" component={Tests} />
        <Route name="test" path="/tests/:id" component={TestPage} />
      </>
    );
  }
} 
