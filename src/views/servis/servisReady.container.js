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
  InputGroupAddon,
  FormCheckbox
} from "shards-react";

import ListItems from "../../components/ListItems";
import request from "../../utils/request";
import WithSpinner from "../../components/spinner/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statusServisReadyHeader } from "../../data/column-header-items";
import ModalAssetReleaseJadwal from "../kelolaAset/modalAset/ModalAssetReleaseJadwal";
import { connect } from "react-redux";
import { fetchReadyServicesData } from "../../redux/servis/fetchServis";

const ListItemsWithSpinner = WithSpinner(ListItems);

class ServisReadyContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      service_id: [],
      checkAll: false,
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
      fetchReadyServicesData(),
      this.setState({ isLoading: false })
    );

    // request({
    //   method: "GET",
    //   url: "/services/ready"
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

  handleChange = e => {
    const { name, value } = e.target;
    const { service_id } = this.state;
    if (name === "service_id") {
      const valueIndex = service_id.indexOf(value);
      if (valueIndex !== -1) {
        var arrayCopy = [...this.state.service_id];
        arrayCopy.splice(valueIndex, 1);
      } else arrayCopy = [...this.state.service_id, value];
      this.setState({
        service_id: arrayCopy,
        checkAll: false
      });
    } else if (name === "checkAll") {
      const { data, checkAll } = this.state;
      var checkedArray = [];
      if (!checkAll) {
        data.forEach(item => checkedArray.push(item.id));
      }
      this.setState({
        checkAll: !this.state.checkAll,
        service_id: checkedArray
      });
    } else
      this.setState({
        [name]: value
      });
  };

  render() {
    const { servisReadyData: data } = this.props;
    const {
      isLoading,
      dataSearch,
      modalVisible,
      service_id,
      checkAll
    } = this.state;
    const dataFilter = data.filter(items =>
      items.asset.name.toLowerCase().includes(dataSearch.toLowerCase())
    );

    return (
      <Row className="pb-4">
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <div className="mr-auto">Ready</div>
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
                <div className="pr-2">
                  <Button
                    className="px-5"
                    theme="primary"
                    onClick={this.toggle}
                  >
                    Release Aset
                  </Button>
                </div>
                <ModalAssetReleaseJadwal
                  refresh={this.fetchData}
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  {...this.state}
                />
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              checkboxHeader
              isLoading={isLoading}
              items={dataFilter}
              headerChecked={checkAll}
              headerData={statusServisReadyHeader}
              handleChange={this.handleChange}
              {...this.props}
            >
              {dataFilter.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">
                    <FormCheckbox
                      className="m-0"
                      name="service_id"
                      value={item.id}
                      checked={service_id && service_id.includes(item.id)}
                      onChange={e => {
                        e.target.name = "service_id";
                        e.target.value = item.id;
                        this.handleChange(e);
                      }}
                    />
                  </td>
                  <td>{item.asset.name}</td>
                  <td>{item.asset.group.parent.parent.name}</td>
                  <td>{item.asset.group.parent.name}</td>
                  <td>{item.asset.group.name}</td>
                  <td>{item.status}</td>
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
  servisReadyData: state.servis.ready
});

export default connect(mapStateToProps)(ServisReadyContainer);
