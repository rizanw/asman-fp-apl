import * as type from "./types";

const INITIAL_STATE = {
  alertVisible: false,
  content: "",
  theme: "primary"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.SET_ALERT_VISIBLE:
      return {
        ...state,
        alertVisible: true,
        content: action.payload.content,
        theme: action.payload.theme
      };
    case type.DISMISS_ALERT:
      return {
        ...state,
        alertVisible: false
      };
    default:
      return state;
  }
}
