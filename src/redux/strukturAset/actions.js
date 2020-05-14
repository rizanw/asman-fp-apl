import * as action from "./types";

export const fetchDataSuccess = items => ({
  type: action.FETCH_STRUKTUR_ASET,
  payload: items
});

export const fetchDataError = error => ({
  type: action.FETCH_STRUKTUR_ASET_ERROR,
  payload: error
});
