import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import MainContent from '../components/MainContent/MainContent';
export default class home extends Component {
  render() {
    return (
      <div>
        <SidebarNav>
          <MainContent className="sdasds" />
        </SidebarNav>
      </div>
    );
  }
}
