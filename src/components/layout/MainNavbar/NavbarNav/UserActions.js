import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { connect } from "react-redux";
import { signOut } from "../../../../redux/auth/authAPI";
import fakeProfileImg from "../../../../images/avatars/0.jpg";
import ModalEditPassword from "./modalNavbar/ModalEditPassword";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      modalVisible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { modalVisible } = this.state;
    const { user, dispatch } = this.props;

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={fakeProfileImg}
            alt="User Avatar"
          />
          <span className="d-none d-md-inline-block">{user.name}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem onClick={this.toggle}>
            <i className="material-icons">&#xE7FD;</i> Change Password
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            className="text-danger"
            onClick={() => dispatch(signOut(this.props))}
          >
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
        <ModalEditPassword isOpen={modalVisible} toggle={this.toggle} />
      </NavItem>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.userData
});
export default connect(mapStateToProps)(UserActions);
