import React from "react";
import { FormInput, FormGroup } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import ErrorMessages from "../../../components/errorMessages";

class ModalKategoriCreate extends React.Component {
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
      url: "/categories",
      data: this.state.form
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
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
    const { isOpen, toggle } = this.props;

    return (
      <ModalForm
        create
        title="Tambah"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <FormGroup>
          <label htmlFor="name">Nama Kategori</label>
          <FormInput
            type="text"
            name="name"
            placeholder="Nama Kategori"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.name} />
        </FormGroup>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalKategoriCreate);
