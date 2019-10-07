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
    const videostr = videoSrc.replace('watch?v=', 'embed/');
    this.setState({ topic: topic, videostr: videostr });
    console.log(topic);
  }

  render() {
    return (
      <div>
        <div>
          <iframe
            src={this.state.videostr}
            width="640"
            height="480"
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
