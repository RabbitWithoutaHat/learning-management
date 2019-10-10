import {
  ADD_USER,
  DEL_USER,
  ADD_MSG,
  ADD_LOGMSG,
  UPDATE_AVATAR,
  UPDATE_PROFILE,
  AVATAR_TO_STATE,
  REQUESTED_FAILED,
  REQUEST_ALL_USERS,
} from './types';
import axios from 'axios';

export const addUser = (login, email,status,photo,group,groupName) => {
  return {
    type: ADD_USER,
    login: login,
    email: email,
    status:status,
    photo:photo,
    group:group,
    groupName:groupName,
  

  };
};
export const addMsg = message => {
  return {
    type: ADD_MSG,
    message: message,
  };
};
export const addLogMsg = loginMessage => {
  return {
    type: ADD_LOGMSG,
    loginMessage: loginMessage,
  };
};
export const delUser = () => {
  return {
    type: DEL_USER,
  };
};
export const avatarToState = photo => {
  return {
    type: AVATAR_TO_STATE,
    photo: photo,
  };
};
export const requestAvatarSuccessAC = photo => {
  return {
    type: UPDATE_AVATAR,
    photo: photo,
  };
};
const requestProfileSuccessAC = data => {
  return {
    type: UPDATE_PROFILE,
    email: data.email,
    login: data.login,
    phone: data.phone,
    photo: data.photo,
    group: data.group,
    groupName: data.groupName,
  };
};
const requestErrorAC = () => {
  return { type: REQUESTED_FAILED };
};

const requestUsers = data => {
  return {
    type: REQUEST_ALL_USERS,
    users: data,
  }
}

//thunk
const updateProfile = data => async dispatch => {
  try {
    const resp = await axios.post(
      '/update-profile',
      {
        email: data.data.email,
        password: data.data.password,
        nickname: data.data.login,
        phone: data.data.phone,
      },
      { withCredentials: true },
    );

    dispatch(requestProfileSuccessAC(resp.data));
  } catch (error) {
    dispatch(requestErrorAC());
  }
};

const updateAvatar = photo => async dispatch => {
  try {
    const data = new FormData();
    data.append('photo', photo);
    const resp = await axios.post('/upload-avatar', data, { withCredentials: true });

    dispatch(requestAvatarSuccessAC(resp.data.data));
  } catch (error) {
    dispatch(requestErrorAC());
  }
};

const getAllUsers = () => async dispatch => {
  try {
    const resp = await fetch('/get-users')
    const data = await resp.json();
    dispatch(requestUsers(data));

  } catch (error) {
    dispatch(requestErrorAC());
  }
}

export { updateProfile, updateAvatar, getAllUsers };
