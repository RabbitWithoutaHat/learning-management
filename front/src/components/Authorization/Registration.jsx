import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addMsg,addUser} from '../../redux/Users/actions';

class Registration extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
  }
  password = (e) => {
    this.setState({ password: e.target.value })
  }

  email = (e) => {
    this.setState({ email: e.target.value })
  }
  nickname = (e) => {
    this.setState({ nickname: e.target.value })
  }
  get = async (e) => {
    e.preventDefault();
    let data = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password
    }
    let resp = await fetch("/reg", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let user = await resp.json();
    if (user.user) {
      this.props.add(user.user)
    } else {
      this.props.addMsg(user.message);
    }
    this.setState({ nickname: '', email: '', password: '', })
  }

  render() {
    return (
      <div class="center">
        <h3>Registration</h3>
        <form onSubmit={this.get}>
          <div class="form-field">
            <label for="nickname">nickname</label>
            <input value={this.state.nickname} type="text" name="nickname" placeholder="nickname" required onChange={this.nickname} />
          </div>
          <div class="form-field">
            <label for="email">email</label>
            <input value={this.state.email} type="text" name="email" placeholder="email" required onChange={this.email} />
          </div>
          <div class="form-field">
            <label for="password">password</label>
            <input value={this.state.password} type="password" name="password" placeholder="password" required onChange={this.password} />
          </div>
          <div class="form-field">
            <input type="submit" />
          </div>
        </form>
        {this.props.message ?
          <>
            {this.props.message}
          </>
          :
          <></>
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
