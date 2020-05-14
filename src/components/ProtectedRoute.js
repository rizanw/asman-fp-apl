import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import NotFound from "../views/NotFound";

const ProtectedRoute = ({
  allowedRole,
  userRole,
  loggedIn,
  component: Component,
  ...props
}) => {
  const isAllowed = allowedRole ? allowedRole.includes(userRole) : true;

  return (
    <Route
      {...props}
      render={props =>
        loggedIn ? (
          isAllowed ? (
            <Component {...props} />
          ) : (
            <NotFound {...props} />
          )
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  loggedIn: Boolean(Cookies.get("userId")),
  userRole: state.auth.userData.role
});

export default connect(mapStateToProps)(ProtectedRoute);
