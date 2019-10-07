import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicsData } from '../redux/Lections/actions';

class Topic extends Component {
  state = {
    topic: {},
    videostr: '',
    str: '',
  };
  async componentDidMount() {
    await this.props.getTopics();
    const topic = this.props.allTopics.find(el => el._id === this.props.match.params.id);
    const videoSrc = topic.video;
    let videostr = '';
    if (videoSrc.includes('watch')) {
      videostr = videoSrc.replace('watch?v=', 'embed/');
    } else {
      videostr = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
    }
    this.setState({ topic: topic, videostr: videostr });
    console.log(this.state.topic.topicName);
  }

  render() {
    return (
      <div className="videoContainer">
        <h1>{this.state.topic.topicName}</h1>
        <div className="video">
          <iframe
            src={this.state.videostr}
            width="900"
            height="560"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
        <a target="_blank" href={this.state.topic.githubLink}>
          Задание на GitHub
        </a>
        <div>FileLink</div>
        <div>
          {/* {uploadedFile} */}
          File
          <div>
            <button onClick={this.but}>
              Download
              <Link
                // to={FilePath.filePath}
                to="./images/IMG_7778.jpg"
                download
                target="_blank"
              ></Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allTopics: state.Topics.allTopics,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // getNews: () => dispatch(getNewsData())
    getTopics: () => dispatch(getTopicsData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topic);
