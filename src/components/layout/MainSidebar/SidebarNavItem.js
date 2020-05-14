import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarNavItem = ({ item }) => (
  <NavItem>
    <NavLink
      tag={RouteNavLink}
      isActive={(match, location) => {
        if (match && match.isExact) {
          return true;
        }
        return false;
      }}
      to={item.to}
    >
      {item.icon && <FontAwesomeIcon fixedWidth icon={item.icon} />}
      {item.title && <span className="ml-2">{item.title}</span>}
    </NavLink>
  </NavItem>
);

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
