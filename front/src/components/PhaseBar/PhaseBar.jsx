import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopicsData } from '../../redux/Lections/actions';
import { List } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button } from 'semantic-ui-react';
import { Select } from 'semantic-ui-react';

class PhaseBar extends Component {
  state = {
    tabIndex: 0,
    active: false,
    values: [],
    search: '',
    selectedGroupName: '',
    groupNames: '',
  };
  async componentDidMount() {
    await this.props.getTopics();
  }
  addPhase = async () => {
    // let resp = await fetch('/addphase')
    let group = this.state.selectedGroupName;
    let resp = await fetch('/addphase', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group }),
    });
    let dataresp = await resp.json();
    console.log('AAAAAAAAAADDDD PHAEEEEEE',dataresp);
    await this.props.getTopics(dataresp.group);
  }
  getSelecetedGroup = async (event, { value }) => {
    console.log('VALUE!!', value);
    let selectedGroup = event.target.textContent;
    this.setState({ selectedGroupName: selectedGroup });
    console.log('text!!', selectedGroup);
    await this.props.getTopics(selectedGroup);
  };

  addWeek = async e => {
    e.preventDefault();
    this.func();
  };
  func = async () => {
    let data = {
      phase: this.state.tabIndex,
    };
    let resp = await fetch('/addweek', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let dataresp = await resp.json();
    console.log('DDDDDDDDDDAAATATTA',dataresp);
    // await this.props.getTopics(dataresp);
  }
  render() {
    // console.log(this.state.data);
    return (
      <>
        {this.props.admin ? (
          <>
            <Select
              className="select"
              placeholder="Select your country"
              options={this.props.groupNames}
              onChange={this.getSelecetedGroup}
            />
          </>
        ) : (
          <></>
        )}
        {/* <div>{this.state.tabIndex}</div> */}
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
          className="phaseTabs"
        >
          <div></div>
          <TabList>
            {this.props.topics ? (
              this.props.topics.map((phase, i) => <Tab key={`${i}tabs`}>Фаза {i + 1}</Tab>)
            ) : (
              <p></p>
            )}
            {this.props.admin ? (
              <>
                <Tab onClick={this.addPhase}>+</Tab>
              </>
            ) : (
              <></>
            )}
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
                    {this.props.admin ? (
                      <>
                        <Button basic color="violet" icon="plus"></Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </TabPanel>
            ))
          ) : (
            <p></p>
          )}
          {this.props.admin ? (
            <>
              <Button className="addWeek" basic color="violet" icon="plus">
                Добавить неделю
              </Button>
            </>
          ) : (
            <></>
          )}
        </Tabs>
      </>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    topics: state.Topics.topics,
    groupNames: state.Topics.groupNames,
    selectedGroupName: state.Topics.selectedGroupName,
    userName: state.User.user.login,
    admin: state.User.user.adminstatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTopics: selectedGroup => dispatch(getTopicsData(selectedGroup)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhaseBar);
