import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormInput
} from "shards-react";

import ListItems from "../../components/ListItems";
import request from "../../utils/request";
import WithSpinner from "../../components/spinner/spinner";
import PageTitle from "../../components/common/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { perusahaanHeader } from "../../data/column-header-items";
import { showAlert, dismissAlert } from "../../redux/alert/actions";
import { connect } from "react-redux";
import ModalPerusahaanCreate from "./modalAkun/ModalPerusahaanCreate";

const ListItemsWithSpinner = WithSpinner(ListItems);

class Index extends React.Component {
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
    request({
      method: "GET",
      url: "/companies"
    })
      .then(resp => {
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

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { data, isLoading, dataSearch, modalVisible } = this.state;
    const dataFilter = data.filter(items =>
      items.name.toLowerCase().includes(dataSearch.toLowerCase())
    );

    return (
      <Container className="m-4">
        <Row className="page-header pb-4">
          <PageTitle
            sm="4"
            title="Super Admin"
            subtitle="Kelola Akun"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <div className="mr-auto">Data Aset</div>
                  <div className="px-2">
                    <InputGroup seamless>
                      <InputGroupAddon type="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon="search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        className="pr-5"
                        placeholder="Cari Perusahaan"
                        onChange={e =>
                          this.setState({
                            dataSearch: e.target.value
                          })
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="px-2">
                    <Link to="/">
                      <Button outline theme="primary">
                        <FontAwesomeIcon icon="filter" />
                        &nbsp;Filter
                      </Button>
                    </Link>
                  </div>
                  <div className="pr-2">
                    <Button
                      className="px-5"
                      theme="success"
                      onClick={this.toggle}
                    >
                      <FontAwesomeIcon icon="plus" />
                      &nbsp;Perusahaan
                    </Button>
                    <ModalPerusahaanCreate
                      isOpen={modalVisible}
                      refresh={this.fetchData}
                      toggle={this.toggle}
                    />
                  </div>
                </div>
              </CardHeader>
              <ListItemsWithSpinner
                isLoading={isLoading}
                items={dataFilter}
                headerData={perusahaanHeader}
                scrollHeight="75vh"
                {...this.props}
              >
                {dataFilter.map((item, key) => (
                  <tr key={`${item.name}~${item.id}`}>
                    <td className="pl-3">{++key}</td>
                    <td className="pl-3">{item.name}</td>
                    <td className="pl-3">{item.email}</td>
                    <td className="pl-3">{item.tel}</td>
                    <td className="pl-3">{item.address}</td>
                  </tr>
                ))}
              </ListItemsWithSpinner>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Index);
