import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Authorization/Login';
import Logout from '../Authorization/Logout';
import Registration from '../Authorization/Registration';
import Profile from '../../pages/Profile';
import Home from '../../pages/Home';
import Lections from '../../pages/Lections';
import Spiner from '../Spiner/Spiner';
import Topic from '../../pages/Topic'
export default class NavBar extends Component {
  render() {
    return (
      <>
       <Route exact path="/spiner" component={Spiner} />
        <Route exact path="/" component={Home} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/lections" component={Lections} />
        <Route name="lection" path="/lections/:id" component={Topic} />
      </>
    );
  }
}
