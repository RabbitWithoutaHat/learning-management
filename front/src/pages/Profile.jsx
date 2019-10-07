import React, { Component } from 'react';
import { Label, Image, Form, Button } from 'semantic-ui-react';
import { updateAvatar, updateProfile, avatarToState } from '../redux/Users/actions';
import { connect } from 'react-redux';

class Profile extends Component {
  state = {
    email: '',
    password: '',
    dataLoaded: false,
    login: '',
    group: '',
    photo: '',
    phone: '',
    imgSrc: '',
    tempSrc: '',
  };
  src = '';
  fileInputRef = React.createRef();
  componentDidMount() {
    this.props.updateProfile({ data: this.state });
  }
  // componentDidUpdate() {
  //   if (prevProps.data !== this.props.data) {

  //   }
  // }

  onClickHandler = e => {
    this.props.updateAvatar(this.props.photo);
    this.props.updateProfile({ data: this.state });
    this.setState({ email: '', password: '', login: '', phone: '' });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  uploadPhoto = e => {
    this.props.avatarToState(e.target.files[0]);
    this.setState({
      tempSrc: URL.createObjectURL(e.target.files[0]),
    });
  };
  render() {
    console.log(this.props);
    return (
      <>
        <Form className="col-8">
          <Label className="groupLabel" as="a" color="blue" ribbon>
            {this.props.groupName ? this.props.groupName : <span>Группа</span>}
          </Label>
          <Form.Field>
            <label htmlFor="email">email</label>
            <input
              value={this.state.email}
              type="text"
              name="email"
              required
              onChange={this.onChange}
              placeholder={this.props.email}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="login">Имя</label>
            <input
              value={this.state.login}
              type="text"
              name="login"
              required
              onChange={this.onChange}
              placeholder={this.props.login ? this.props.login : ''}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Пароль</label>
            <input value={this.state.password} type="password" name="password" required onChange={this.onChange} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="phone">Телефон</label>
            <input
              value={this.state.phone}
              type="text"
              name="phone"
              required
              onChange={this.onChange}
              placeholder={this.props.phone ? this.props.phone : ''}
            />
          </Form.Field>
          <Button
            basic
            type="button"
            color="violet"
            className="btn btn-success btn-block"
            onClick={this.onClickHandler}
            fluid
          >
            Обновить профиль
          </Button>
        </Form>
        <div className="col-4 avatar">
          <Image
            src={
              this.state.tempSrc
                ? this.state.tempSrc
                : this.props.photoSrc
                ? `/images/${this.props.photoSrc}`
                : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
            }
            size="small"
            circular
          />
          <Button
            content="Выбрать фото"
            labelPosition="left"
            // icon="file"
            onClick={() => this.fileInputRef.current.click()}
          />
          <input ref={this.fileInputRef} name="photo" type="file" hidden onChange={this.uploadPhoto} />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);

  return {
    email: state.User.user.email,
    login: state.User.user.login,
    photo: state.User.user.photo,
    phone: state.User.user.phone,
    group: state.User.user.group,
    groupName: state.User.user.groupName,
    photoSrc: state.User.user.photoSrc,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateProfile: data => dispatch(updateProfile(data)),
    avatarToState: photo => dispatch(avatarToState(photo)),
    updateAvatar: photo => dispatch(updateAvatar(photo)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
