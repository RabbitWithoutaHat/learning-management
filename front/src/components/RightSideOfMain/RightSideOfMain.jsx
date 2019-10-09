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
import PageWithoutGroup from '../PageWithoutGroup/PageWithoutGroup';
import { connect } from 'react-redux';
class NavBar extends Component {
  async componentDidMount() {


  }
  render() {
    return (
      <>
        <>{this.props.userWithGroup || this.props.admin ?
          <>
            <Route exact path="/" component={Home} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/lections" component={Lections} />
            <Route name="lection" path="/lections/:id" component={Topic} />
          </>

          :
          <>
            <Route exact path="/" component={PageWithoutGroup} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route exact path="/lections" component={PageWithoutGroup} />
            <Route name="lection" path="/lections/:id" component={PageWithoutGroup} />
          </>
        }
        </>
        {/* <Route exact path="/" component={Home} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
        <Route exact path="/lections" component={Lections} />
        <Route name="lection" path="/lections/:id" component={Topic} /> */}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userWithGroup: state.User.user.groupName,
    admin: state.User.user.adminstatus,
    // selectedGroup:state.Topics.selectedGroupName,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // getNews: () => dispatch(getNewsData())
    // getTopics: (selectedGroup) => dispatch(getTopicsData(selectedGroup)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
