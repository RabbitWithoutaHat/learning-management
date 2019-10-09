import React, { Component } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { addUser } from '../../redux/Users/actions';
import { getTopicsData } from '../../redux/Lections/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class SidebarNav extends Component {
  state = {
    date: new Date(),
  };
  async componentDidMount() {
    let resp = await fetch('/authcheck');
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user, user.email,user.status,user.photo,user.group,user.groupName);
    }
  }
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} icon="labeled" inverted vertical visible width="wide">
          {this.props.user ? (
            <>
              <Link to="/">
                <Menu.Item>
                  <Icon name="play" />
                  Актуальное
                </Menu.Item>
              </Link>
              <Link to="/profile">
                <Menu.Item>
                  <Icon name="user outline" />
                  Профиль
                </Menu.Item>
              </Link>
              <Link to="/lections">
                <Menu.Item>
                  <Icon name="book" />
                  Лекции
                </Menu.Item>
                </Link>
                <Menu.Item>
                  <Icon name="play" />
                  {this.props.userWithGroup||this.props.admin?
                <>
                Дать доступ
                </>
                :
                <>
                  Не давать доступ
                </>  
                
                  }
                </Menu.Item>
                
              }
              
              {/* <div>AUTH</div> */}
              <Calendar onChange={this.onChange} value={this.state.date} />
              <Link className="logoutItem" to="/logout">
                <Menu.Item>
                  <Icon name="sign-out" />
                  Выйти
                </Menu.Item>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Menu.Item>
                  <Icon name="sign-in" />
                  Логин
                </Menu.Item>
              </Link>
              <Link to="/registration">
                <Menu.Item>
                  <Icon name="user outline" />
                  Регистрация
                </Menu.Item>
              </Link>
              <div>NOT</div>
            </>
          )}
        </Sidebar>
        <Sidebar.Pusher>
          <div className="container">{this.props.children}</div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}


function mapStateToProps(state) {
  return {
    userWithGroup: state.User.user.groupName,
    admin:state.User.user.adminstatus,
    user: state.User.user.login,
    status: state.User.user.status,
    justregister: state.User.user.justregister,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    add: (user, email,status,photo,group,groupName) => dispatch(addUser(user, email,status,photo,group,groupName)),
    // getTopics: () => dispatch(getTopicsData()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarNav);
