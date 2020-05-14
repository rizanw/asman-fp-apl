import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

class MainSidebar extends React.Component {
  render() {
    const { menuVisible } = this.props;
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      menuVisible && "open"
    );

    return (
      <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
        <SidebarSearch />
        <SidebarNavItems />
        <img />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

const mapStateToProps = state => ({
  menuVisible: state.sidebar.menuVisible,
  sidebarNavItems: state.sidebar.menus
});

export default connect(mapStateToProps)(MainSidebar);
