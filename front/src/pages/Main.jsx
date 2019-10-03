import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import Login from '../components/Authorization/Login';
import Logout from '../components/Authorization/Logout';
import Registration from '../components/Authorization/Registration';
import { Route, Link, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import NavBar from '../components/NavBar/NavBar';
export default class home extends Component {
  render() {
    return (
      <div>
        <SidebarNav>
          <NavBar />
        </SidebarNav>
      </div>
    );
  }
}
