import * as action from "./types";

export const recieveCurrentUser = user => ({
  type: action.RECEIVE_CURRENT_USER,
  payload: {
    userId: user.user.id,
    userData: user.user
  }
});

export const logoutCurrentUser = () => ({
  type: action.LOGOUT_CURRENT_USER
});
