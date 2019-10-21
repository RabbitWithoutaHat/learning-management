import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { addAuthUser } from '../../redux/Users/actions';

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
  onSubmit = async e => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.addAuthUser(data);
    if (this.props.loginMessage) {
    } else {
      this.props.history.push('/');
    }
  };
  render() {
    return (
      <Form className="regForm" onSubmit={this.onSubmit}>
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
        <h3 className="Error">{this.props.loginMessage ? <>{this.props.loginMessage}</> : <></>}</h3>
      </Form>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginMessage: state.User.user.loginMessage,
    loadingStatus: state.User.user.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addAuthUser: data => dispatch(addAuthUser(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
