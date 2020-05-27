import React from "react";
import { FormInput, FormGroup, FormSelect } from "shards-react";
import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";
import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";

class ModalRentOutEdit extends React.Component {
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
      url: `/subinduk/${this.props.item.id}`,
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

  render() {
      const { isOpen, toggle, item, dataIndukSelectForm } = this.props;

      return (
          <ModalForm
            edit
            title="Ubah Status"
            handleSubmit={this.handleSubmit}
            isOpen={isOpen}
            toggle={toggle}
        >
            <FormGroup>
                <label htmlFor="">Konfirmasi Status</label>
                <FormSelect name="status" onChange={this.handleChange}>
                    <option disabled selected>
                        Pilih Status
                    </option>
                </FormSelect>
            </FormGroup>
        </ModalForm>
      )

  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalRentOutEdit);

