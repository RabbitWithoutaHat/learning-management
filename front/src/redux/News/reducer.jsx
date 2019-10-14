import { REQUESTED_NEWS, ADD_NEWS, REQUESTED_ERROR, ADD_EVENTS } from './types';

const initialState = {
  user: {
    login: '',
    status: false,
    message: '',
    loginMessage: '',
  },
  news: '', //News
  loading: '', //loading News data status
  error: '', //error News status
  events: [],
  event: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEWS: {
      return {
        ...state,
        news: action.news,
        loading: true,
        error: false,
      };
    }
    case ADD_EVENTS: {
      return {
        ...state,
        events: action.events,
        event: action.event,
        loading: true,
        error: false,
      };
    }
    case REQUESTED_NEWS: {
      return {
        ...state,
        news: '',
        loading: true,
        error: false,
      };
    }
    case REQUESTED_ERROR: {
      return {
        ...state,
        news: '',
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
