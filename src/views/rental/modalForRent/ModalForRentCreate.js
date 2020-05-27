import React from "react";
import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";
import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import { fetchMyRentalData } from "../../../redux/rental/fetchRental";
import { FormGroup, FormSelect, FormInput } from "shards-react";
import ErrorMessages from "../../../components/errorMessages";

class ModalForRentCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errors: [],
      dataSeach: "",
      isLoading: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: "/rental/rent/create",
      data: this.state.form
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.dispatch(fetchMyRentalData());
        this.props.toggle();
        this.setState({
          form: {},
          errors: []
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
    const { errors } = this.state;
    const { isOpen, toggle, dataRentalSelectForm } = this.props;

    return (
      <ModalForm
        create
        title="Tambah Asset Untuk Diswakan"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <FormGroup>
          <label htmlFor="">Aset Untuk Disewa</label>
          <FormSelect name="rental" onChange={this.handleChange}>
            <option disabled selected>
              Pilih Aset
            </option>
            {dataRentalSelectForm.map((item, key) => (
              <option key={`${item.name}~${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <ErrorMessages message={errors.asset_id} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Durasi Sewa</label>
          <FormInput
            required
            type="text"
            name="duration"
            placeholder="Sewa berapa lama?"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.name} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Mulai Sewa</label>
          <FormInput
            required
            type="text"
            name="date"
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
export default connect(mapStateToProps)(ModalForRentCreate);

