import React, { Component } from 'react'
import News from '../components/News/News';
import Video from '../components/Video/Video';
import VideoWindow from '../components/VideoWindow/VideoWindow';
export default class Home extends Component {
  render() {
    return (
      <div>
      <News/>
      <VideoWindow/>
     </div>
    )
  }
}
