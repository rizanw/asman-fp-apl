import * as type from "./types";
import sidebarData from "../../data/sidebar-nav-items";

const INITIAL_STATE = {
  menuVisible: false,
  menus: sidebarData
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case type.TOGGLE_SIDEBAR:
      return {
        ...state,
        menuVisible: !state.menuVisible
      };
    case type.CHANGE:
    default:
      return state;
  }
}
