import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedUsers } from '../../redux/Users/actions';
import { Image, List, Header, Select, Button, Modal, Form } from 'semantic-ui-react';
import { Checkbox } from 'semantic-ui-react';

class UsersList extends Component {
  state = {
    getSelecetedGroup: '',
    textValue: null,
    willingToRelocate: true,
    modalOpenAddGroup: false,
    modalOpenChangeGroup: false,
    chosedUsers: [],
    newGroupName: '',
    changeData: true,
    selectedGroupNameModalChangeGroup:'',
    selectedGroupName:'',
    groupNotSelectedStatus:false,
  };
  componentDidMount() {
    this.props.getSelectedUsers();
  }
  newGroupName = e => {
    this.setState({ newGroupName: e.target.value });
  };
  getCheckedusers = async () => {
    const element = document.querySelectorAll('.checked');
    const usersId = []
    for (let i = 0; i < element.length; i++) {
      usersId.push(element[i].parentNode.id)
    }
    await this.setState({ chosedUsers: usersId })
  }
  openAdd = e => {
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true })
    } else {
      this.setState({ groupNotSelectedStatus: false })
    this.setState({ modalOpenAddGroup: true });
    this.getCheckedusers();
    }
  };
  openChange= e => {
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true })
    } else {
      this.setState({ groupNotSelectedStatus: false })
    this.setState({  modalOpenChangeGroup: true });
    this.getCheckedusers();
    }
  };
  handleCloseAddGroup = e => {
    this.setState({ modalOpenAddGroup: false });
  };
  
  handleCloseChangeGroup = e => {
    this.setState({ modalOpenChangeGroup: false });
  };
  getSelecetedGroupModalChangeGroup = async (event, { value }) => {
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupNameModalChangeGroup: selectedGroup });
    
    // await this.props.getSelectedUsers(selectedGroup);
  };
  getSelecetedGroup = async (event, { value }) => {
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupName: selectedGroup });
    this.setState({ groupNotSelectedStatus:false})
    await this.props.getSelectedUsers(selectedGroup);
  };
  addNewGroup = async e => {
    e.preventDefault();
   
      this.setState({ groupNotSelectedStatus: false })
      this.setState({ changeData: true });
      this.addGroup();
    
    
  };
 changeUserGroups = async e => {
   e.preventDefault();
    this.setState({changedData:true})
    this.changeGroup();
 
 }
 changeGroup = async () => {
  let data = {
    groups: this.state.chosedUsers,
    currentgroup: this.state.selectedGroupName,
    newGroup: this.state.selectedGroupNameModalChangeGroup,
  }
  let resp = await fetch('/changegroup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  let dataresp = await resp.json();
  if (dataresp.status) {
    this.setState({ modalOpenChangeGroup: false, changeData: false });
    this.setState({ changeData: true });

  }

}
  addGroup = async () => {
    let data = {
      groups: this.state.chosedUsers,
      newGroup: this.state.newGroupName,
    }
    let resp = await fetch('/addnewgroup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let dataresp = await resp.json();
    if (dataresp.status) {
      this.setState({ modalOpenAddGroup: false, changeData: false });
      this.setState({ changeData: false });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log('UPDATE');
    
    if (prevState.changeData && !this.state.changeData) {
      console.log("STATE CHANGED");
      this.props.getSelectedUsers();
    }
  }
  render() {
    return (
      <>
        <>
          <div className="select selectDiv">
            {this.props.admin ? (
              <>
                <Modal
                  trigger={
                    <Button className="select" positive onClick={this.openChange}>
                      Изменить группу
                </Button>
                  }
                  closeIcon
                  open={this.state.modalOpenChangeGroup}
                  onClose={this.handleCloseChangeGroup}
                // basic
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header className="regForm">
                        Изменить группу пользователей
                      </Header>
                      {/* ФОрма */}
                      <Modal.Actions>
                        <Form className="regForm">
                          <Form.Field>
                          <Select
                            className="select"
                            placeholder="Все пользователи"
                            options={this.props.selectedGroupList}
                            onChange={this.getSelecetedGroupModalChangeGroup}
                          />
                          
                          </Form.Field>
                          <div className="form-field">
                            <Button type="button" className="Button" onClick={this.changeUserGroups}>
                              Отправить
                        </Button>{' '}
                          </div>
                        </Form>
                      </Modal.Actions>
                      {/* форма */}
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
               {this.state.groupNotSelectedStatus ?
                <>
                  <div className="">Выбери группу</div>
                </>
                :
                <>
                </>
              }
              </div>
             </>
            {this.props.admin ? (
              <>
                <Modal
                  trigger={
                    <Button className="select" positive onClick={this.openAdd}>
                      Добавить группу
                </Button>
                
                  }
                  closeIcon
                  open={this.state.modalOpenAddGroup}
                  onClose={this.handleCloseAddGroup}
                // basic
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header className="regForm">
                        Добавить в группу
                  </Header>
                      {/* ФОрма */}
                      <Modal.Actions>
                        <Form className="regForm">
                          <Form.Field>
                            <label htmlFor="Название новой группы">Название новой группы</label>
                            <input type="text" name="Название новой группы" required onChange={this.newGroupName} />
                          </Form.Field>
                          <div className="form-field">
                            <Button type="button" className="Button" onClick={this.addNewGroup}>
                              Отправить
                        </Button>{' '}
                          </div>
                        </Form>
                      </Modal.Actions>
                      {/* форма */}
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
              <List.Item id={`${e._id}`} key={`${i}user`} className="item itemUser">
                <Checkbox defaultChecked={true} onChange={this.toggleCheckBox} />
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
    admin: state.User.user.adminstatus,
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
