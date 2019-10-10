import { REQUEST_ALL_TESTS, GET_SELECTED_USERS } from './types';

const initialState = {
  test: {
    tests: [],
    selectedGroupList: [],
    selectedGroupTests: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_TESTS: {
      return {
        ...state,
        tests: action.tests,
      }
    }
    case GET_SELECTED_USERS: {
      return {
        ...state,
        selectedGroupList: action.selectedGroupList,
        selectedGroupTests: action.selectedGroupTests,
      };
    }
    default:
      return state;
  }
}