import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import GhLink from '../GhLink/GhLink';
import Comments from '../Comments/Comments';
import File from '../File/File';
import FileLink from '../FileLink/FileLink';
import Video from '../Video/Video';
import { connect } from "react-redux";
class VideoWindow extends Component {
  async componentDidMount() {
    // this.props.getDayData();
    const resp = await fetch('/getDayData');
    const data = await resp.json();
  console.log(data);
  
  }
  render() {
    return (
      // <div>
      //   <Video/>
      //   <GhLink/>
      //   <FileLink/>
      //   <File/>
      //   <Comments/>
      // </div>
      <div>
        <div>
          <iframe src='https://www.youtube.com/embed/aYnybphDpeA'
            width='640' height='480'
            //640 480
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video' />
        </div>
        <div>
          Gh LInk
     </div>
        <div>
          FileLink
     </div>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    // news: state.News.news,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // getNews: () => dispatch(getNewsData())

  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoWindow);
