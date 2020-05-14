import { fetchDataSuccess, fetchDataError } from "./actions";
import request from "../../utils/request";

export function fetchIndukData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/induk"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ induk: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchSubIndukData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/subinduk"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ subinduk: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchEquipmentsData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/equipment"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ equipments: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}

export function fetchCategoriesData() {
  return dispatch => {
    request({
      method: "GET",
      url: "/categories"
    })
      .then(resp => {
        dispatch(fetchDataSuccess({ categories: resp.data }));
        return resp.data;
      })
      .catch(error => {
        dispatch(fetchDataError(error.message));
      });
  };
}
