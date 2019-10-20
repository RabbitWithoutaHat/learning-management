import { CHANGE_LOAD_STATUS } from './types';

const initialState = {
  loadStatus: '',
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOAD_STATUS: {
      return {
        ...state,
        loadStatus: true,
      };
    }

    default:
      return state;
  }
}
