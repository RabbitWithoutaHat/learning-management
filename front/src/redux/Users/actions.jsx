import {ADD_USER, DEL_USER, ADD_MSG} from './types';

export const addUser = login => {
  return {
    type: ADD_USER,
    login: login,
  };
};
export const addMsg = (message) => {
  return {
    type: ADD_MSG,
    message: message,
  };
};
export const delUser = () => {
  return {
    type: DEL_USER,
  };
};
