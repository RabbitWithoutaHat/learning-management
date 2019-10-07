import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMsg, addUser } from '../../redux/Users/actions';
import { Button, Checkbox, Form } from 'semantic-ui-react';

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
    let resp = await fetch('/reg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user);
      this.setState({ nickname: '', email: '', password: '' });
      this.props.history.push('/');
    } else {
      this.props.addMsg(user.message);
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
            <input value={this.state.password} type="password" name="password" required onChange={this.password} />
          </Form.Field>
          <div className="form-field">
            <Button type="submit">Отправить</Button>{' '}
          </div>
        </Form>
        <h3>{this.props.message ? <>{this.props.message}</> : <></>}</h3>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    message: state.User.user.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: user => dispatch(addUser(user)),
    addMsg: message => dispatch(addMsg(message)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
