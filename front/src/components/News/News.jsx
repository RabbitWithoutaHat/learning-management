import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';

import { Message } from 'semantic-ui-react';

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
          header={this.props.event.summary}
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
    event: state.News.event,
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
