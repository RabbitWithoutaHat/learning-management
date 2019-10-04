import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import Login from '../components/Authorization/Login';
import Logout from '../components/Authorization/Logout';
import Registration from '../components/Authorization/Registration';
import { Route, Link, Redirect } from 'react-router-dom';
import RightSideOfMain from '../components/RightSideOfMain/RightSideOfMain';
export default class home extends Component {
  render() {
    return (
      <div>
        <SidebarNav>
          <RightSideOfMain />
        </SidebarNav>
      </div>
    );
  }
}
