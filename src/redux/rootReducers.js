import { combineReducers } from "redux";
import sidebarReducers from "./sidebar/reducers";
import alertReducers from "./alert/reducers";
import breadcrumbsReducers from "./breadcrumbs/reducers";
import selectOptionsReducers from "./selectForm/reducers";
import strukturAsetReducers from "./strukturAset/reducers";
import servisReducers from "./servis/reducers";
import authReducers from "./auth/reducers";

export default combineReducers({
  auth: authReducers,
  sidebar: sidebarReducers,
  alert: alertReducers,
  breadcrumbs: breadcrumbsReducers,
  selectOptions: selectOptionsReducers,
  strukturAset: strukturAsetReducers,
  servis: servisReducers
});
