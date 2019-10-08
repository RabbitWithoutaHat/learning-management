import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GhLink from '../GhLink/GhLink';
import Comments from '../Comments/Comments';
import File from '../File/File';
import FileLink from '../FileLink/FileLink';
import Video from '../Video/Video';
import { connect } from 'react-redux';
import { getTopicData } from '../../redux/MainPageTopic/action';
import download from 'js-file-download';

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
    const videoSrc = this.props.topic.video.replace('watch?v=', 'embed/');
    this.setState({ videoSrc: videoSrc });
    const GhLink = this.props.topic.githubLink;
    // const FileLink = this.props.topic.FileLink;
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
    const data = await resp.blob();
    console.log(data);
  
  }
  render() {
  
    return (
   
      <p className="videoContainer">
        <div className="video">
          <iframe
            src={this.state.videoSrc}
            width="640"
            height="480"
            //640 480
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
        <a href="this.state.GhLink">Задания на GitHub</a>
        <a href={this.state.FileLink}>{this.state.File}</a>
        <p>
          <p>
            <button onClick={this.but}>
              Download
              <Link
                // to={FilePath.filePath}
                to="./images/IMG_7778.jpg"
                download
                target="_blank"
              ></Link>
            </button>
          </p>
        </p>
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
