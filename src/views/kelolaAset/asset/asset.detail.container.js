import React from "react";
import { Container, Row, Col, Form, Button } from "shards-react";
import request from "../../../utils/request";

import TitleHeader from "../../../components/TitleHeader";

import { connect } from "react-redux";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";
import WithSpinner from "../../../components/spinner/spinner";
import AssetDetail from "./asset.detail";
import ModalAssetDelete from "../modalAset/ModalAssetDelete";
import DetailForm from "./form/detail.form";
import JadwalForm from "./form/jadwal.form";
import ModalEquipmentCreate from "../../strukturAset/modalEquipment/ModalEquipmentCreate";
import ModalIndukCreate from "../../strukturAset/modalInduk/ModalIndukCreate";
import ModalSubIndukCreate from "../../strukturAset/modalSubInduk/ModalSubIndukCreate";
import ModalKategoriCreate from "../../strukturAset/modalKategori/ModalKategoriCreate";
import { withRouter } from "react-router-dom";
import {
  fetchSelectClasses,
  fetchSelectConsumptions,
  fetchSelectGrowth,
  fetchSelectTypes
} from "../../../redux/selectForm/fetchSelections";
import ModalAssetReleaseJadwal from "../modalAset/ModalAssetReleaseJadwal";

const AssetDetailsWithSpinner = WithSpinner(AssetDetail);

class AssetDetailsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isEdit: false,
      modalDeleteVisible: false,
      toggleTabs: false
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchIndukSelectForm();
    this.fetchCategorySelectForm();
    this.props.dispatch(fetchSelectConsumptions());
    this.props.dispatch(fetchSelectClasses());
    this.props.dispatch(fetchSelectTypes());
    this.props.dispatch(fetchSelectGrowth());
  }

  handleSubmitOrder = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: `/services/order`,
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        setTimeout(() => this.props.dispatch(dismissAlert()), 3000);
        this.fetchData();
        this.toggleEdit();
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

  handleSubmitEditAsset = event => {
    event.preventDefault();
    request({
      method: "PUT",
      url: `/assets/${this.state.data.id}`,
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        setTimeout(() => this.props.dispatch(dismissAlert()), 3000);
        this.fetchData();
        this.toggleEdit();
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

  handleSubmitEditJadwal = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: `/assets/${this.state.data.id}/service-plan`,
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        setTimeout(() => this.props.dispatch(dismissAlert()), 3000);
        this.fetchData();
        this.toggleEdit();
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

  fetchData = () => {
    const { match } = this.props;
    request({
      method: "GET",
      url: `/assets/${match.params.assetId}`
    })
      .then(resp => {
        console.log(resp.data);

        this.setState({
          data: resp.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
        setTimeout(() => this.props.dispatch(dismissAlert()), 3000);
      });
  };

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

  toggleTabs = () => {
    this.setState({
      toggleTabs: !this.state.toggleTabs
    });
  };

  toggleEdit = type => {
    switch (type) {
      case "ASSET":
        this.setState({
          isEdit: !this.state.isEdit,
          step: 1
        });
        break;
      case "SCHEDULE":
        this.setState({
          isEdit: !this.state.isEdit,
          step: 2
        });
        break;
      default:
        this.setState({
          isEdit: !this.state.isEdit,
          step: 0
        });

        break;
    }
  };

  toggleDelete = () => {
    this.setState({
      modalDeleteVisible: !this.state.modalDeleteVisible
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

      case "JADWAL":
        this.setState({
          modalRilisJadwalVisible: true
        });
        break;

      default:
        this.setState({
          modalKategoriIndukVisible: false,
          modalKategoriSubIndukVisible: false,
          modalKategoriEquipmentVisible: false,
          modalKategoriVisible: false,
          modalRilisJadwalVisible: false
        });
        break;
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      data,
      errors,
      isLoading,
      isEdit,
      modalDeleteVisible,
      dataIndukSelectForm,
      dataEquipmentSelectForm,
      dataSubIndukSelectForm,
      dataCategorySelectForm,
      modalKategoriEquipmentVisible,
      modalKategoriIndukVisible,
      modalKategoriSubIndukVisible,
      modalKategoriVisible,
      modalRilisJadwalVisible
    } = this.state;
    const { selectOptions } = this.props;

    return (
      <Container className="m-4">
        <Row>
          <Col>
            <TitleHeader section="Kelola Aset" title={data && data.name} />
          </Col>
        </Row>
        <ModalAssetReleaseJadwal
          isOpen={modalRilisJadwalVisible}
          toggle={this.toggle}
        />
        {isEdit === false && (
          <AssetDetailsWithSpinner
            isLoading={isLoading}
            item={data ? data : []}
            toggleDelete={this.toggleDelete}
            toggleEdit={this.toggleEdit}
            toggle={this.toggle}
            {...this.props}
          />
        )}
        <ModalAssetDelete
          isOpen={modalDeleteVisible}
          toggle={this.toggleDelete}
          item={data}
          refresh={() => this.props.history.replace("/")}
        />
        <Row>
          <Col className="px-0 mt-3" sm="8">
            <Form onSubmit={this.handleSubmitEditAsset}>
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
                handleChange={this.handleInputChange}
                handleAddAdditionalForm={this.addAdditionalForm}
                handleDeleteAdditionalForm={this.deleteAdditionalForm}
                toggle={this.toggle}
                formData={this.state.data}
                errors={errors ? errors : []}
              >
                <Button
                  outline
                  className="mr-4"
                  theme="success"
                  onClick={this.toggleEdit}
                >
                  Atur Aset Nanti
                </Button>
              </DetailForm>
            </Form>
            <Form onSubmit={this.handleSubmitEditJadwal}>
              <JadwalForm
                handleChange={this.handleInputChange}
                step={this.state.step}
                handleSkip={this.toggleEdit}
                formData={this.state.data}
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

export default connect(mapStateToProps)(withRouter(AssetDetailsContainer));
