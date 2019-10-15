import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicData } from '../../redux/MainPageTopic/action';

class VideoWindow extends Component {
  state = {
    videoSrc: '',
    GhLink: '',
    FileLink: 'https://github.com/RabbitWithoutaHat/learning-management/pull/25',
    File: 'lenin.svg',
    link: false,
    rr: '',
  };
  async componentDidMount() {
    await this.props.getTopic();

    const GhLink = this.props.topic.githubLink;
    await this.setState({ GhLink: GhLink });
  }

  render() {
    let videoSrc;
    if (this.props.topic.video) {
      videoSrc = this.props.topic.video;
      if (videoSrc.includes('watch')) {
        videoSrc = videoSrc.replace('watch?v=', 'embed/');
      } else {
        videoSrc = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
      }
    }

    return (
      <>
        {videoSrc ? (
          <div className="videoContainer">
            <h1>Тема урока: {this.props.topic.topicName}</h1>
            <div className="video">
              <iframe
                src={videoSrc}
                width="960"
                height="540"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>
            <div className="videoLinksFilesSegment">
              <div className="videoLinksFiles">
                <div className="videoLinks">
                  <a target="_blank" href={this.state.GhLink} rel="noopener noreferrer">
                    Задания на GitHub
                  </a>
                </div>
                <div className="videoFile">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Elbrus-Bootcamp/skeleton-express-session"
                  >
                    Код урока
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    topic: state.MainPage.topic,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTopic: () => dispatch(getTopicData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoWindow);
