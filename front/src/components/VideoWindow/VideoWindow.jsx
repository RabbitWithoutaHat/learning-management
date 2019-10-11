import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicData } from '../../redux/MainPageTopic/action';

import FileSaver from 'file-saver';
// import FileDownload from 'js-file-download';

import { Button } from 'semantic-ui-react';

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

    let videoSrc = this.props.topic.video;
    // if(this.props.topic.video) {

    if (videoSrc.includes('watch')) {
      videoSrc = videoSrc.replace('watch?v=', 'embed/');
    } else {
      videoSrc = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
    }
    // }

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
    // const File = this.state.File;
    e.preventDefault();
    let resp = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ File }),
    });

    // const data = await resp.blob();
    // console.log(data);

    // console.log(dat);
    // // "application/zip"
    // const data = new Blob([dat], {type: 'image/svg+xml'});
    //                 const csvURL = window.URL.createObjectURL(data);
    //                 //window.open(csvURL);
    //                 // then commenting out the window.open & replacing
    //                 // with this allowed a file name to be passed out
    //                 const tempLink = document.createElement('a');
    //                 tempLink.href = csvURL;
    //                 tempLink.setAttribute('download', 'com.svg');
    //                 tempLink.click();

    // await this.setState({rr:data})
    // FileSaver.saveAs(data, 'com.svg');
    // FileDownload(data, 'com.svg');

    //for chrome in apple devices
    //  let url = window.URL.createObjectURL(data);
    //  let a = document.createElement('a');
    //  a.href = url;
    //  a.download = 'com.svg';
    //  a.click();

    // if(data) {
    //  await this.setState({link:true})
    // }
  };
  render() {
    return (
      <div className="videoContainer">
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
              <a target="_blank" rel="noopener noreferrer" href={this.state.GhLink}>
                Задания на GitHub
              </a>
              <a target="_blank" rel="noopener noreferrer" href={this.state.FileLink}>
                Ссылка на код
              </a>
            </div>
            <div className="videoFile">
              <a href="/img/download.png" download>
                123
              </a>
              <a href="http://localhost:5002/images/loop.zip" download target="_blank">
                Download
              </a>
              <Link
                // to={FilePath.filePath}
                to={this.state.rr}
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
