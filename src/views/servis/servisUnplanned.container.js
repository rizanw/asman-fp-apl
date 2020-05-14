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
import { statusServisHeader } from "../../data/column-header-items";
import { CSVLink } from "react-csv";
import { ServisCSVHeader } from "../../data/csvHeaders";
import ModalServisCreateFromCSV from "./modalServis/ModalServisCreateFromCSV";
import { connect } from "react-redux";
import { fetchUnplannedServicesData } from "../../redux/servis/fetchServis";
import ModalServisEditFromCSV from "./modalServis/ModalServisEditFromCSV";

const ListItemsWithSpinner = WithSpinner(ListItems);

class ServisUnplannedContainer extends React.Component {
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
    const { isLoading } = this.state;
    !isLoading &&
      this.setState({
        isLoading: true
      });
    this.props.dispatch(
      fetchUnplannedServicesData(),
      this.setState({ isLoading: false })
    );
    // request({
    //   method: "GET",
    //   url: "/services/unplanned"
    // })
    //   .then(resp => {
    //     this.setState({
    //       data: resp.data,
    //       isLoading: false
    //     });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  };

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  toggleEdit = () => {
    this.setState({
      modalEditVisible: !this.state.modalEditVisible
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { serviceUnplannedData: data } = this.props;
    const {
      isLoading,
      modalVisible,
      modalEditVisible,
      dataSearch
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
                <div className="mr-auto">Unplanned</div>
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
                  <CSVLink
                    data={dataFilter}
                    headers={ServisCSVHeader}
                    filename="data-servis.csv"
                  >
                    <Button outline theme="primary">
                      Download Data
                    </Button>
                  </CSVLink>
                </div>
                <div className="pr-2">
                  <Button
                    className="px-5"
                    theme="primary"
                    onClick={this.toggle}
                  >
                    Upload CSV
                  </Button>
                </div>
                <ModalServisCreateFromCSV
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  refresh={this.fetchData}
                />
                <div className="pr-2">
                  <Button
                    className="px-5"
                    theme="warning"
                    onClick={this.toggleEdit}
                  >
                    Edit Servis CSV
                  </Button>
                </div>
                <ModalServisEditFromCSV
                  isOpen={modalEditVisible}
                  toggle={this.toggleEdit}
                  refresh={this.fetchData}
                />
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={data}
              headerData={statusServisHeader}
              {...this.props}
            >
              {data.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.name}</td>
                  <td>{item.group.parent.parent.name}</td>
                  <td>{item.group.parent.name}</td>
                  <td>{item.group.name}</td>
                  <td>{item.status ? item.status : "-"}</td>
                  <td>{item.service_date ? item.service_date : "-"}</td>
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
  serviceUnplannedData: state.servis.unplanned
});

export default connect(mapStateToProps)(ServisUnplannedContainer);
