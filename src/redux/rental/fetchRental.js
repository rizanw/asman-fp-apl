import request from "../../utils/request"
import { fetchDataSuccess, fetchDataError } from "./actions"

export function fetchForRentData() {
    return dispatch => {
        request({
            method: "GET",
            url: "/rental/for-rent"
        })
        .then(resp => {
            dispatch(fetchDataSuccess({ forRent: resp.data }));
            return resp.data;
        })
        .catch(error => {
            dispatch(fetchDataError(error.message));
        });
    };
}

export function fetchRentInData() {
    return dispatch => {
        request({
            method: "GET",
            url: "/rental/rent-in"
        })
        .then(resp => {
            dispatch(fetchDataSuccess({ rentIn: resp.data }));
            return resp.data;
        })
        .catch(error => {
            dispatch(fetchDataError(error.message));
        });
    };
}

export function fetchRentOutData() {
    return dispatch => {
        request({
            method: "GET",
            url: "/rental/rent-out"
        })
        .then(resp => {
            dispatch(fetchDataSuccess({ rentOut: resp.data }));
            return resp.data;
        })
        .catch(error => {
            dispatch(fetchDataError(error.message))
        })
    }
}

export function fetchMyRentalData() {
    return dispatch => {
        request({
            method: "GET",
            url: "/rental/my-asset"
        })
        .then(resp => {
            dispatch(fetchDataSuccess({ myRental: resp.data }));
            return resp.data;
        })
        .catch(error => {
            dispatch(fetchDataError(error.message))
        })
    }
}