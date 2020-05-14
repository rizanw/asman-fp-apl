import * as type from "./types";

const INITIAL_STATE = {
  userId: null,
  userData: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.RECEIVE_CURRENT_USER:
      const { userData, userId } = action.payload;
      return {
        ...state,
        userData: userData,
        userId: userId
      };
    case type.LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
