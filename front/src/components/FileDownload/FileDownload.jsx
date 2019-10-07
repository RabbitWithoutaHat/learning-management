import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

 class FileDownload extends Component {
   but = async e => {
    e.preventDefault();
    const resp = await fetch('/downloadtest');
    const data = await resp;
    console.log('data.body');

  }
  render() {
    return (
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
    );
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
)(FileDownload);
