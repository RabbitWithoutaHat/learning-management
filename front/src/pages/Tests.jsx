import React, { Component } from 'react'
import TestList from '../components/TestList/TestList'
import { Header } from 'semantic-ui-react';


export default class Users extends Component {
  render() {
    return (
      <>
        <Header as='h1'>Тесты</Header>
        <TestList />
      </>
    )
  }
}
