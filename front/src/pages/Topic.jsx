import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { getTopicsData } from '../redux/Lections/actions';

class Topic extends Component {
  state = {
    topic: {},
    videostr: '',
    str: '',
    FileLink: 'https://github.com/RabbitWithoutaHat/learning-management/pull/25',
    File: 'lenin.svg',
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
    console.log(this.state.topic);

    return (
      <div className="videoContainer">
        <h1>Тема урока: {this.state.topic.topicName}</h1>
        <div className="video">
          <iframe
            src={this.state.videostr}
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
              <a target="_blank" href={this.state.topic.githubLink}>
                Задания на GitHub
              </a>
              <a target="_blank" href={this.state.FileLink}>
                Код урока
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
