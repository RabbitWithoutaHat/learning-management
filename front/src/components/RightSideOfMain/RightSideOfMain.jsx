import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Authorization/Login';
import Logout from '../Authorization/Logout';
import Registration from '../Authorization/Registration';
import Profile from '../../pages/Profile';
import Home from '../../pages/Home';
import Lections from '../../pages/Lections';
import Users from '../../pages/Users';
import Topic from '../../pages/Topic';
import Calendar from '../../components/Calendar/Calendar';
import Tests from '../../pages/Tests';
import TestPage from '../../pages/TestPage';
import PageWithoutGroup from '../PageWithoutGroup/PageWithoutGroup';
import { connect } from 'react-redux';

class NavBar extends Component {
  async componentDidMount() {}
  render() {
    return (
      <>
        <>
          {(this.props.userWithGroup !== 'Без группы' && this.props.userWithGroup) || this.props.admin === 'admin' ? (
            <>
              <Route exact path="/" component={Home} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/topics" component={Lections} />
              <Route name="lection" path="/topics/:id" component={Topic} />
              <Route exact path="/tests" component={Tests} />
              <Route name="test" path="/tests/:id" component={TestPage} />
              <Route path="/users" component={Users} />
              <Route path="/calendar" component={Calendar} />
            </>
          ) : (
            <>
              <Route exact path="/" component={PageWithoutGroup} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <Route exact path="/topics" component={PageWithoutGroup} />
              <Route name="lection" path="/topics/:id" component={PageWithoutGroup} />
              <Route exact path="/tests" component={Tests} />
              <Route name="test" path="/tests/:id" component={TestPage} />
              <Route path="/users" component={Users} />
              <Route name="calendar" path="/calendar" component={Calendar} />
            </>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userWithGroup: state.User.user.groupName,
    admin: state.User.user.adminstatus,
  };
};

export default connect(mapStateToProps)(NavBar);
