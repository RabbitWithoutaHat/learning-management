import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTests, getSelectedTests, addTest } from '../../redux/Tests/actions';
import { Icon, List, Select, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TestList extends Component {
  state = {
    getSelectedGroup: '',
  };

  componentDidMount() {
    this.props.getTests();
    this.props.admin === 'admin' ? this.props.getSelectedTests() : this.props.getSelectedTests(this.props.userGroup);
  }

  getSelectedGroup = async event => {
    let selectedGroup = event.target.textContent;

    this.setState({ selectedGroupName: selectedGroup });
    await this.props.getSelectedTests(selectedGroup);
  };

  addTest = async e => {
    e.preventDefault();
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      this.func();
    }
  };

  func = async () => {
    let data = {
      group: this.state.selectedGroupName,
    };
    await this.props.addTest(data);
    await this.props.getSelectedTests(this.state.selectedGroupName);
  };

  render() {
    return (
      <>
        <>
          {this.props.admin ? (
            <Select
              className="select"
              placeholder="Все пользователи"
              options={this.props.selectedGroupList}
              onChange={this.getSelectedGroup}
            />
          ) : (
            <></>
          )}
        </>
        <List className="ui massive  list testsList">
          {this.props.selectedGroupTests ? (
            this.props.selectedGroupTests.map((e, i) => (
              <List.Item key={`${i}test`} className="item testItem">
                <List.Content className="content">
                  <Icon className="question" />
                  <Link onClick={formId => this.setState({ formId })} to={`/tests/${e.googleFormsLink}`}>
                    {e.title}
                  </Link>
                  {this.props.admin ? <p>{`for ${e.groupName}`}</p> : <></>}
                </List.Content>
              </List.Item>
            ))
          ) : (
            <></>
          )}
          {this.props.admin ? (
            <>
              <Button className="addWeek" basic color="violet" icon="plus" onClick={this.addTest}>
                Добавить тест
              </Button>
            </>
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
    userGroup: state.User.user.groupName,
    admin: state.User.user.adminstatus,
    selectedGroupTests: state.Test.selectedGroupTests,
    selectedGroupList: state.Test.selectedGroupList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTest: data => dispatch(addTest(data)),
    getTests: group => dispatch(getAllTests(group)),
    getSelectedTests: selectedGroup => dispatch(getSelectedTests(selectedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestList);
