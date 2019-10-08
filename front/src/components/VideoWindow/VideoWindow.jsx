import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicData } from '../../redux/MainPageTopic/action';
import { Button, Segment } from 'semantic-ui-react';

class VideoWindow extends Component {
  state = {
    videoSrc: '',
    GhLink: '',
    FileLink: 'https://github.com/RabbitWithoutaHat/learning-management/pull/25',
    File: 'lenin.svg',
    link: false,
  };
  async componentDidMount() {
    await this.props.getTopic();
    let videoSrc = this.props.topic.video;
    if (videoSrc.includes('watch')) {
      videoSrc = videoSrc.replace('watch?v=', 'embed/');
    } else {
      videoSrc = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
    }
    this.setState({ videoSrc: videoSrc });
    const GhLink = this.props.topic.githubLink;
    this.setState({ GhLink: GhLink });
  }
  // async componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     // this.setState({FileLink:FileLink});
  //   }
  // }

  but = async e => {
    // console.log(this.state.File);
    const File = this.state.File;
    e.preventDefault();
    let resp = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ File }),
    });
  };
  render() {
    console.log(this.props.topic.topicName);

    return (
      <p className="videoContainer">
        <h1>Тема урока: {this.props.topic.topicName}</h1>
        <div className="video">
          <iframe
            src={this.state.videoSrc}
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
              <a target="_blank" href={this.state.GhLink}>
                Задания на GitHub
              </a>
              <a target="_blank" href={this.state.FileLink}>
                Ссылка на код
              </a>
            </div>
            <div className="videoFile">
              <p className="fileTitle">Файл к уроку</p>
              <Link
                // to={FilePath.filePath}
                to="./images/IMG_7778.jpg"
                download
                target="_blank"
              >
                <Button
                  basic
                  type="button"
                  color="violet"
                  className="btn btn-success btn-block"
                  content={this.state.File}
                  onClick={this.but}
                  icon="download"
                  fluid
                ></Button>
              </Link>
            </div>
          </div>
        </div>
      </p>
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
