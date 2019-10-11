import { GET_SELECTED_USERS, REQUEST_ALL_TESTS, REQUESTED_FAILED } from './types';
import axios from 'axios';

const requestTests = data => {
  return {
    type: REQUEST_ALL_TESTS,
    tests: data,
  };
};

const requestSelectedUsers = data => {
  return {
    type: GET_SELECTED_USERS,
    selectedGroupList: data.groupNames,
    selectedGroupItems: data.selectedGroupItems,
  };
};

const requestErrorAC = () => {
  return { type: REQUESTED_FAILED };
};

const getSelectedUsers = selectedGroup => async dispatch => {
  try {
    const resp = await axios.post('/get-tests', { groupName: selectedGroup });
    console.log(resp.data);
    dispatch(requestSelectedUsers(resp.data));
  } catch (error) { }
};

const getAllTests = () => async dispatch => {
  try {
    const resp = await fetch('/get-tests');
    const data = await resp.json();
    dispatch(requestTests(data));
  } catch (error) {
    dispatch(requestErrorAC());
  }
};

export { getAllTests, getSelectedUsers };
