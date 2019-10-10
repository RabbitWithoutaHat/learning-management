import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { addLogMsg, addUser } from '../../redux/Users/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    dataLoaded: false,
  };
  password = e => {
    this.setState({ password: e.target.value });
  };

  email = e => {
    this.setState({ email: e.target.value });
  };
  get = async e => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    let resp = await fetch('/log', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let user = await resp.json();

    if (user.user) {
      this.setState({ dataLoaded: true });
      this.props.add(user.user, user.email, user.status, user.photo, user.group, user.groupName);
      this.props.history.push('/');
    } else {
      this.props.addLogMsg(user.message);
    }
  };
  render() {
    return (
      <>
        <Form className="regForm" onSubmit={this.get}>
          <h3>Log in</h3>
          <Form.Field className="form-field">
            <label htmlFor="email">email</label>
            <input value={this.state.email} type="text" name="email" required onChange={this.email} />
          </Form.Field>
          <Form.Field className="form-field">
            <label htmlFor="password">password</label>
            <input
              value={this.state.password}
              autoComplete="password"
              type="password"
              name="password"
              required
              onChange={this.password}
            />
          </Form.Field>
          <div className="form-field">
            <Button type="submit">Войти</Button>
          </div>
        </Form>
        {this.props.dataLoaded ? <></> : <></>}
        <h3>{this.props.loginMessage ? <>{this.props.loginMessage}</> : <></>}</h3>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginMessage: state.User.user.loginMessage,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    add: (user, email, status, photo, group, groupName) =>
      dispatch(addUser(user, email, status, photo, group, groupName)),
    addLogMsg: loginMessage => dispatch(addLogMsg(loginMessage)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
