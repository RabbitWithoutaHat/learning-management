import { REQUESTED_TOPICS } from './types';

const initialState = {
  topics = {
    topicName: '',
    description: '',
    video: '',
    group: '',
    phase: '',
    week: '',
    day: '',
    githubLink: '', 

  }

}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUESTED_TOPICS: {
      return {
        ...state,
        topics: action.topics,
        loading: true,
        error: false,
      };
    }
    default:
      return state;
  }
}
