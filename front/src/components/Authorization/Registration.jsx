import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMsg, addUser } from '../../redux/Users/actions';
import { Button, Form } from 'semantic-ui-react';
import { delUser, addRegUser } from '../../redux/Users/actions';

class Registration extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
  };
  password = e => {
    this.setState({ password: e.target.value });
  };

  email = e => {
    this.setState({ email: e.target.value });
  };
  nickname = e => {
    this.setState({ nickname: e.target.value });
  };
  get = async e => {
    e.preventDefault();
    let data = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.addRegUser(data);
    if (this.props.loginMessage) {
    } else {
      this.setState({ nickname: '', email: '', password: '' });
      this.props.history.push('/');
    }

  };
  render() {
    return (
      <>
        <Form className="regForm" onSubmit={this.get}>
          <h3>Registration</h3>
          <Form.Field>
            <label htmlFor="nickname">nickname</label>
            <input value={this.state.nickname} type="text" name="nickname" required onChange={this.nickname} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">email</label>
            <input value={this.state.email} type="text" name="email" required onChange={this.email} />
          </Form.Field>
          <Form.Field>
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
            <Button type="submit">Отправить</Button>{' '}
          </div>
          <h3 className="Error">{this.props.loginMessage ? <>{this.props.loginMessage}</> : <></>}</h3>
        </Form>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    // message: state.User.user.message,
    loginMessage: state.User.user.loginMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRegUser: (data) => dispatch(addRegUser(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
