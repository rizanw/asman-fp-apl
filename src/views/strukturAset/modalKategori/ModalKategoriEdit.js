import React from "react";
import { FormInput, FormGroup } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";

class ModalKategoriEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSearch: "",
      isLoading: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    request({
      method: "PUT",
      url: `/categories/${this.props.item.id}`,
      data: this.state.form
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.toggle();
        this.setState({
          form: {}
        });
        setTimeout(() => this.props.dispatch(dismissAlert()), 1000);
      })
      .catch(err => {
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
    const { isOpen, toggle, item } = this.props;

    return (
      <ModalForm
        edit
        title="Edit"
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
        </FormGroup>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalKategoriEdit);
