import React, { Component } from 'react';
import GhLink from '../GhLink/GhLink';
import Comments from '../Comments/Comments';
import File from '../File/File';
import FileLink from '../FileLink/FileLink';
import Video from '../Video/Video';
export default class VideoWindow extends Component {
  render() {
    return (
      <div>
        <Video/>
        <GhLink/>
        <FileLink/>
        <File/>
        <Comments/>
      </div>
    )
  }
}
