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
  FormInput,
  Badge,
  ButtonGroup
} from "shards-react";

import ListItems from "../../components/ListItems";
import request from "../../utils/request";
import WithSpinner from "../../components/spinner/spinner";
import PageTitle from "../../components/common/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { CSVLink } from "react-csv";
import { assetHeader } from "../../data/column-header-items";
import { showAlert, dismissAlert } from "../../redux/alert/actions";
import { connect } from "react-redux";
import ModalAssetCreateFromCSV from "./modalAset/ModalAssetCreateFromCSV";
import { AssetCSVHeader } from "../../data/csvHeaders";
import { toYearMonthDayString } from "../../utils/stringTransformer";

const ListItemsWithSpinner = WithSpinner(ListItems);

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSearch: "",
      modalVisible: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    request({
      method: "GET",
      url: "/assets"
    }).then(resp => {
      this.setState({
        data: resp.data,
        isLoading: false
      });
    });
  };

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  handleClick = link => {
    this.props.history.push(link);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { user } = this.props;
    const { data, isLoading, dataSearch, modalVisible } = this.state;
    const dataFilter = data.filter(items =>
      items.name.toLowerCase().includes(dataSearch.toLowerCase())
    );
    return (
      <Container className="m-4">
        <Row className="page-header pb-4">
          <PageTitle
            sm="4"
            title={user.name}
            subtitle="Kelola Aset"
            className="text-sm-left"
          />
        </Row>
        <Row className="pb-4">
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
                        placeholder="Cari Aset"
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
                  <div className="px-2">
                    <CSVLink
                      data={dataFilter}
                      headers={AssetCSVHeader}
                      filename="data-aset.csv"
                    >
                      <Button outline theme="primary">
                        Download Data
                      </Button>
                    </CSVLink>
                  </div>
                  <div className="pr-2">
                    <ButtonGroup>
                      <Button
                        className="px-4"
                        outline
                        theme="success"
                        onClick={this.toggle}
                      >
                        Upload CSV
                      </Button>
                      <Link to="/equipment/asset">
                        <Button
                          className="px-5"
                          style={{
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0"
                          }}
                          theme="success"
                        >
                          <FontAwesomeIcon icon="plus" />
                          &nbsp;Aset Baru
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </div>
                </div>
                <ModalAssetCreateFromCSV
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  refresh={this.fetchData}
                />
              </CardHeader>
              <ListItemsWithSpinner
                isLoading={isLoading}
                items={dataFilter}
                headerData={assetHeader}
                scrollHeight="75vh"
                {...this.props}
              >
                {dataFilter.map((item, key) => (
                  <tr
                    key={`${item.name}~${item.id}`}
                    onClick={e => this.handleClick(`/${item.name}/${item.id}`)}
                  >
                    <td className="pl-3">{++key}</td>
                    <td className="pl-3">{item.name}</td>
                    <td className="pl-3">{item.group.name}</td>
                    <td className="pl-3">{item.manufacturer}</td>
                    <td className="pl-3">
                      {toYearMonthDayString(item.installation_date)}
                    </td>
                    <td>
                      <Badge
                        pill
                        outline
                        style={{
                          color: item.class.color,
                          borderColor: item.class.color
                        }}
                      >
                        {item.class.name}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        pill
                        outline
                        style={{
                          color: item.class.color,
                          borderColor: item.class.color
                        }}
                      >
                        {item.class.name}
                      </Badge>
                    </td>
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

const mapStateToProps = state => ({
  user: state.auth.userData
});

export default connect(mapStateToProps)(withRouter(Index));
