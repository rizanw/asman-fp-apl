import * as action from "./types";

export const fetchSelectOptionsSuccess = items => ({
  type: action.FETCH_SELECT_OPTIONS,
  payload: items
});

export const fetchSelectOptionsError = error => ({
  type: action.FETCH_SELECT_OPTIONS_ERROR,
  payload: error
});
