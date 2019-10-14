import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class PageWithoutGroup extends Component {
  render() {
    return (
      <div className="nonGroup">
        <h1 className="nonGroupTitle">
          Cкоро тебя определят в группу. <br /> А пока можно посмотреть видео.
          <br />
        </h1>
        <iframe
          src="https://www.youtube.com/embed/2pQ1vp0mcXQ"
          width="960"
          height="540"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    );
  }
}
