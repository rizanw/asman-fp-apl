import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://3.1.5.41:3000";
const baseURL = "http://localhost:3200";

const client = axios.create({
  baseURL: baseURL
});

const request = function (options) {
  const auth_header = `${Cookies.get("token_type")} ${Cookies.get("token")}`;
  options.headers = {
    Authorization: auth_header ? auth_header : null
  };

  const onSuccess = function (response) {
    // console.debug("Request Successful!", response);
    console.log(response);
    response.data.messageNotification = "Berhasil";
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      switch (error.response.status) {
        case 500:
          error.response.data.messageNotification = error.response.data.message;
          break;
        case 400:
          error.response.data.messageNotification =
            "Terjadi kesalahan pada data / Data belum lengkap";
          break;
        case 401:
          error.response.data.messageNotification = error.response.data.message;
          break;
        case 402:
          error.response.data.messageNotification = error.response.data.message;
          break;
        case 404:
          error.response.data.messageNotification = "Not Found";
          break;
        default:
          error.response.data.messageNotification = error.response.data.message;
          break;
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }
    console.log(error.response);
    return Promise.reject(error.response.data || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
