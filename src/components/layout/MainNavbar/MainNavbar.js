import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, Alert } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import { connect } from "react-redux";
import { dismissAlert } from "../../../redux/alert/actions";

const MainNavbar = ({
  layout,
  stickyTop,
  isOpen,
  content,
  theme,
  ...props
}) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar
          type="light"
          className="d-flex justify-content-end align-items-stretch flex-md-nowrap p-0"
        >
          {/* <NavbarSearch /> */}
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>

      <Alert
        theme={theme}
        dismissible={() => {
          props.dispatch(dismissAlert());
        }}
        open={isOpen}
      >
        {content}
      </Alert>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.alert.alertVisible,
  content: state.alert.content,
  theme: state.alert.theme
});

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default connect(mapStateToProps)(MainNavbar);
