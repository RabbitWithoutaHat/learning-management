import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GhLink from '../GhLink/GhLink';
import Comments from '../Comments/Comments';
import File from '../File/File';
import FileLink from '../FileLink/FileLink';
import Video from '../Video/Video';

import FileSaver from 'file-saver';
import { connect } from "react-redux";
import { getTopicData } from '../../redux/MainPageTopic/action';
import download from 'js-file-download';




class VideoWindow extends Component {
  state = {
    videoSrc: '',
    GhLink: '',
    FileLink: 'https://github.com/RabbitWithoutaHat/learning-management/pull/25',
    File:'lenin.svg',
    link:false,
  }
  async componentDidMount() {
    this.props.getTopic();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const videoSrc = this.props.topic.video.replace('watch?v=', 'embed/')
      this.setState({ videoSrc: videoSrc });
      const GhLink = this.props.topic.githubLink;
      // const FileLink = this.props.topic.FileLink;
      this.setState({GhLink:GhLink});
      // this.setState({FileLink:FileLink});
    }
  }

  but = async e => {
    // console.log(this.state.File);
    const File = this.state.File
    e.preventDefault();
    let resp = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({File}),
    });
    const data = await resp.blob();
    console.log(data);
    FileSaver.saveAs(data, 'lenin.svg');
  }
  downloadEmployeeData = () => {
		fetch('/download')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'lenin.svg';
					a.click();
				});
				//window.location.href = response.url;
		});
  }
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
      //   <File/>
      //   <Comments/>
      // </div>
      <div>
<div className="App-intro">
 <h3>Download a random file</h3>
 <button onClick={this.downloadEmployeeData}>Download</button>
</div>
        <div>
          <iframe src={this.state.videoSrc}
            width='640' height='480'
            //640 480
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video' />
        </div>
        <div>
          Gh:
          
        {this.state.GhLink}
        </div>
        <div>
          F:
        {this.state.FileLink}
        </div>
        <div>
         
          File:
          {this.state.File}
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
    )
  }
}

const mapStateToProps = state => {
  return {
    topic: state.MainPage.topic,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTopic: () => dispatch(getTopicData())

  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoWindow);
