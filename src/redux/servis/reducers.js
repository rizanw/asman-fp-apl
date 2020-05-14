import * as type from "./types";

const INITIAL_STATE = {
  unplanned: [],
  ready: [],
  processed: [],
  backlog: [],
  finished: [],
  release: [],
  completed: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.FETCH_SERVIS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
