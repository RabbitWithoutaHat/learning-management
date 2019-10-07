import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { getTopicsData } from '../../redux/Lections/actions';
import { List } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel, CustomTab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class PhaseBar extends Component {
  state = {
    tabIndex: 0,
  };
  async componentDidMount() {
    await this.props.getTopics();
    console.log(this.props.topics.length);
  }

  render() {
    console.log(this.props.topics);

    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
        className="phaseTabs"
      >
        <TabList>
          {this.props.topics ? this.props.topics.map((phase, i) => <Tab key={`${i}tabs`}>Фаза {i + 1}</Tab>) : <p></p>}
        </TabList>
        {this.props.topics ? (
          this.props.topics.map((phase, i) => (
            <TabPanel key={`${i}phase`}>
              {phase.map((week, i) => (
                <>
                  <h3 className="weekTitle" key={`${i}week`}>
                    Неделя {week[0].week}
                  </h3>
                  <List>
                    {week.map((day, i) => (
                      <List.Item key={`${i}day`}>
                        <Link params={{ desc: day.description }} to={`/lections/${day._id}`}>
                          {day.topicName}
                        </Link>
                      </List.Item>
                    ))}
                  </List>
                </>
              ))}
            </TabPanel>
          ))
        ) : (
          <p></p>
        )}
      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    topics: state.Topics.topics,
    userName: state.User.user.login,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTopics: () => dispatch(getTopicsData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhaseBar);
