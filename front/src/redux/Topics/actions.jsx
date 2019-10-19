import { REQUESTED_TOPICS, REQUESTED_ERROR, ADD_TOPICS } from './types';
export const requestTopics = () => {
  return {
    type: REQUESTED_TOPICS,
  };
};
export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics: topics.result,
    allTopics: topics.topics,
    groupNames: topics.groupNames,
    selectedGroupName: topics.selectedGroupName,
  };
};

export const requestError = () => {
  return {
    type: REQUESTED_ERROR,
  };
};
// thunk!
export const getTopicsData = group => async dispatch => {
  try {
    dispatch(requestTopics());
    let resp = await fetch(`/topics/${group}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    dispatch(addTopics(data));
  } catch (err) {
    dispatch(requestError());
  }
};
export const editTopic = data => async dispatch => {
  try {
    await fetch(`/topics/${data.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    dispatch(requestError());
  }
};
export const addPhase = group => async dispatch => {
  try {
    await fetch('/phase', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group }),
    });
  } catch (err) {
    dispatch(requestError());
  }
};
export const addDay = data => async dispatch => {
  try {
    await fetch('/day', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    dispatch(requestError());
  }
};
export const addWeek = data => async dispatch => {
  try {
    await fetch('/week', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    dispatch(requestError());
  }
};
