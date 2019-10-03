import { ADD_USER, DEL_USER, ADD_MSG } from './types';

const initialState = {
  user: {
    login: '',
    status: false,
    message: '',
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: { login: action.login, status: true, points: 0 },
      };
    }
    case ADD_MSG: {
      return {
        ...state,
        user: { message: action.message },
      };
    }
    case DEL_USER: {
      return {
        ...state,
        user: { login: '', status: false },
      };
    }
    default:
      return state;
  }
}
