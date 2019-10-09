import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GhLink from '../GhLink/GhLink';
import Comments from '../Comments/Comments';
import File from '../File/File';
import FileLink from '../FileLink/FileLink';
import Video from '../Video/Video';
import { connect } from 'react-redux';
import { getTopicData } from '../../redux/MainPageTopic/action';
import FileSaver from 'file-saver';
import FileDownload from 'js-file-download';

class VideoWindow extends Component {
  state = {
    videoSrc: '',
    GhLink: '',
    FileLink: 'https://github.com/RabbitWithoutaHat/learning-management/pull/25',
    File: 'lenin.svg',
    link: false,
    rr:'',
  };
  async componentDidMount() {
    await this.props.getTopic();
    // if(this.props.topic.video) {
      console.log(this.props.topic.video);
      
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
    // const videoSrc = this.props.topic ?
    //  (this.props.topic.video.replace('watch?v=','embed/'),
    //  GhLink =  this.props.topic.GhLink,
    //  FileLink = this.props.topic.FileLink
    // //  File = this.props.topic.
    //  )

    //  :0;

    return (
      // <div>
      //   <Video/>
      //   <GhLink/>
      //   <FileLink/>
        // <File/>
      //   <Comments/>
      // </div>
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
              </button>
              <Link
                // to={FilePath.filePath}
                to={this.state.rr}
                download
                target="_blank"
              >xxx</Link>
            
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
