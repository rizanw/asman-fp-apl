import React from "react";
import { FormInput, FormGroup } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import { fetchEquipmentsData } from "../../../redux/strukturAset/fetchStrukturAset";

class ModalEquipmentDelete extends React.Component {
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
      method: "DELETE",
      url: `/equipment/${this.props.item.id}`
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.dispatch(fetchEquipmentsData());
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
        delete
        title="Hapus"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <h5>{item && item.name}</h5>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalEquipmentDelete);
