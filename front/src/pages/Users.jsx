import React, { Component } from 'react'
import UsersList from '../components/UsersList/UsersList'
import { Header } from 'semantic-ui-react';


export default class Users extends Component {
  render() {
    return (
      <>
        <Header as='h1'>Студенты</Header>
        <UsersList />
      </>
    )
  }
}
