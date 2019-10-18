import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopicsData, addPhase, addDay, addWeek } from '../../redux/Lections/actions';
import { List, Button, Select } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class PhaseBar extends Component {
  state = {
    tabIndex: 0,
    active: false,
    values: [],
    search: '',
    selectedGroupName: '',
    groupNames: '',
    currentDaysOfClickedWeek: 0,
    groupNotSelectedStatus: false,
  };
  async componentDidMount() {
    await this.props.getTopics();
    this.setState({ selectedGroupName: this.props.selectedGroupName });
  }
  addPhase = async () => {
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      this.setState({ groupNotSelectedStatus: false });
      let group = this.state.selectedGroupName;
      await this.props.addPhase(group);
      await this.props.getTopics(group);
    }
  };
  getSelecetedGroup = async (event, { value }) => {
    let selectedGroup = event.target.textContent;

    this.setState({ selectedGroupName: selectedGroup });
    this.setState({ groupNotSelectedStatus: false });
    await this.props.getTopics(selectedGroup);
  };

  addDay = async e => {
    e.preventDefault();
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      const plus = document.querySelector('.plus');
      let numberOfDays = 0;
      let numberOfWeek = 0;
      if (e.target.className === plus.className) {
        numberOfDays = e.target.parentNode.parentNode.firstChild.childElementCount;
        numberOfWeek = e.target.parentNode.id;
      } else {
        numberOfDays = e.target.parentNode.firstChild.childElementCount;
        numberOfWeek = e.target.id;
      }
      let data = {
        phase: this.state.tabIndex,
        group: this.state.selectedGroupName,
        day: numberOfDays,
        week: numberOfWeek,
      };
      await this.props.addDay(data);
      await this.setState({ currentDaysOfClickedWeek: numberOfDays });
      await this.props.getTopics(this.state.selectedGroupName);
    }
  };
  addWeek = async e => {
    e.preventDefault();
    if (this.state.selectedGroupName === '') {
      this.setState({ groupNotSelectedStatus: true });
    } else {
      this.func();
    }
  };
  func = async () => {
    let data = {
      phase: this.state.tabIndex,
      group: this.state.selectedGroupName,
    };
    await this.props.addWeek(data);
    await this.props.getTopics(this.state.selectedGroupName);
  };
  render() {
    return (
      <>
        {this.props.admin === 'admin' && this.props.groupNames ? (
          <>
            <div className="select selectDiv">
              <Select
                className="select"
                placeholder={this.props.selectedGroupName}
                options={this.props.groupNames}
                onChange={this.getSelecetedGroup}
              />
              {this.state.groupNotSelectedStatus ? (
                <>
                  <div className="">Выбери группу</div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
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
            {this.props.admin === 'admin' ? (
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
                    <List className="weekList">
                      <div className="daysList">
                        {week.map((day, i) => (
                          <List.Item className="topicListItem" key={`day`}>
                            <Link params={{ desc: day.description }} to={`/topics/${day._id}`}>
                              {day.topicName}
                            </Link>
                          </List.Item>
                        ))}
                      </div>
                      <Button
                        className="addDayButton"
                        id={`${week[0].week}`}
                        basic
                        color="violet"
                        icon="plus"
                        onClick={this.addDay}
                      ></Button>
                    </List>
                  </>
                ))}
              </TabPanel>
            ))
          ) : (
            <p></p>
          )}
          {this.props.admin === 'admin' ? (
            <>
              <Button className="addWeek" basic color="violet" icon="plus" onClick={this.addWeek}>
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
  return {
    topics: state.Topics.topics,
    groupNames: state.Topics.groupNames,
    selectedGroupName: state.Topics.selectedGroupName,
    userName: state.User.user.nickname,
    admin: state.User.user.adminstatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addPhase: group => dispatch(addPhase(group)),
    addWeek: data => dispatch(addWeek(data)),
    addDay: data => dispatch(addDay(data)),
    getTopics: selectedGroup => dispatch(getTopicsData(selectedGroup)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhaseBar);
