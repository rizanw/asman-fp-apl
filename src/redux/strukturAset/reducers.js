import * as type from "./types";

const INITIAL_STATE = {
  induk: [],
  subinduk: [],
  equipments: [],
  categories: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.FETCH_STRUKTUR_ASET:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
