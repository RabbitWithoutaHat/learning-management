import React, { Component } from 'react'
import {delUser} from '../../redux/Users/actions';
import { connect } from 'react-redux';
class Logout extends Component {
  async componentDidMount() {
    let resp = await fetch("/logoout");
    let data = await resp.json();
    this.props.del();
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    del: () => dispatch(delUser()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);

