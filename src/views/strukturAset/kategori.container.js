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
import { kategoriHeader } from "../../data/column-header-items";
import { showAlert, dismissAlert } from "../../redux/alert/actions";
import { connect } from "react-redux";
import ModalKategoriCreate from "./modalKategori/ModalKategoriCreate";
import ModalKategoriEdit from "./modalKategori/ModalKategoriEdit";
import ModalKategoriDelete from "./modalKategori/ModalKategoriDelete";
import { fetchCategoriesData } from "../../redux/strukturAset/fetchStrukturAset";

const ListItemsWithSpinner = WithSpinner(ListItems);

class KategoriContainer extends React.Component {
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
  }

  fetchData = () => {
    this.props.dispatch(
      fetchCategoriesData(),
      this.setState({
        isLoading: false
      })
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "POST",
      url: "/categories",
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
        this.setState({
          modalVisible: true
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
          itemDetail: item
        });
        break;
      default:
        this.setState({
          modalVisible: false,
          modalEditVisible: false,
          modalDeleteVisible: false
        });
        break;
    }
  };

  render() {
    const { data } = this.props;
    const {
      isLoading,
      dataSearch,
      modalVisible,
      modalDeleteVisible,
      modalEditVisible,
      itemDetail
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
                <div className="mr-auto">Kategori</div>
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
                      placeholder="Cari Induk"
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
                    &nbsp;Kategori Baru
                  </Button>
                </div>
                <ModalKategoriCreate
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  refresh={this.fetchData}
                />
                <ModalKategoriEdit
                  isOpen={modalEditVisible}
                  toggle={this.toggle}
                  item={itemDetail}
                  refresh={this.fetchData}
                />
                <ModalKategoriDelete
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
              headerData={kategoriHeader}
              {...this.props}
            >
              {dataFilter.map((item, key) => (
                <tr key={`~${key}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
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

const mapStateToProps = state => ({ data: state.strukturAset.categories });
export default connect(mapStateToProps)(KategoriContainer);
