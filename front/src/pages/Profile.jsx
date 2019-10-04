import React, { Component } from 'react';
import { Label, Image, Form } from 'semantic-ui-react';
import Avatar from '../components/Avatar/Avatar';

export default class Profile extends Component {
  state = {
    email: '',
    password: '',
    dataLoaded: false,
    nickname: '',
    group: '',
    photo: '',
    phone: '',
  };
  render() {
    return (
      <>
        <Form className="col-6">
          <Label className="groupLabel" as="a" color="blue" ribbon>
            Группа{this.state.group}
          </Label>
          <Form.Field>
            <label htmlFor="email">email</label>
            <input value={this.state.email} type="text" name="email" required onChange={this.email} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="nickname">Имя</label>
            <input value={this.state.nickname} type="text" name="nickname" required onChange={this.nickname} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Пароль</label>
            <input value={this.state.password} type="text" name="password" required onChange={this.password} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="phone">Телефон</label>
            <input value={this.state.phone} type="text" name="phone" required onChange={this.phone} />
          </Form.Field>
        </Form>
        <div className="col-6">
          <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" size="small" circular />
        </div>
      </>
    );
  }
}
