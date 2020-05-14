import * as action from "./types";

export const setBreadcrumbsHistory = locations => ({
  type: action.SET_BREADCRUMBS_HISTORY,
  payload: {
    locations
  }
});
