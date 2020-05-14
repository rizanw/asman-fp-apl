import { recieveCurrentUser, logoutCurrentUser } from "./actions";
import request from "../../utils/request";
import Cookies from "js-cookie";

export const signIn = payload => async dispatch => {
  return request({
    method: "POST",
    url: "/login",
    data: payload
  })
    .then(async resp => {
      var threeHours = 0.1;
      await Cookies.set("userId", resp.data.user.id, { expires: threeHours });
      await Cookies.set("token_type", resp.data.token_type, {
        expires: threeHours
      });
      await Cookies.set("token", resp.data.token, { expires: threeHours });
      dispatch(recieveCurrentUser(resp.data));
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const signOut = props => async dispatch => {
  console.log(props);

  Cookies.remove("userId");
  Cookies.remove("token_type");
  Cookies.remove("token");
  dispatch(logoutCurrentUser());
};
