import React from "react";
import {
  Row,
  Button,
  FormInput,
  Col,
  Card,
  CardHeader,
  InputGroupText,
  InputGroup,
  InputGroupAddon
} from "shards-react";

import ListItems from "../../components/ListItems";
import request from "../../utils/request";
import WithSpinner from "../../components/spinner/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { equipmentHeader } from "../../data/column-header-items";
import { showAlert, dismissAlert } from "../../redux/alert/actions";
import {
  fetchIndukData,
  fetchEquipmentsData
} from "../../redux/strukturAset/fetchStrukturAset";

import { connect } from "react-redux";
import ModalEquipmentCreate from "./modalEquipment/ModalEquipmentCreate";
import ModalEquipmentEdit from "./modalEquipment/ModalEquipmentEdit";
import ModalEquipmentDelete from "./modalEquipment/ModalEquipmentDelete";

const ListItemsWithSpinner = WithSpinner(ListItems);

class EquipmentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSearch: "",
      modalVisible: false,
      modalDeleteVisible: false,
      modalEditVisible: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchIndukSelectForm();
  }

  fetchData = () => {
    const { isLoading } = this.state;
    !isLoading && this.setState({ isLoading: true });
    this.props.dispatch(
      fetchEquipmentsData(),
      this.setState({
        isLoading: false
      })
    );

    // request({
    //   method: "GET",
    //   url: "/equipment"
    // })
    //   .then(resp => {
    //     this.setState({
    //       data: resp.data,
    //       isLoading: false
    //     });
    //   })
    //   .catch(err => {
    //     this.props.dispatch(
    //       showAlert(err.messageNotification || err, "danger")
    //     );
    //   });
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
        this.setState({
          errors: err.message
        });
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: "/equipment",
      data: this.state
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.toggle();
        this.fetchData();
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
      [name]: value
    });
  };

  toggle = (type, item) => {
    switch (type) {
      case "CREATE":
        this.fetchIndukSelectForm();
        this.setState({
          modalVisible: true,
          dataIndukSelectForm: []
        });
        break;
      case "EDIT":
        this.setState({
          modalEditVisible: true,
          itemDetail: item
        });
        break;
      case "DELETE":
        this.setState({
          modalDeleteVisible: true,
          itemDetail: item,
          dataIndukSelectForm: []
        });
        break;
      default:
        this.setState({
          modalVisible: false,
          modalEditVisible: false,
          modalDeleteVisible: false,
          dataIndukSelectForm: []
        });
        break;
    }
  };

  render() {
    const { data } = this.props;
    const {
      errors,
      isLoading,
      dataSearch,
      modalVisible,
      modalDeleteVisible,
      modalEditVisible,
      itemDetail,
      dataIndukSelectForm,
      dataSubIndukSelectForm
    } = this.state;
    const dataFilter = data.filter(items =>
      items.name.toLowerCase().includes(dataSearch.toLowerCase())
    );

    return (
      <Row className="pb-4">
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <div className="mr-auto">Data Equipment</div>
                <div className="px-2">
                  <InputGroup seamless>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon="search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput
                      type="text"
                      className="pr-5"
                      placeholder="Cari Equipment"
                      onChange={e =>
                        this.setState({ dataSearch: e.target.value })
                      }
                    />
                  </InputGroup>
                </div>
                <div className="pr-2">
                  <Button
                    className="px-5"
                    theme="success"
                    onClick={() => this.toggle("CREATE")}
                  >
                    <FontAwesomeIcon icon="plus" />
                    &nbsp;Equipment Baru
                  </Button>
                </div>
                <ModalEquipmentCreate
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  refresh={this.fetchData}
                  errors={errors ? errors : []}
                  dataIndukSelectForm={
                    dataIndukSelectForm ? dataIndukSelectForm : []
                  }
                  dataSubIndukSelectForm={
                    dataSubIndukSelectForm ? dataSubIndukSelectForm : []
                  }
                  fetchSubIndukSelectForm={this.fetchSubIndukSelectForm}
                />
                <ModalEquipmentEdit
                  isOpen={modalEditVisible}
                  toggle={this.toggle}
                  item={itemDetail}
                  refresh={this.fetchData}
                  dataIndukSelectForm={
                    dataIndukSelectForm ? dataIndukSelectForm : []
                  }
                  dataSubIndukSelectForm={
                    dataSubIndukSelectForm ? dataSubIndukSelectForm : []
                  }
                  fetchSubIndukSelectForm={this.fetchSubIndukSelectForm}
                />
                <ModalEquipmentDelete
                  isOpen={modalDeleteVisible}
                  toggle={this.toggle}
                  item={itemDetail}
                  refresh={this.fetchData}
                />
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={dataFilter}
              headerData={equipmentHeader}
              {...this.props}
            >
              {dataFilter.map((item, key) => (
                <tr key={`~${key}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.parent.name}</td>
                  <td>
                    <div className="d-flex flex-row">
                      <Button
                        className="px-2"
                        theme="warning"
                        onClick={() => this.toggle("EDIT", item)}
                      >
                        <FontAwesomeIcon icon="edit" />
                        &nbsp;Edit
                      </Button>
                      <Button
                        className="px-2 ml-2"
                        outline
                        theme="danger"
                        onClick={() => this.toggle("DELETE", item)}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </ListItemsWithSpinner>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  data: state.strukturAset.equipments
});
export default connect(mapStateToProps)(EquipmentContainer);
