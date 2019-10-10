import { REQUESTED_NEWS, ADD_NEWS, REQUESTED_ERROR, ADD_EVENTS } from './types';
import axios from 'axios';
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
export const addEvents = events => {
  return {
    type: ADD_EVENTS,
    events: events,
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

export const getCalendar = () => async dispatch => {
  try {
    dispatch(requestNews());
    const data = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/eeu26g0ks81b97lghfrgoh2d84@group.calendar.google.com/events',
      {
        headers: {
          Authorization:
            'Bearer ya29.Il-bB_Aast9yaoQXFS8FRHCbj-NgQOMRQuVZRzwsSJbVDE5simSbF4D-78reQTh6kqEcG7i9mto20Yhg59BqvNNnYYuKzRyLfMl_INKXT8V6pezGqVfHSkbDMEbAgaxxlA',
        },
      },
    );
    dispatch(addEvents(data.data));
    // console.log(data.data);
  } catch (err) {
    dispatch(requestError());
  }
};
