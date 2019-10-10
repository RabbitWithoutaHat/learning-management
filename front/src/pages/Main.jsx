import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import RightSideOfMain from '../components/RightSideOfMain/RightSideOfMain';
export default class home extends Component {
  render() {
    return (
      <div>
        <SidebarNav>
          <RightSideOfMain className="sdasds" />
        </SidebarNav>
      </div>
    );
  }
}
