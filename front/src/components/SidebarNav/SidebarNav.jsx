import React, { Component } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import Login from '../Authorization/Login';
import Logout from '../Authorization/Logout';
import Registration from '../Authorization/Registration';
import { addUser } from '../../redux/Users/actions';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

class SidebarNav extends Component {
  state = {
    date: new Date(),
  };
  async componentDidMount() {
    let resp = await fetch('/authcheck');
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user);
    }
  }
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} icon="labeled" inverted vertical visible width="wide">
          {this.props.user ? (
            <>
              <Link to="/">
                <Menu.Item as="a">
                  <Icon name="home" />
                  Главная
                </Menu.Item>
              </Link>
              <Link to="/profile">
                <Menu.Item as="a">
                  <Icon name="user outline" />
                  Профиль
                </Menu.Item>
              </Link>
              <Link to="/lections">
                <Menu.Item as="a">
                  <Icon name="book" />
                  Лекции
                </Menu.Item>
              </Link>
              {/* <div>AUTH</div> */}
              <Calendar onChange={this.onChange} value={this.state.date} />
              <Link className="logoutItem" to="/logout">
                <Menu.Item as="a">
                  <Icon name="sign-out" />
                  Выйти
                </Menu.Item>
              </Link>
            </>
          ) : (
              <>
                <Link to="/login">
                  <Menu.Item as="a">
                    <Icon name="plug" />
                    Логин
                </Menu.Item>
                </Link>
                <Link to="/registration">
                  <Menu.Item as="a">
                    <Icon name="user outline" />
                    Регистрация
                </Menu.Item>
                </Link>
                <div>NOT</div>
              </>
            )}
        </Sidebar>

        <Sidebar.Pusher>
          {this.props.children}

        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.login,
    status: state.user.status,
    justregister: state.user.justregister,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    add: login => dispatch(addUser(login)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarNav);
