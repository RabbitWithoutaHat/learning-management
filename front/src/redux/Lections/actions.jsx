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
export const getTopicsData = selectedGroup => async dispatch => {
  try {
    dispatch(requestTopics());
    let resp = await fetch('/gettopics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedGroup }),
    });
    const data = await resp.json();
    dispatch(addTopics(data));
  } catch (err) {
    dispatch(requestError());
  }
};
export const editTopic = data => async dispatch => {
  try {
    await fetch('/edittopic', {
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
export const addPhase = group => async dispatch => {
  try {
    await fetch('/addphase', {
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
    await fetch('/addday', {
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
    await fetch('/addweek', {
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
