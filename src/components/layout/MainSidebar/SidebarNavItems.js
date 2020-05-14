import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { connect } from "react-redux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({
      ...this.state
    });
  }

  render() {
    const { navItems: items, userRole: role } = this.props;

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) =>
            item.allowedRole ? (
              item.allowedRole.includes(role) && (
                <SidebarNavItem key={idx} item={item} />
              )
            ) : (
              <SidebarNavItem key={idx} item={item} />
            )
          )}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navItems: state.sidebar.menus,
  userRole: state.auth.userData.role
});

export default connect(mapStateToProps)(SidebarNavItems);
