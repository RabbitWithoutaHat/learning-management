import { REQUESTED_TOPICS } from './types';
// import {getNewsData} from '../../components/News/News';
export const requestTopics = () => {
  return {
    type: REQUESTED_TOPICS
  }
};

// thunk!
export const getNewsData = () => async (dispatch) => {
  try {
    dispatch(requestTopics());
    const resp = await fetch('/gettopics');
    const data = await resp.json();
    console.log('FRONT!!', data.topics);
    } catch (err) {
    dispatch(requestError());
  }
};