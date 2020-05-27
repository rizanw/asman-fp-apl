import React from "react";
import { FormInput, FormGroup, FormSelect } from "shards-react";
import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";
import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import ErrorMessages from "../../../components/errorMessages";

class ModalMyRentalCreate extends React.Component {
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
      url: "/my-asset/add",
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
    const { isOpen, toggle, dataAssetSelectForm } = this.props;

    return (
      <ModalForm
        create
        title="Tambah Asset Untuk Diswakan"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <FormGroup>
          <label htmlFor="">Aset</label>
          <FormSelect name="asset" onChange={this.handleChange}>
            <option disabled selected>
              Pilih Aset
            </option>
            {dataAssetSelectForm.map((item, key) => (
              <option key={`${item.name}~${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <ErrorMessages message={errors.asset_id} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Harga Sewa</label>
          <FormInput
            required
            type="text"
            name="price"
            placeholder="Harga sewa"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.name} />
        </FormGroup>
      </ModalForm>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalMyRentalCreate);
