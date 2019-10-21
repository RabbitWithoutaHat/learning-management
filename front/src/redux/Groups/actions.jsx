import { CHANGE_LOAD_STATUS } from './types';

export const changeLoadStatus = () => {
  return {
    type: CHANGE_LOAD_STATUS,
  };
};

//thunk
const addNewGroup = data => async dispatch => {
  try {
    await fetch('/group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    dispatch(changeLoadStatus());
  } catch (error) {}
};
const changeGroup = data => async dispatch => {
  try {
    await fetch('/group', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    dispatch(changeLoadStatus());
  } catch (error) {}
};

export { addNewGroup, changeGroup };
