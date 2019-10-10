import { REQUESTED_TOPICS, REQUESTED_ERROR, ADD_TOPICS } from './types';
// import {getNewsData} from '../../components/News/News';
export const requestTopics = () => {
  return {
    type: REQUESTED_TOPICS,
  };
};
export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics: topics.result,
    allTopics: topics.topics,
    groupNames: topics.groupNames,
    selectedGroupName: topics.selectedGroupName,
  };
};
export const requestError = () => {
  return {
    type: REQUESTED_ERROR,
  };
};
// thunk!
export const getTopicsData = selectedGroup => async dispatch => {
  try {
    dispatch(requestTopics());
    // const resp = await fetch('/gettopics');
    let resp = await fetch('/gettopics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedGroup }),
    });
    const data = await resp.json();
    dispatch(addTopics(data));
  } catch (err) {
    dispatch(requestError());
  }
};
