import React, { Component } from 'react';

export default class Video extends Component {
  state = {
    // videoURL: 'https://elbrus-bootcamp.github.io/Elbrus-Bootcamp/images/index.mp4'
    // videoURL :'https://www.youtube.com/watch?v=aYnybphDpeA'
  };
  render() {
    console.log(this.props);

    return (
      <div>
        {/* <video className="video" autoplay="" muted loop>
        <source src={this.state.videoURL} type="video/mp4" />
        <source src={this.state.videoURL} type="video/ogg" />
        Your browser does not support the video tag.
            </video> */}
        <iframe
          src="https://www.youtube.com/embed/aYnybphDpeA"
          width="640"
          height="480"
          //640 480
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    );
  }
}
