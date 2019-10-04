import { REQUESTED_NEWS,ADD_NEWS,REQUESTED_ERROR} from './types';

const initialState = {
  user: {
    login: '',
    status: false,
    message: '',
    loginMessage: '',
  },
  news:'', //News
  loading:'', //loading News data status
  error:'', //error News status
  
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
