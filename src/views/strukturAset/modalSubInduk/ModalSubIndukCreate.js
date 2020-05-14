import React from "react";
import { FormInput, FormGroup, FormSelect } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import { fetchSubIndukData } from "../../../redux/strukturAset/fetchStrukturAset";
import ErrorMessages from "../../../components/errorMessages";
import MapInput from "../../../components/map/MapInput";

class ModalSubIndukCreate extends React.Component {
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
      url: "/subinduk",
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
    console.log(e);

    if (e.target.options && e.target.options.name === "address_location") {
      const position = e.latlng;
      const currentZoom = e.target.getZoom();
      this.setState({
        form: {
          ...this.state.form,
          latitude: position.lat,
          longitude: position.lng,
          zoom: currentZoom
        }
      });
    } else
      this.setState({
        form: { ...this.state.form, [name]: value }
      });
  };

  render() {
    const { errors } = this.state;
    const { isOpen, toggle, dataIndukSelectForm } = this.props;

    return (
      <ModalForm
        create
        title="Tambah"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <FormGroup>
          <label htmlFor="">Induk</label>
          <FormSelect name="parent_id" onChange={this.handleChange}>
            <option disabled selected>
              Pilih Induk
            </option>
            {dataIndukSelectForm.map((item, key) => (
              <option key={`${item.name}~${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <ErrorMessages message={errors.parent_id} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Nama Sub Induk</label>
          <FormInput
            required
            type="text"
            name="name"
            placeholder="Nama Sub Induk"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.name} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Nomor Telepon</label>
          <FormInput
            required
            type="text"
            name="tel"
            placeholder="081*****"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.tel} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Alamat Lengkap</label>
          <FormInput
            required
            type="text"
            name="address"
            placeholder="Jalan bupati no 1 Surabaya"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.address} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="address_location">Lokasi Alamat</label>
          <MapInput
            position_lat={
              this.state.form &&
              "latitude" in this.state.form &&
              this.state.form.latitude
            }
            position_lng={
              this.state.form &&
              "longitude" in this.state.form &&
              this.state.form.longitude
            }
            position_zoom={
              this.state.form &&
              "zoom" in this.state.form &&
              this.state.form.zoom
            }
            handleChange={this.handleChange}
          />
          <ErrorMessages message={errors.latitude} />
          <ErrorMessages message={errors.longitude} />
        </FormGroup>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalSubIndukCreate);
