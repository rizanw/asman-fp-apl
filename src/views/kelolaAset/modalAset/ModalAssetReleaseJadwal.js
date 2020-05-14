import React from "react";
import { FormInput, FormGroup, FormSelect, Row, Col } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";

import ErrorMessages from "../../../components/errorMessages";
import {
  fetchSelectPekerjaan,
  fetchSelectTipeAC
} from "../../../redux/selectForm/fetchSelections";
import { fetchReleaseServiceData } from "../../../redux/servis/fetchServis";

class ModalAssetReleaseJadwal extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      form: [],
      errors: [],
      dataSearch: "",
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchSelectPekerjaan());
    this.props.dispatch(fetchSelectTipeAC());
  }

  handleSubmit = async event => {
    event.preventDefault();

    const isValidate = await this.handleValidateForm();
    if (!isValidate) {
      return;
    }
    const { service_id } = this.props;

    let service_ids = [];
    for (let key = 0; key < service_id.length; key++) {
      service_ids.push(service_id[key]);
    }

    const data = {
      kategori_pekerjaan_id:
        this.state.form && this.state.form.kategori_pekerjaan_id,
      tipe_ac_id: this.state.form && this.state.form.tipe_ac_id,
      date: this.state.form && this.state.form.date,
      service_id: service_ids
    };

    request({
      method: "POST",
      url: "/services/order",
      data: data
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.dispatch(fetchReleaseServiceData());
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

  handleValidateForm = () => {
    console.log("test");
    const isFilledTipe_Ac_Id = "tipe_ac_id" in this.state.form;
    const isFilledKategori_Pekerjaan_Id =
      "kategori_pekerjaan_id" in this.state.form;
    if (isFilledKategori_Pekerjaan_Id && isFilledTipe_Ac_Id) {
      return true;
    } else
      this.setState({
        errors: {
          tipe_ac_id: !isFilledTipe_Ac_Id && "Harap pilih tipe AC",
          kategori_pekerjaan_id:
            !isFilledKategori_Pekerjaan_Id && "Harap memilih pekerjaan"
        }
      });
    return false;
  };

  render() {
    const { isOpen, toggle, tipeAC, kategoriPekerjaan } = this.props;
    const { errors } = this.state;

    return (
      <ModalForm
        create
        title="Order Servis"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="">Tipe AC</label>
              <FormSelect
                required
                name="tipe_ac_id"
                onChange={this.handleChange}
              >
                <option disabled selected>
                  Pilih Tipe AC
                </option>
                {tipeAC.map((item, key) => (
                  <option value={item.id}>{item.nama}</option>
                ))}
              </FormSelect>
              <ErrorMessages message={errors.tipe_ac_id} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="">Kategori Pekerjaan</label>
              <FormSelect
                required
                name="kategori_pekerjaan_id"
                onChange={this.handleChange}
              >
                <option disabled selected>
                  Pilih Kategori Pekerjaan
                </option>
                {kategoriPekerjaan.map((item, key) => (
                  <option value={item.id}>{item.nama}</option>
                ))}
              </FormSelect>
              <ErrorMessages message={errors.kategori_pekerjaan_id} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="induk">Tanggal Mulai Servis</label>
              <FormInput
                required
                type="date"
                name="date"
                onChange={this.handleChange}
              />
              <ErrorMessages message={errors.date} />
            </FormGroup>
          </Col>
        </Row>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({
  tipeAC: state.selectOptions.tipeAC,
  kategoriPekerjaan: state.selectOptions.kategoriPekerjaan
});
export default connect(mapStateToProps)(ModalAssetReleaseJadwal);
