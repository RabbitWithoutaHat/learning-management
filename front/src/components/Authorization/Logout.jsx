import React, { Component } from 'react';
import { delUser } from '../../redux/Users/actions';
import { connect } from 'react-redux';
class Logout extends Component {
  async componentDidMount() {
    await fetch('/logoout');
    this.props.del();
    this.props.history.push('/login');
  }
  render() {
    // Эм. Компонент, который рисует... пустой div?
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.User.user.login,
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
