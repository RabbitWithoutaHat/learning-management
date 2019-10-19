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
  GET_SELECTED_USERS,
  ADD_LOAD_STATUS,
} from './types';
import axios from 'axios';

export const addUser = (nickname, email, status, photo, group, groupName) => {
  return {
    type: ADD_USER,
    nickname: nickname,
    email: email,
    status: status,
    photo: photo,
    group: group,
    groupName: groupName,
  };
};
export const addMsg = (message, loading) => {
  return {
    type: ADD_MSG,
    message: message,
    loading: loading,
  };
};
export const addLogMsg = (loginMessage, loading) => {
  return {
    type: ADD_LOGMSG,
    loginMessage: loginMessage,
    loading: loading,
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
    nickname: data.nickname,
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
  };
};
const addLoadStatus = loading => {
  return {
    type: ADD_LOAD_STATUS,
    loading: loading,
  };
};
const requestSelectedUsers = data => {
  return {
    type: GET_SELECTED_USERS,
    selectedGroupList: data.groupNames,
    selectedGroupItems: data.selectedGroupItems,
  };
};

//thunk
const getSelectedUsers = selectedGroup => async dispatch => {
  try {
    const resp = await axios.post('/get-users', { groupName: selectedGroup });
    dispatch(requestSelectedUsers(resp.data));
  } catch (error) {}
};
const addRegUser = data => async dispatch => {
  try {
    let resp = await fetch('/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let user = await resp.json();
    console.log(user);

    if (user.nickname) {
      dispatch(addLoadStatus(true));
      dispatch(addUser(user.nickname, user.email, user.status, user.photo, user.group, user.groupName));
    } else {
      dispatch(addLogMsg(user.message, user.loading));
    }
  } catch (error) {}
};
const addAuthUser = data => async dispatch => {
  try {
    let resp = await fetch('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let user = await resp.json();
    if (user.nickname) {
      dispatch(addLoadStatus(true));
      dispatch(addUser(user.nickname, user.email, user.status, user.photo, user.group, user.groupName));
    } else {
      dispatch(addLogMsg(user.message, user.loading));
    }
  } catch (error) {}
};

const updateProfile = data => async dispatch => {
  try {
    const resp = await axios.post(
      '/update-profile',
      {
        email: data.data.email,
        password: data.data.password,
        nickname: data.data.nickname,
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
    const resp = await fetch('/get-users');
    const data = await resp.json();
    dispatch(requestUsers(data));
  } catch (error) {
    dispatch(requestErrorAC());
  }
};
const authcheck = () => async dispatch => {
  try {
    let resp = await fetch('/auth-check');
    let user = await resp.json();
    if (user.nickname) {
      dispatch(addUser(user.nickname, user.email, user.status, user.photo, user.group, user.groupName));
    } else {
      dispatch(delUser());
    }
  } catch (error) {
    dispatch(requestErrorAC());
  }
};

export { updateProfile, updateAvatar, getAllUsers, getSelectedUsers, addAuthUser, addRegUser, authcheck };
