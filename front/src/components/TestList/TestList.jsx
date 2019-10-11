import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTests } from '../../redux/Tests/actions';
import { getSelectedUsers } from '../../redux/Tests/actions';
import { Icon, List, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TestList extends Component {
  state = {
    getSelectedGroup: '',
  };

  componentDidMount() {
    this.props.getTests();
    this.props.getSelectedUsers();
  }

  getSelectedGroup = async (event) => {
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupName: selectedGroup });
    await this.props.getSelectedUsers(selectedGroup);
  };

  render() {
    return (
      <>
        <>
          <Select
            className="select"
            placeholder="Все пользователи"
            options={this.props.selectedGroupList}
            onChange={this.getSelectedGroup}
          />
        </>
        <List className="ui massive  list testsList">
          {this.props.selectedGroupItems ? (
            this.props.selectedGroupItems.map((e, i) => (
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
    selectedGroupItems: state.User.selectedGroupItems,
    selectedGroupList: state.User.selectedGroupList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTests: () => dispatch(getAllTests()),
    getSelectedUsers: selectedGroup => dispatch(getSelectedUsers(selectedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestList);
