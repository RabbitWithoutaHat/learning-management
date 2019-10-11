import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCalendar } from '../../redux/News/action';

class Calendar extends Component {
  state = {
    events: [],
  };
  componentDidMount = () => {
    this.props.getCalendar();
  };
  render() {
    // console.log(this.props.events ? this.props.events[0].summary : 'asdasd');

    return (
      <p>
        {this.props.events ? (
          this.props.events.map((event, i) => <li key={`${i}event`}>{`${event.start.date} - ${event.summary}`}</li>)
        ) : (
          <span></span>
        )}
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.News.events.items,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCalendar: () => dispatch(getCalendar()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
