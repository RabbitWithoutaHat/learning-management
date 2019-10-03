import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login';
import Login from './components/Authorization/Login';
import Logout from './components/Authorization/Logout';
// import Logout from './components/Logout';
// import Registration from './components/Registration';
import Registration from './components/Authorization/Registration'
// import { addUser } from './redux/actions';
import {addUser} from './redux/Users/actions'
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

class App extends Component{
  async componentDidMount() {
    let resp = await fetch('/authcheck');
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user);
    }
  }
  render() {
    return (
      <div>
        {this.props.user
          ? <>
            <div>AUTH</div>
            <Link to="/">Home</Link><br/>
            <Link to="/logout">Logout</Link>
          </>
          :<>
          <div>NOT</div>
          <Link to="/login">Login</Link><br/>
          <Link to="/registration">Registration</Link>
          </>
        }
        <div>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
