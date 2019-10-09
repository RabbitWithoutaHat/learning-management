import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { getTopicsData } from '../../redux/Lections/actions';
import { List } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel, CustomTab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button } from 'semantic-ui-react'
import { Select } from 'semantic-ui-react'



class PhaseBar extends Component {
  state = {
    tabIndex:0,
    active: false, values: [], 
    search: '',
    countryOptions : [
      { key: 'af', value: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', text: 'Aland Islands' },
     
    ],
    selectedGroupName:'',
    groupNames:'',
  };
  async componentDidMount() {
    await this.props.getTopics();
    
    console.log(this.props.topics.length);
  }
addPhase= async() => {
  let resp = await fetch('/addphase')
  let data = await resp.json();
  await this.props.getTopics();
}
getSelecetedGroup = async(event, {value}) => {
  console.log('VALUE!!',value);
  let selectedGroup = event.target.textContent;
  console.log('text!!',selectedGroup);
  await this.props.getTopics(selectedGroup);
}
  render() {
  

    // console.log(this.state.data);
    return (
      <>
      <Select className='select' placeholder='Select your country' options={this.props.groupNames} 
       onChange={this.getSelecetedGroup}
      />
     
      {/* {()=>console.log(this.state.values)} */}
      {/* <div>erfwefwefwefew {this.state.values}</div> */}
     {/* <Select active={this.state.active}
         selection
         selected={this.state.values}
         placeholder="Select me"
         onSelectChange={val => this.setState({values: val, active: false})}
         onClick={() => this.setState({active: !this.state.active})}
         onRequestClose={() => this.setState({active: false})}
 >
     <Option >First</Option>
     <Option >Second</Option>
 </Select> */}
 <div>{this.state.tabIndex}</div>
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
        className="phaseTabs"
      >
        <div>
        </div>
        <TabList>
          {this.props.topics ? this.props.topics.map((phase, i) => <Tab key={`${i}tabs`}>Фаза {i + 1}</Tab>) : <p></p>}
          <Tab onClick={this.addPhase}>+</Tab>
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
                  <Button positive>+</Button>
                </>
              ))}
            </TabPanel>
          ))
        ) : (
            <p></p>
          )}
 <Button positive>Add week</Button>

 <div>{this.props.status?
 <div>ti admin</div>
 :
 <div>ti lox</div>
 }</div>
      </Tabs>
     </>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    topics: state.Topics.topics,
    groupNames:state.Topics. groupNames,
    selectedGroupName:state.Topics.selectedGroupName,
    userName: state.User.user.login,
    status:state.User.user.adminstatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTopics: (selectedGroup) => dispatch(getTopicsData(selectedGroup)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhaseBar);
