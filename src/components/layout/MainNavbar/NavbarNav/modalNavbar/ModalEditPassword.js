import React from "react";
import { FormInput, FormGroup } from "shards-react";

import request from "../../../../../utils/request";
import { showAlert, dismissAlert } from "../../../../../redux/alert/actions";

import ModalForm from "../../../../../components/Modal";
import { connect } from "react-redux";
import ErrorMessages from "../../../../errorMessages";

class ModalEditPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errors: [],
      dataSearch: "",
      isLoading: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: "/settings/password",
      data: this.state.form
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.toggle();
        this.setState({
          form: {},
          errors: []
        });
        setTimeout(() => this.props.dispatch(dismissAlert()), 1000);
      })
      .catch(err => {
        this.setState({
          errors: err.message
        });
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  render() {
    const { errors } = this.state;
    const { isOpen, toggle, item } = this.props;

    return (
      <ModalForm
        edit
        title="Edit Password"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <ErrorMessages message={errors && errors} />
        <FormGroup>
          <label htmlFor="old_password">Password Lama</label>
          <FormInput
            required
            type="password"
            name="old_password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.old_password} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password Baru</label>
          <FormInput
            required
            type="password"
            name="password"
            placeholder="password baru"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.password} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password_confirmation">
            Konfirmasi Password Baru
          </label>
          <FormInput
            required
            type="password"
            name="password_confirmation"
            placeholder="konfirmasi password baru"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.password_confirmation} />
        </FormGroup>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalEditPassword);
