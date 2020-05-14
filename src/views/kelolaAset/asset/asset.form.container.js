import React from "react";
import { Container, Row, Col, Form } from "shards-react";
import request from "../../../utils/request";
import TitleHeader from "../../../components/TitleHeader";
import DetailForm from "./form/detail.form";
import JadwalForm from "./form/jadwal.form";
import ModalEquipmentCreate from "../../strukturAset/modalEquipment/ModalEquipmentCreate";
import ModalIndukCreate from "../../strukturAset/modalInduk/ModalIndukCreate";
import ModalSubIndukCreate from "../../strukturAset/modalSubInduk/ModalSubIndukCreate";
import ModalKategoriCreate from "../../strukturAset/modalKategori/ModalKategoriCreate";
import { showAlert } from "../../../redux/alert/actions";
import { connect } from "react-redux";
import {
  fetchSelectClasses,
  fetchSelectConsumptions,
  fetchSelectGrowth,
  fetchSelectTypes
} from "../../../redux/selectForm/fetchSelections";
import { withRouter } from "react-router-dom";

class FormAsset extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      modalKategoriIndukVisible: false,
      modalKategoriSubIndukVisible: false,
      modalKategoriEquipmentVisible: false,
      modalKategoriVisible: false
    };
  }

  componentDidMount() {
    this.fetchIndukSelectForm();
    this.fetchCategorySelectForm();
    this.props.dispatch(fetchSelectConsumptions());
    this.props.dispatch(fetchSelectClasses());
    this.props.dispatch(fetchSelectTypes());
    this.props.dispatch(fetchSelectGrowth());
  }

  fetchIndukSelectForm = () => {
    request({
      method: "GET",
      url: "/induk"
    })
      .then(resp => {
        this.setState({
          dataIndukSelectForm: resp.data
        });
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  fetchSubIndukSelectForm = id => {
    request({
      method: "GET",
      url: `/subinduk?induk_id=${id}`
    })
      .then(resp => {
        this.setState({
          dataSubIndukSelectForm: resp.data
        });
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  fetchEquipmentSelectForm = id => {
    request({
      method: "GET",
      url: `/equipment?subinduk_id=${id}`
    })
      .then(resp => {
        this.setState({
          dataEquipmentSelectForm: resp.data
        });
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  fetchCategorySelectForm = () => {
    request({
      method: "GET",
      url: `/categories`
    })
      .then(resp => {
        this.setState({
          dataCategorySelectForm: resp.data
        });
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleSubmitAsset = async event => {
    event.preventDefault();
    await this.customFieldToJSON();
    request({
      method: "POST",
      url: `/assets`,
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.setState({
          assetId: resp.data.id,
          assetName: resp.data.name
        });
        this.handleStep();
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleSubmitJadwal = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: `/assets/${this.state.assetId}/service-plan`,
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.history.push("/");
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleChange = (e, key) => {
    const { name, value } = e.target;
    if (name === "additional_fields") {
      const custom_field_copy = [...this.state.custom_field];
      custom_field_copy[key].additional_fields = value;
      return this.setState({
        custom_field: custom_field_copy
      });
    }
    if (name === "additional_fields_input") {
      const custom_field_copy = [...this.state.custom_field];
      custom_field_copy[key].additional_fields_input = value;
      return this.setState({
        custom_field: custom_field_copy
      });
    }

    this.setState({
      [name]: value
    });
  };

  handleStep = (step = null) => {
    if (step === "BACK") {
      return this.setState({
        step: this.state.step - 1
      });
    }

    return this.setState({
      step: this.state.step + 1
    });
  };

  handleSkip = () => {
    const { assetId, assetName } = this.state;
    return this.props.history.push(`/${assetName}/${assetId}`);
  };

  customFieldToJSON = () => {
    var custom_field_json = {};
    this.state.custom_field &&
      this.state.custom_field.map(item => {
        custom_field_json = {
          ...custom_field_json,
          [item.additional_fields]: item.additional_fields_input
        };
      });
    this.setState({
      custom_fields: custom_field_json
    });
  };

  addAdditionalForm = () => {
    const { custom_field } = this.state;
    const values = custom_field ? [...custom_field] : [];
    values.push({
      additional_fields: "",
      additional_fields_input: ""
    });
    this.setState({
      custom_field: values
    });
  };

  deleteAdditionalForm = index => {
    const { custom_field } = this.state;
    const values = [...custom_field];
    values.splice(index, 1);
    this.setState({
      custom_field: values
    });
  };

  toggle = type => {
    switch (type) {
      case "INDUK":
        this.setState({
          modalKategoriIndukVisible: true
        });
        break;

      case "SUBINDUK":
        this.setState({
          modalKategoriSubIndukVisible: true
        });
        break;

      case "EQUIPMENT":
        this.setState({
          modalKategoriEquipmentVisible: true
        });
        break;

      case "CATEGORY":
        this.setState({
          modalKategoriVisible: true
        });
        break;

      default:
        this.setState({
          modalKategoriIndukVisible: false,
          modalKategoriSubIndukVisible: false,
          modalKategoriEquipmentVisible: false,
          modalKategoriVisible: false
        });
        break;
    }
  };

  render() {
    const {
      errors,
      dataIndukSelectForm,
      dataEquipmentSelectForm,
      dataSubIndukSelectForm,
      dataCategorySelectForm,
      modalKategoriEquipmentVisible,
      modalKategoriIndukVisible,
      modalKategoriSubIndukVisible,
      modalKategoriVisible
    } = this.state;
    const { selectOptions } = this.props;
    console.log(this.state);

    return (
      <Container className="m-4">
        <TitleHeader title="Aset Baru" section="Kelola Aset" />
        <Row>
          <Col className="px-0 mt-3" sm="8">
            <Form onSubmit={this.handleSubmitAsset}>
              <DetailForm
                dataInduk={dataIndukSelectForm ? dataIndukSelectForm : []}
                dataSubInduk={
                  dataSubIndukSelectForm ? dataSubIndukSelectForm : []
                }
                dataEquipment={
                  dataEquipmentSelectForm ? dataEquipmentSelectForm : []
                }
                dataCategory={
                  dataCategorySelectForm ? dataCategorySelectForm : []
                }
                selectOptions={selectOptions}
                fetchSubIndukSelectForm={this.fetchSubIndukSelectForm}
                fetchEquipmentSelectForm={this.fetchEquipmentSelectForm}
                step={this.state.step}
                handleStep={this.handleStep}
                handleChange={this.handleChange}
                handleAddAdditionalForm={this.addAdditionalForm}
                handleDeleteAdditionalForm={this.deleteAdditionalForm}
                toggle={this.toggle}
                formData={this.state}
                errors={errors ? errors : []}
              />
            </Form>
            <Form onSubmit={this.handleSubmitJadwal}>
              <JadwalForm
                handleChange={this.handleChange}
                step={this.state.step}
                handleSkip={this.handleSkip}
                formData={this.state}
                errors={errors ? errors : []}
              />
            </Form>
          </Col>
        </Row>
        <ModalIndukCreate
          isOpen={modalKategoriIndukVisible}
          toggle={this.toggle}
          dataIndukSelectForm={dataIndukSelectForm ? dataIndukSelectForm : []}
          refresh={this.fetchIndukSelectForm}
        />
        <ModalSubIndukCreate
          isOpen={modalKategoriSubIndukVisible}
          toggle={this.toggle}
          dataIndukSelectForm={dataIndukSelectForm ? dataIndukSelectForm : []}
          refresh={this.fetchSubIndukSelectForm}
        />
        <ModalKategoriCreate
          isOpen={modalKategoriVisible}
          toggle={this.toggle}
          dataCategorySelectForm={
            dataCategorySelectForm ? dataCategorySelectForm : []
          }
          refresh={this.fetchCategorySelectForm}
        />
        <ModalEquipmentCreate
          isOpen={modalKategoriEquipmentVisible}
          toggle={this.toggle}
          dataIndukSelectForm={dataIndukSelectForm ? dataIndukSelectForm : []}
          dataSubIndukSelectForm={
            dataSubIndukSelectForm ? dataSubIndukSelectForm : []
          }
          refresh={this.fetchEquipmentSelectForm}
          fetchSubIndukSelectForm={this.fetchSubIndukSelectForm}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  selectOptions: state.selectOptions
});
export default connect(mapStateToProps)(withRouter(FormAsset));
