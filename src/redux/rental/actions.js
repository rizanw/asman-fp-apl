import * as action from "./types";

export const fetchDataSuccess = items => ({
    type: action.FETCH_RENTAL,
    payload: items
});

export const fetchDataError = error => ({
    type: action.FETCH_RENTAL_ERROR,
    payload: error
});