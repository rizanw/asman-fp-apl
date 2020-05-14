import { fetchSelectOptionsSuccess, fetchSelectOptionsError } from "./actions";
import request from "../../utils/request";

export function fetchSelectConsumptions() {
  return dispatch => {
    request({
      method: "GET",
      url: "/consumption-types"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ consumptionTypes: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}

export function fetchSelectTypes() {
  return dispatch => {
    request({
      method: "GET",
      url: "/types"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ types: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}

export function fetchSelectGrowth() {
  return dispatch => {
    request({
      method: "GET",
      url: "/growth-types"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ growthTypes: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}

export function fetchSelectClasses() {
  return dispatch => {
    request({
      method: "GET",
      url: "/classes"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ classes: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}

export function fetchSelectPekerjaan() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/kategoripekerjaan"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ kategoriPekerjaan: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}

export function fetchSelectTipeAC() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/tipeac"
    })
      .then(resp => {
        dispatch(fetchSelectOptionsSuccess({ tipeAC: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchSelectOptionsError(error.message));
      });
  };
}
