import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { getTopicsData } from '../../redux/Lections/actions';
import { List } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel, CustomTab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// class PhaseBar extends Component {
//   //   async componentDidUpdate(prevProps) {
//   //     if (prevProps !== this.props) {

//   //       console.log(this.props.userName);
//   //  const userName = this.props.userName;
//   //       const resp = await fetch('/gettopics')
//   //       const data = await resp.json();
//   //       console.log(data);
//   //     }
//   //   }

class PhaseBar extends Component {
  state = {};
  componentDidMount() {
    this.props.getTopics();
  }
  render() {
    console.log(this.props.topics);

    return (
      <Tabs className="phaseTabs">
        <TabList>
          {this.props.topics ? this.props.topics.map((phase, i) => <Tab key={`${i}tabs`}>Фаза {i + 1}</Tab>) : <p></p>}
        </TabList>
        {this.props.topics ? (
          this.props.topics.map((phase, i) => (
            <TabPanel forceRender key={`${i}phase`}>
              {phase.map((week, i) => (
                <>
                  <h3 className="weekTitle" key={`${i}week`}>
                    Неделя {week[0].week}
                  </h3>
                  <List>
                    {week.map((day, i) => (
                      <List.Item>
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
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
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
