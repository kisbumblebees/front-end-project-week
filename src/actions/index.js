import axios from "axios";

export const FETCHING_NOTES = "FETCHING_NOTES";
export const FETCHED_NOTES = "FETCHED_NOTES";
export const START_CREATE = "START_CREATE";
export const ERROR = "ERROR";
export const GO_TO_LIST = "GO_TO_LIST";
export const VIEW_NOTE = "VIEW_NOTE";
export const START_DELETE = "START_DELETE";
export const REALLY_DELETE = "REALLY_DELETE";
export const DONE_DELETING = "DONE_DELETING";
export const SAVE_NEW = "SAVE_NEW";
export const DONE_SAVING = "DONE_SAVING";
export const CANCEL_DELETE = "CANCEL_DELETE";
export const EDIT_NOTE = "EDIT_NOTE";
export const SAVE_EDIT = "SAVE_EDIT";
export const ALPHABETIZE_NOTES = "ALPHABETIZE_NOTES";
export const SHORTEST_NOTES = "SHORTEST_NOTES";
export const LONGEST_NOTES = "LONGEST_NOTES";
export const REV_ALPHABETIZE_NOTES = "REV_ALPHABETIZE_NOTES";
export const CREATING_USER = "CREATING_USER";
export const CREATED_USER = "CREATED_USER";
export const LOGGING_USER = "LOGGING_USER";
export const LOGGED_USER = "LOGGED_USER";
export const LOG_OUT = "LOG_OUT";

//Asynchronus actions.  These issue actions specific to their operation that put
//the app in a loading state, then when the request is complete send a payload
//to the reducer to update the store.

export const fetcher = (url, token) => {
  const request = axios.get(url, { headers: { Authorization: token } });
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    request
      .then(data => {
        dispatch({ type: FETCHED_NOTES, payload: data.data.notes });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const saveEdit = (nextAct, url, note, id, token) => {
  let newNote = Object.assign({}, note, { _id: id });
  const request = axios.put(url + `/${id}`, newNote, {
    headers: { Authorization: token }
  });
  return dispatch => {
    dispatch({ type: SAVE_EDIT });
    request
      .then(data => {
        dispatch({ type: DONE_SAVING });
        nextAct(url, token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const reallyDelete = (nextAct, url, id, token) => {
  const request = axios.delete(url + "/" + id, {
    headers: { Authorization: token }
  });
  return dispatch => {
    dispatch({ type: REALLY_DELETE });
    request
      .then(data => {
        dispatch({ type: DONE_DELETING });
        nextAct(url, token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const saveNew = (nextAct, url, note, unused, token) => {
  const request = axios.post(url, note, { headers: { Authorization: token } });
  return dispatch => {
    dispatch({ type: SAVE_NEW });
    request
      .then(data => {
        dispatch({ type: DONE_SAVING });
        nextAct(url, token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const createUser = (nextAct, url, cred) => {
  const request = axios.post(url + "/api/users", cred);
  return dispatch => {
    dispatch({ type: CREATING_USER });
    request
      .then(data => {
        dispatch({ type: CREATED_USER, payload: data.data });
        nextAct(url + "/api/notes", data.data.token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const loginUser = (nextAct, url, cred) => {
  const request = axios.post(url + "/api/auth", cred);
  return dispatch => {
    dispatch({ type: LOGGING_USER });
    request
      .then(data => {
        dispatch({ type: LOGGED_USER, payload: data.data });
        nextAct(url + "/api/notes", data.data.token);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

//Simple actions; all the real work is done by the reducer

export const startCreate = () => {
  return dispatch => {
    dispatch({ type: START_CREATE });
  };
};

export const goToList = () => {
  return dispatch => {
    dispatch({ type: GO_TO_LIST });
  };
};

export const viewNote = id => {
  return dispatch => {
    dispatch({ type: VIEW_NOTE, payload: id });
  };
};

export const startDelete = () => {
  return dispatch => {
    dispatch({ type: START_DELETE });
  };
};

export const cancelDelete = () => {
  return dispatch => {
    dispatch({ type: CANCEL_DELETE });
  };
};

export const editNote = () => {
  return dispatch => {
    dispatch({ type: EDIT_NOTE });
  };
};

export const alphabetizeNotes = () => {
  return dispatch => {
    dispatch({ type: ALPHABETIZE_NOTES });
  };
};

export const revAlphabetizeNotes = () => {
  return dispatch => {
    dispatch({ type: REV_ALPHABETIZE_NOTES });
  };
};

export const shortestNotes = () => {
  return dispatch => {
    dispatch({ type: SHORTEST_NOTES });
  };
};

export const longestNotes = () => {
  return dispatch => {
    dispatch({ type: LONGEST_NOTES });
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch({ type: LOG_OUT });
  };
};
