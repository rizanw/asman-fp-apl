import * as action from "./types";

export const fetchDataSuccess = items => ({
  type: action.FETCH_SERVIS,
  payload: items
});

export const fetchDataError = error => ({
  type: action.FETCH_SERVIS_ERROR,
  payload: error
});
