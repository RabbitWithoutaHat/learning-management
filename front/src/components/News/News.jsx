import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';

class News extends Component {
  componentDidMount() {
    this.props.getNews();
  }
  render() {
    return (
      <Segment>
        <Header as="h1" icon="plug" content={this.props.news} />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.News.news,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(getNewsData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);
