import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTests } from '../../redux/Tests/actions';
import { Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TestList extends Component {
  componentDidMount() {
    this.props.getTests();
  }

  render() {
    return (
      <>
        <List className="ui massive  list testsList">
          {this.props.tests ? (
            this.props.tests.map((e, i) => (
              <List.Item key={`${i}test`} className="item testItem">
                <List.Content className="content">
                  <Icon className="question" />
                  <Link onClick={formId => this.setState({ formId })} to={`/tests/${e.googleFormsLink}`}>
                    {e.title}
                  </Link>
                  {this.props.user.status ? <p>admin</p> : <p>NET!</p>}
                </List.Content>
              </List.Item>
            ))
          ) : (
            <></>
          )}
        </List>
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
)(TestList);
