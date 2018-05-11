import { get, getLatestRequestId } from "../services/dictionary-service";

export const UPDATE_RESULTS = "DICTIONARY/UPDATE_RESULTS";
export const UPDATE_ERROR = "DICTIONARY/UPDATE_ERROR";
export const UPDATE_KEY = "DICTIONARY/UPDATE_KEY";
export const START_LOADING = "DICTIONARY/START_LOADING";
export const RESET = "DICTIONARY/RESET";

export function updateResults(items) {
  return { type: UPDATE_RESULTS, items };
}

export function updateError(message) {
  return { type: UPDATE_ERROR, message };
}

export function updateKey(key) {
  return { type: UPDATE_KEY, key };
}

export function startLoading() {
  return { type: START_LOADING };
}

export function reset() {
  return { type: RESET };
}

export function search(key) {
  return dispatch => {
    dispatch(updateKey(key));
    const { requestId, promise } = get(key);
    promise
      .then(res => {
        // only dispatch latest request's results:
        if (getLatestRequestId() === requestId) {
          dispatch(updateResults(res));
        }
      })
      .catch(err => dispatch(updateError(err.message)));
  };
}
