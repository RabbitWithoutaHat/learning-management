import React, { Component } from 'react';
import { Icon, Menu, Sidebar, Dimmer, Loader } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { addUser } from '../../redux/Users/actions';
import { connect } from 'react-redux';
import { delUser } from '../../redux/Users/actions';
import { Link } from 'react-router-dom';
import { getCalendar } from '../../redux/News/action';
import moment from 'moment';
import 'moment/locale/ru';

class SidebarNav extends Component {
  state = {
    date: new Date(),
    eventMessage: '',
  };
  onChange = async date => {
    await this.setState({ date });

    const eventsObj = {};
    const nowDate = this.state.date;
    const dateStr = moment(nowDate).format('YYYY-MM-DD');
    this.props.events.map(e => {
      if (e.start.dateTime) {
        const newDate = new Date(Date.parse(e.start.dateTime));
        const time = moment(e.start.dateTime)
          .locale('ru')
          .format('LT');
        const dateStr = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        eventsObj[dateStr] = `${time} - ${e.summary}`;
      } else {
        eventsObj[e.start.date] = e.summary;
      }
    });
    const event = {};
    for (let prop in eventsObj) {
      if (prop === dateStr) {
        event['summary'] = `${eventsObj[prop]}`;
      }
    }
    console.log(event);
    this.setState({ eventMessage: event.summary });
  };
  async componentDidMount() {
    this.props.getCalendar();
    let resp = await fetch('/authcheck');
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user, user.email, user.status, user.photo, user.group, user.groupName);
    } else {
      this.props.del();
    }
  }
  render() {
    return (
      <>
        {this.props.loading ? (
          <Sidebar.Pushable>
            <Sidebar as={Menu} icon="labeled" inverted vertical visible width="wide">
              {this.props.user ? (
                <>
                  <Link to="/">
                    <Menu.Item>
                      <Icon name="play" />
                      Актуальное
                    </Menu.Item>
                  </Link>
                  <Link to="/lections">
                    <Menu.Item>
                      <Icon name="book" />
                      Лекции
                    </Menu.Item>
                  </Link>
                  <Link to="/users">
                    <Menu.Item>
                      <Icon name="users" />
                      Cтуденты
                    </Menu.Item>
                  </Link>
                  <Link to="/tests">
                    <Menu.Item>
                      <Icon name="tasks" />
                      Тесты
                    </Menu.Item>
                  </Link>
                  <Link to="/profile">
                    <Menu.Item>
                      <Icon name="user outline" />
                      Профиль
                    </Menu.Item>
                  </Link>

                  <div className="calendarContainer">
                    <p className="eventMessage">{this.state.eventMessage}</p>
                    <Calendar onChange={this.onChange} value={this.state.date} />
                  </div>

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
                </>
              )}
            </Sidebar>
            <Sidebar.Pusher>
              <div className="container">{this.props.children}</div>
              <footer></footer>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        ) : (
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userWithGroup: state.User.user.groupName,
    admin: state.User.user.adminstatus,
    user: state.User.user.login,
    status: state.User.user.status,
    justregister: state.User.user.justregister,
    loading: state.User.user.loading,
    events: state.News.events.items,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCalendar: () => dispatch(getCalendar()),
    del: () => dispatch(delUser()),
    add: (user, email, status, photo, group, groupName) =>
      dispatch(addUser(user, email, status, photo, group, groupName)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarNav);
