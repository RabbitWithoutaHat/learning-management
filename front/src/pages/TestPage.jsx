import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTests } from '../redux/Tests/actions';

class TestPage extends Component {
  state = {
    test: {},
  };

  componentDidMount() {
    this.props.getTests();
    const test = this.props.tests.find(e => e.googleFormsLink === this.props.match.params.id);
    this.setState({ test: test });
  }

  render() {
    return (
      <>
        {this.state.test ? (
          <iframe
            className="testFrame"
            src={`https://docs.google.com/forms/d/e/${this.state.test.googleFormsLink}/viewform?embedded=true`}
            width="700"
            height="800"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Загрузка...
          </iframe>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tests: state.Test.tests,
    user: state.User.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTests: () => dispatch(getAllTests()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestPage);
