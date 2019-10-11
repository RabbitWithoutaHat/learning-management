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
    this.props.admin === 'admin' ? this.props.getSelectedUsers() : this.props.getSelectedUsers(this.props.userGroup);
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
          {this.props.admin ?
            <Select
              className="select"
              placeholder="Все пользователи"
              options={this.props.selectedGroupList}
              onChange={this.getSelectedGroup}
            /> : <></>}


        </>
        <List className="ui massive  list testsList">
          {console.log('OKOOKSODKSODSOD', this.props.selectedGroupTests)}
          {
            
          }
          {this.props.selectedGroupTests ? (
            this.props.selectedGroupTests.map((e, i) => (
              <List.Item key={`${i}test`} className="item testItem">
                <List.Content className="content">
                  <Icon className="question" />
                  <Link onClick={formId => this.setState({ formId })} to={`/tests/${e.googleFormsLink}`}>
                    {e.title}
                  </Link>
                  {/* {console.log('POPOPOOP', this.props.user.admin)} */}
                  {this.props.admin ? <p>{`for ${e.groupName}`}</p> : <></>}
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
  // console.log('OLLLLLLO', state)

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
    getTests: () => dispatch(getAllTests()),
    getSelectedUsers: selectedGroup => dispatch(getSelectedUsers(selectedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestList);
