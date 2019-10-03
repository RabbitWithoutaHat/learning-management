import React, { Component } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default class SidebarNav extends Component {
  state = {
    date: new Date(),
  };
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} icon="labeled" inverted vertical visible width="wide">
          <Menu.Item as="a">
            <Icon name="home" />
            Главная
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="user outline" />
            Профиль
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="book" />
            Лекции
          </Menu.Item>
          {/* <Menu.Item> */}
          <Calendar onChange={this.onChange} value={this.state.date} />
          {/* </Menu.Item> */}
          <Menu.Item className="logoutItem" as="a">
            <Icon name="sign-out" />
            Выйти
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>{this.props.children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
