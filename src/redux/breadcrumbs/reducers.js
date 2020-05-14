import * as type from "./types";

const INITIAL_STATE = {
  locations: [
    {
      name: "Home",
      path: "/"
    }
  ]
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.SET_BREADCRUMBS_HISTORY:
      if (isEmpty(action.payload.locations)) {
        return state;
      }

      const locations = Object.values(action.payload.locations);
      var concatPath = "";
      const stateCopy = [...INITIAL_STATE.locations];

      for (let index = 0; index < locations.length; index++) {
        const path = concatPath.concat("/", locations[index]);
        concatPath = path;
        stateCopy.push({
          name: locations[index],
          path: path
        });
      }

      return { ...state, locations: stateCopy };

    default:
      return state;
  }
}
