import React, { Component } from 'react';
import News from '../components/News/News';
import VideoWindow from '../components/VideoWindow/VideoWindow';
export default class Home extends Component {
  render() {
    return (
      <div className="columnContainer">
        <News />
        <VideoWindow />
      </div>
    );
  }
}
