import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedUsers } from '../../redux/Users/actions';
import { Image, List, Header, Select } from 'semantic-ui-react';

class UsersList extends Component {
  state = {
    getSelectedGroup: '',
  };
  componentDidMount() {
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
        <List className="ui massive relaxed animated list usersList">
          {this.props.selectedGroupItems ? (
            this.props.selectedGroupItems.map((e, i) => (
              <List.Item key={`${i}user`} className="item itemUser">
                <List.Content className="content">
                  <Header as="a">
                    {e.photo ? (
                      <Image className="ui avatar image" src={`/images/${e.photo}`} />
                    ) : (
                      <Image className="ui avatar image" src={`/images/elb.svg`} />
                    )}

                    <Header.Content>
                      {e.nickname}
                      <Header.Subheader>{e.groupName}</Header.Subheader>
                    </Header.Content>
                  </Header>
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
    selectedGroupItems: state.User.selectedGroupItems,
    selectedGroupList: state.User.selectedGroupList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedUsers: selectedGroup => dispatch(getSelectedUsers(selectedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
