import React, { Component } from 'react';
import { connect } from 'react-redux';
import {delUser,addMsg,addUser} from '../../redux/Users/actions';

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
    console.log('tyt!');
    
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
      this.setState({ dataLoaded: true })
      this.props.add(user.user);
    } else {
      this.props.addMsg(user.message);
    }
  };
  render() {
    return (
      <div>
        <h3>Log in</h3>

        <form onSubmit={this.get}>
          <div className="form-field">
            <label for="email">email</label>
            <input
              value={this.state.email}
              type="text"
              name="email"
              placeholder="email"
              required
              onChange={this.email}
            />
          </div>
          <div className="form-field">
            <label for="password">password</label>
            <input
              value={this.state.password}
              type="text"
              name="password"
              placeholder="name"
              required
              onChange={this.password}
            />
          </div>
          <div className="form-field">
            <input type="submit" />
          </div>
        </form>
        {this.props.dataLoaded ?
          <></>
          :
          <>
          </>
        }
        {this.props.message ?
          <>
            {this.props.message}
          </>
          :
          <></>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    message: state.user.message,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    add: user => dispatch(addUser(user)),
    addMsg: message => dispatch(addMsg(message)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
