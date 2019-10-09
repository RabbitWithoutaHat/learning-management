import { REQUEST_ALL_TESTS } from './types';

const initialState = {
  tests: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_TESTS: {
      return {
        ...state,
        tests: action.tests,
      }
    }
    default:
      return state;
  }
}