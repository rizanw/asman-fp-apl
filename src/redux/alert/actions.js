import * as action from "./types";

export const showAlert = (content, theme) => ({
  type: action.SET_ALERT_VISIBLE,
  payload: {
    content: content,
    theme: theme
  }
});

export const dismissAlert = () => ({
  type: action.DISMISS_ALERT,
  payload: null
});
