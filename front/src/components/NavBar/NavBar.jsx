import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom';
import SidebarNav from '../SidebarNav/SidebarNav';
import Login from '../Authorization/Login';
import Logout from '../Authorization/Logout';
import Registration from '../Authorization/Registration';
export default class NavBar extends Component {
  render() {
    return (
      <>
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </>
    )
  }
}