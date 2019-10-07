import { REQUESTED_TOPIC,REQUESTED_ERROR, ADD_TOPIC } from './types';
// import {getNewsData} from '../../components/News/News';
export const requestTopic = () => {
  return {
    type: REQUESTED_TOPIC,
  };
};
export const addTopic = topic => {
  return {
    type: ADD_TOPIC,
    topic: topic,
  };
};
export const requestError = () => {
  return {
    type: REQUESTED_ERROR,
  };
};
// thunk!
export const getTopicData = () => async dispatch => {
  try {
    dispatch(requestTopic());
    const resp = await fetch('/getDayData');
    const data = await resp.json();
    dispatch(addTopic(data));
    // console.log(data);
  } catch (err) {
    dispatch(requestError());
  }
};
