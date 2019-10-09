import { ADD_USER, DEL_USER, ADD_MSG, ADD_LOGMSG, UPDATE_AVATAR, UPDATE_PROFILE, AVATAR_TO_STATE, REQUEST_ALL_USERS } from './types';

const initialState = {
  user: {
    login: '',
    status: false,
    message: '',
    loginMessage: '',
    photo: '',
    email: '',
    phone: '',
    group: '',
    groupName: '',
    photoSrc: '',
    adminstatus: false,
  },
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: { ...state.user, login: action.login, status: true,adminstatus:action.status,
          photo:action.photo,group:action.group,groupName:action.groupName },
      };
    }
    case ADD_MSG: {
      return {
        ...state,
        user: { message: action.message },
      };
    }
    case ADD_LOGMSG: {
      return {
        ...state,
        user: { loginMessage: action.loginMessage },
      };
    }
    case DEL_USER: {
      return {
        ...state,
        user: { login: '', status: false },
      };
    }
    case AVATAR_TO_STATE: {
      return {
        ...state,
        user: { ...state.user, photo: action.photo, photoSrc: action.photo.name },
      };
    }
    case UPDATE_AVATAR: {
      return {
        ...state,
        user: { ...state.user, photo: action.photo, photoSrc: action.photo.name },
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
          login: action.login,
          phone: action.phone,
          group: action.group,
          groupName: action.groupName,
          photoSrc: action.photo,
        },
      };
    }
    case REQUEST_ALL_USERS: {
      return {
        ...state,
        users: action.users,
      }
    }
    default:
      return state;
  }
}
