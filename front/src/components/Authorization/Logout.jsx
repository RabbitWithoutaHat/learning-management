import React, { Component } from 'react';
import { delUser } from '../../redux/Users/actions';
import { connect } from 'react-redux';
class Logout extends Component {
  async componentDidMount() {
    let resp = await fetch('/logoout');
    this.props.del();
    this.props.history.push('/login');
  }
  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    del: () => dispatch(delUser()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
