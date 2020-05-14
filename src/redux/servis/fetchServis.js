import { fetchDataSuccess, fetchDataError } from "./actions";
import request from "../../utils/request";

export function fetchUnplannedServicesData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/unplanned"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ unplanned: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchReadyServicesData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/ready"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ ready: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchBacklogServicesData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/backlog"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ backlog: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchProcessedServicesData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/process"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ processed: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchReleaseServiceData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/released"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ release: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchCompletedServiceData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/complete"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ completed: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchFinishedServiceData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/services/finish"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ finished: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}
