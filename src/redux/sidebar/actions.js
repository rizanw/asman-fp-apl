import * as action from "./types";

export const getNavbarItems = menu => ({
  type: action.SET_NAVBAR_ITEMS,
  payload: menu
});

export const toggleSidebar = () => ({
  type: action.TOGGLE_SIDEBAR,
  payload: null
});

export const onChange = () => ({
  type: action.CHANGE,
  payload: null
});
