import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
  faCircle,
  faPlus,
  faDoorClosed,
  faCalendar,
  faBoxOpen,
  faSearch,
  faFilter,
  faList,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/style.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner, SpinnerOverlay } from "./components/spinner/spinner.style";

library.add(
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
  faCircle,
  faPlus,
  faDoorClosed,
  faBoxOpen,
  faCalendar,
  faSearch,
  faFilter,
  faList,
  faClipboardList
);

const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <SpinnerOverlay>
          <Spinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
          </Spinner>
        </SpinnerOverlay>
      }
      persistor={persistor}
    >
      <BrowserRouter>
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <Switch>
            {routes.map((route, index) => {
              return route.protected ? (
                <ProtectedRoute
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  allowedRole={route.allowedRole}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              ) : (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </Switch>
        </Router>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
