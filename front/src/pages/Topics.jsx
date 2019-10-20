import React, { Component } from 'react';
import PhaseBar from '../components/PhaseBar/PhaseBar';

export default class Topics extends Component {
  render() {
    return (
      <div className="lections">
        <h1 className="lectionsTitle">Лекции</h1>
        <PhaseBar />
      </div>
    );
  }
}
