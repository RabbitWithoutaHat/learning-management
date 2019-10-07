import React, { Component } from 'react';
import PhaseBar from '../components/PhaseBar/PhaseBar';

export default class Lections extends Component {
  render() {
    return (
      <div className="lections">
        <h2 className="lectionsTitle">Лекции</h2>
        <PhaseBar />
      </div>
    );
  }
}
