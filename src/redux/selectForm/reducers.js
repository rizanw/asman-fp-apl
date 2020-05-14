import * as type from "./types";

const INITIAL_STATE = {
  types: [],
  classes: [],
  growthTypes: [],
  consumptionTypes: [],
  kategoriPekerjaan: [],
  tipeAC: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.FETCH_SELECT_OPTIONS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
