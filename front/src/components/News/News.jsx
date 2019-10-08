import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';
import { Segment, Message } from 'semantic-ui-react';

class News extends Component {
  state = { visible: true };
  componentDidMount() {
    this.props.getNews();
  }
  handleDismiss = () => {
    this.setState({ visible: false });
  };
  render() {
    if (this.state.visible) {
      return (
        <Message
          floating
          onDismiss={this.handleDismiss}
          className="newsMessage"
          info
          header={this.props.news}
          content="
    "
          color="violet"
        />
      );
    }
    return <span></span>;
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
