import React, { Component } from 'react';
import { logout } from '../../redux/Users/actions';
import { connect } from 'react-redux';
class Logout extends Component {
  async componentDidMount() {
    await this.props.del();
    this.props.history.push('/login');
  }
  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.User.user.nickname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    del: () => dispatch(logout()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
