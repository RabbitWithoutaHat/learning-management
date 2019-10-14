import { REQUESTED_NEWS, ADD_NEWS, REQUESTED_ERROR, ADD_EVENTS } from './types';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
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
    events: events.events,
    event: events.event,
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
    const resp = await axios.get('/token');
    const newToken = await resp.data;
    const token = `Bearer ${newToken}`;
    const data = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/eeu26g0ks81b97lghfrgoh2d84@group.calendar.google.com/events',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const events = data.data.items;
    const nowDate = new Date();
    const eventsObj = {};
    const dateStr = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
    events.map(e => {
      if (e.start.dateTime) {
        const newDate = new Date(Date.parse(e.start.dateTime));
        const time = moment(e.start.dateTime)
          .locale('ru')
          .format('LT');
        const dateStr = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        eventsObj[dateStr] = `Новости: ${time} - ${e.summary}`;
      } else {
        eventsObj[e.start.date] = `Новости: ${e.summary}`;
      }
    });
    const event = {};
    for (let prop in eventsObj) {
      if (prop === dateStr) {
        event['summary'] = `${eventsObj[prop]}`;
      }
    }
    dispatch(addEvents({ events: data.data, event }));
  } catch (err) {
    dispatch(requestError());
  }
};
