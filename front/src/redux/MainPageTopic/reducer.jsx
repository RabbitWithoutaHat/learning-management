import { REQUESTED_TOPIC,REQUESTED_ERROR, ADD_TOPIC } from './types';

const initialState = {
  user: {
    login: '',
    status: false,
    message: '',
    loginMessage: '',
  },
  topic:'', //TOpic
  loading:'', //loading Topic data status
  error:'', //error TOpic status
  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TOPIC: {
      return {
        ...state,
        topic: action.topic,
        loading: true,
        error: false,
      };
    }
    case REQUESTED_TOPIC: {
      return {
        ...state,
        topic: '',
        loading: true,
        error: false,
      };
    }
    case REQUESTED_ERROR: {
      return {
        ...state,
        topic: '',
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
