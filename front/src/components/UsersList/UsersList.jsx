import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedUsers } from '../../redux/Users/actions';
import { addNewGroup, changeGroup } from '../../redux/Groups/actions';
import { Image, List, Header, Select, Button, Modal, Form } from 'semantic-ui-react';
import { Checkbox } from 'semantic-ui-react';

class UsersList extends Component {
  state = {
    getSelecetedGroup: '',
    textValue: null,
    willingToRelocate: true,
    modalOpenAddGroup: false,
    modalOpenChangeGroup: false,
    selectUsers: [],
    newGroupName: '',
    changeData: true,
    selectedGroupNameModal: '',
    selectedGroupName: '',
    groupNotSelectedStatus: false,
    checkedStatus: true,
  };
  componentDidMount() {
    this.props.getSelectedUsers();
  }
  newGroupName = e => {
    this.setState({ newGroupName: e.target.value });
  };
  getCheckedUsers = async () => {
    const element = document.querySelectorAll('.checked');
    const usersId = [];
    for (let i = 0; i < element.length; i++) {
      usersId.push(element[i].parentNode.id);
    }
    await this.setState({ selectUsers: usersId });
  };
  handleOpenAddGroup = e => {
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      this.setState({ groupNotSelectedStatus: false });
      this.setState({ modalOpenAddGroup: true });
      this.getCheckedUsers();
    }
  };
  handleOpenChangeGroup = e => {
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      this.setState({ groupNotSelectedStatus: false });
      this.setState({ modalOpenChangeGroup: true });
      this.getCheckedUsers();
    }
  };
  handleCloseAddGroup = e => {
    this.setState({ modalOpenAddGroup: false });
  };

  handleCloseChangeGroup = e => {
    this.setState({ modalOpenChangeGroup: false });
  };
  getSelecetedGroupModal = async (event, { value }) => {
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupNameModal: selectedGroup });
  };
  getSelecetedGroup = async (event, { value }) => {
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupName: selectedGroup });
    this.setState({ groupNotSelectedStatus: false });
    await this.props.getSelectedUsers(selectedGroup);
  };
  addNewGroup = async e => {
    e.preventDefault();

    this.setState({ groupNotSelectedStatus: false });
    this.setState({ changeData: true });
    this.addGroup();
  };
  changeUserGroups = async e => {
    e.preventDefault();
    this.setState({ changedData: true });
    this.changeGroup();
  };

  changeGroup = async () => {
    let data = {
      groups: this.state.selectUsers,
      currentgroup: this.state.selectedGroupName,
      newGroup: this.state.selectedGroupNameModal,
    };

    await this.props.changeGroup(data);
    if (this.props.loadStatus) {
      this.setState({ modalOpenChangeGroup: false, changeData: false });
      this.setState({ changeData: true });
    }
  };
  addGroup = async () => {
    let data = {
      groups: this.state.selectUsers,
      newGroup: this.state.newGroupName,
    };
    await this.props.addNewGroup(data);
    if (this.props.loadStatus) {
      this.setState({ modalOpenAddGroup: false, changeData: false });
      this.setState({ changeData: false });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.changeData && !this.state.changeData) {
      this.props.getSelectedUsers();
    }
  }
  render() {
    return (
      <>
        <>
          <div className="select selectDiv">
            {this.props.admin === 'admin' ? (
              <>
                <Modal
                  trigger={
                    <Button
                      basic
                      color="violet"
                      className="select userslistButton"
                      onClick={this.handleOpenChangeGroup}
                    >
                      Изменить группу
                    </Button>
                  }
                  closeIcon
                  open={this.state.modalOpenChangeGroup}
                  onClose={this.handleCloseChangeGroup}
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header className="regForm">Изменить группу пользователей</Header>
                      <Modal.Actions>
                        <Form className="regForm">
                          <Form.Field className="changeGroupSelect">
                            <Select
                              className="select "
                              placeholder="Все пользователи"
                              options={this.props.selectedGroupList}
                              onChange={this.getSelecetedGroupModal}
                            />
                          </Form.Field>
                          <div className="form-field userSendForm">
                            <Button
                              basic
                              color="violet"
                              type="button"
                              className="Button usersSendButton"
                              onClick={this.changeUserGroups}
                            >
                              Отправить
                            </Button>
                          </div>
                        </Form>
                      </Modal.Actions>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </>
            ) : (
              <></>
            )}
            <>
              <div className="select selectDiv">
                <Select
                  className="select"
                  placeholder="Все пользователи"
                  options={this.props.selectedGroupList}
                  onChange={this.getSelecetedGroup}
                />
                {this.state.groupNotSelectedStatus ? (
                  <>
                    <div className="">Выбери группу</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
            {this.props.admin === 'admin' ? (
              <>
                <Modal
                  trigger={
                    <Button className="userslistButton select" basic color="violet" onClick={this.handleOpenAddGroup}>
                      Добавить группу
                    </Button>
                  }
                  closeIcon
                  open={this.state.modalOpenAddGroup}
                  onClose={this.handleCloseAddGroup}
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header className="regForm">Добавить в группу</Header>
                      <Modal.Actions>
                        <Form className="regForm">
                          <Form.Field>
                            <label htmlFor="Название новой группы">Название новой группы</label>
                            <input type="text" name="Название новой группы" required onChange={this.newGroupName} />
                          </Form.Field>
                          <div className="form-field userSendForm">
                            <Button
                              type="button"
                              basic
                              color="violet"
                              className="usersSendButton Button"
                              onClick={this.addNewGroup}
                            >
                              Отправить
                            </Button>{' '}
                          </div>
                        </Form>
                      </Modal.Actions>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </>
            ) : (
              <></>
            )}
          </div>
        </>

        <List className="ui massive relaxed animated list usersList">
          {this.props.selectedGroupItems ? (
            this.props.selectedGroupItems.map((e, i) => (
              <List.Item id={e._id} key={`${i}user`} className="item itemUser">
                <Checkbox defaultChecked={true} onChange={this.toggleCheckBox} />
                <List.Content className="content">
                  <Header as="a">
                    <Image className="ui avatar image" src={e.photo ? `/images/${e.photo}` : `/images/elb.svg`} />
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
    admin: state.User.user.adminstatus,
    loadStatus: state.Group.loadStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewGroup: data => dispatch(addNewGroup(data)),
    changeGroup: data => dispatch(changeGroup(data)),
    getSelectedUsers: selectedGroup => dispatch(getSelectedUsers(selectedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
