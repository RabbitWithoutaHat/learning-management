import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMsg, addUser } from '../../redux/Users/actions';
import { Button, Form } from 'semantic-ui-react';
import { delUser } from '../../redux/Users/actions';

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
      console.log('UUUUUUUUUSERR',user);
      
      this.props.add(user.user, user.email, user.status, user.photo, user.group, user.groupName);
      this.setState({ nickname: '', email: '', password: '' });
      this.props.history.push('/');
    } else {
      // this.props.del();
      this.props.a(user.message);

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
    del: () => dispatch(delUser()),
    add: (user, email, status, photo, group, groupName) => dispatch(addUser(user, email, status, photo, group, groupName)),
    addMsg: message => dispatch(addMsg(message)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
