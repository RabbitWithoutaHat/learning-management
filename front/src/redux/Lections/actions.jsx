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
  };
};
export const requestError = () => {
  return {
    type: REQUESTED_ERROR,
  };
};
// thunk!
export const getTopicsData = () => async dispatch => {
  try {
    dispatch(requestTopics());
    const resp = await fetch('/gettopics');
    const data = await resp.json();
    console.log(data);

    console.log(data.result);
    dispatch(addTopics(data));
  } catch (err) {
    dispatch(requestError());
  }
};
