import React from "react";
import { connect } from "react-redux";
import IndexAdmin from "./kelolaAkun/index";
import IndexCompany from "./kelolaAset/index";

const RootMenu = ({ role }) => {
  switch (role) {
    case "super_admin":
      return <IndexAdmin />;
    default:
      return <IndexCompany />;
  }
};

const mapStateToProps = state => ({
  role: state.auth.userData.role
});
export default connect(mapStateToProps)(RootMenu);
