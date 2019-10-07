import React, { Component } from 'react';
import { getNewsData } from '../../redux/News/action';
import { connect } from 'react-redux';
// import { Route, Link, Redirect } from 'react-router-dom';
import { getTopicsData } from '../../redux/Lections/actions';
import { Tab } from 'semantic-ui-react';

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
//   // state = {
//   //   mass: [],
//   //   curarr: [],
//   //   phase1: [],
//   //   phase2: [],
//   // };
//   onlyUnique = (value, index, self) => {
//     return self.indexOf(value) === index;
//   };
//   async componentDidMount() {
//     await this.props.getTopics();
//     const arr = [1, 1, 1, 2, 34, 3, 3, 5, 7];
//     // console.log(this.props.topics);
//     this.setState({ mass: this.props.topics });
//     // const unique = arr.filter(onlyUnique);
//     // console.log(this.state.mass);

//     // const arr2 = this.props.topics;
//     // console.log(arr2);
//     const phase1 = this.state.mass.filter(el => el.phase === '1');
//     this.setState({ phase1: phase1 });
//     // .sort(el=>el.week);
//     const phase2 = this.state.mass.filter(el => el.phase === '2');
//     this.setState({ phase2: phase2 });
//     // console.log('phase1', phase1);
//   }

//   render() {
//     return (
//       <div>
//         <TabExampleBasic />
//       </div>
//     );
//   }
// }

const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

const PhaseBar = () => <Tab panes={panes} />;

const mapStateToProps = state => {
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
