import React, { Component } from 'react'
import { getNewsData } from '../../redux/News/action';
import { connect } from "react-redux";
import { Route, Link, Redirect } from 'react-router-dom';
class News extends Component {
  componentDidMount() {
    this.props.getNews();
  }
  render() {
    return <div>{this.props.news}</div>;
  }
}

const mapStateToProps = state => {
  return {
    news: state.News.news,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(getNewsData())

  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);
