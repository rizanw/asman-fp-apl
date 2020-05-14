import React from "react";
import { FormInput, FormGroup } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import ErrorMessages from "../../../components/errorMessages";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MapInput from "../../../components/map/MapInput";

class ModalAkunCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errors: [],
      dataSearch: "",
      isLoading: true,
      lat: 51.505,
      lng: -0.09,
      zoom: 12
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: "/companies",
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
    const { isOpen, toggle } = this.props;
    const { errors } = this.state;

    return (
      <ModalForm
        create
        title="Tambah"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <FormGroup>
          <label htmlFor="name">Nama Perusahaan</label>
          <FormInput
            required
            type="text"
            name="name"
            placeholder="Nama Perusahaan"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.name} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Username</label>
          <FormInput
            required
            type="text"
            name="username"
            placeholder="Username akun perusahaan"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.username} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Password</label>
          <FormInput
            required
            type="password"
            name="password"
            placeholder="Password akun perusahaan"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.password} />
        </FormGroup>

        <FormGroup>
          <label htmlFor="name">Email</label>
          <FormInput
            required
            type="email"
            name="email"
            placeholder="Email Perusahaan"
            onChange={this.handleChange}
          />
          <ErrorMessages message={errors.email} />
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
export default connect(mapStateToProps)(ModalAkunCreate);
