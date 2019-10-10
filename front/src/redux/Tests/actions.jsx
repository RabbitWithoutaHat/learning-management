import { REQUEST_ALL_TESTS, REQUESTED_FAILED } from './types';

const requestTests = data => {
  return {
    type: REQUEST_ALL_TESTS,
    tests: data,
  };
};

const requestErrorAC = () => {
  return { type: REQUESTED_FAILED };
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

export { getAllTests };
