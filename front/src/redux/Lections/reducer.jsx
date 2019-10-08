import { REQUESTED_TOPICS, REQUESTED_ERROR, ADD_TOPICS } from './types';

const initialState = {
  topics: [],
  loading: '', //loading Topics status
  error: '', //error Topics status
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_TOPICS: {
      return {
        ...state,
        topics: action.topics,
        loading: true,
        error: false,
      };
    }
    case ADD_TOPICS: {
      return {
        ...state,
        topics: action.topics,
        allTopics: action.allTopics,
        loading: true,
        error: false,
      };
    }
    case REQUESTED_ERROR: {
      return {
        ...state,
        topics: '',
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
