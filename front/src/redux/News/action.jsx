import { REQUESTED_NEWS, ADD_NEWS, REQUESTED_ERROR } from './types';
// import {getNewsData} from '../../components/News/News';
export const requestNews = () => {
  return {
    type: REQUESTED_NEWS,
  };
};
export const addNews = news => {
  return {
    type: ADD_NEWS,
    news: news,
  };
};
export const requestError = () => {
  return {
    type: REQUESTED_ERROR,
  };
};
// thunk!
export const getNewsData = () => async dispatch => {
  try {
    dispatch(requestNews());
    const resp = await fetch('/getnews');
    const data = await resp.json();
    dispatch(addNews(data.news));
  } catch (err) {
    dispatch(requestError());
  }
};
