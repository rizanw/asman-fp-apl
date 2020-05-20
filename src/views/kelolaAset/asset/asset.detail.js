import React, { Fragment } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  CardHeader,
  Badge
} from "shards-react";

import ManageData from "./manageData.container";
import { connect } from "react-redux";
import { formatIndonesianCurrency } from "../../../utils/numberFormatter";
import { toLocaleDateString } from "../../../utils/stringTransformer";

class AssetDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modalVisible: false,
      modalDeleteVisible: false,
      modalEditVisible: false,
      toggleTabs: false
    };
  }

  toggleTabs = () => {
    this.setState({
      toggleTabs: !this.state.toggleTabs
    });
  };

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  toggleDelete = () => {
    this.setState({
      modalDeleteVisible: !this.state.modalDeleteVisible
    });
  };

  toggleEdit = () => {
    this.setState({
      modalEditVisible: !this.state.modalEditVisible
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { item, toggleDelete, toggleEdit, toggle } = this.props;
    const custom_field_list =
      item.custom_fields !== null ? Object.entries(item.custom_fields) : [];
    return (
      <Row>
        <Col sm="9" className="pl-0 mt-3">
          <Card>
            <CardHeader className="px-0">
              <Nav tabs className="text-center">
                <Col sm="6">
                  <NavItem>
                    <NavLink
                      active={!this.state.toggleTabs}
                      type="button"
                      onClick={this.toggleTabs}
                    >
                      Detail Aset
                    </NavLink>
                  </NavItem>
                </Col>
                <Col sm="6">
                  <NavItem>
                    <NavLink
                      active={this.state.toggleTabs}
                      type="button"
                      onClick={this.toggleTabs}
                    >
                      Jadwal Servis
                    </NavLink>
                  </NavItem>
                </Col>
              </Nav>
            </CardHeader>
            <CardBody className="px-0 py-3" style={{ minHeight: "75vh" }}>
              {this.state.toggleTabs ? (
                <Fragment key="jadwalServis">
                  <div className="px-4 py-3 border-bottom">
                    <Row className="d-flex align-items-center">
                      <Col>
                        <FormGroup>
                          <h6>Tanggal Servis</h6>
                          <h5>
                            {"start_date" in item.service_plan
                              ? toLocaleDateString(item.service_plan.start_date)
                              : "Belum ada jadwal"}
                          </h5>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <h6>Lama Waktu Servis</h6>
                          <h5>
                            {"long" in item.service_plan
                              ? `${item.service_plan.long} Hari`
                              : "-"}
                          </h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <h6>Jadwal Periodik Servis</h6>
                          <h5>
                            {"periodic" in item.service_plan
                              ? `${item.service_plan.periodic} Hari`
                              : "-"}
                          </h5>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 py-3 border-bottom">
                    <Row>
                      <Col>
                        <div className="px-4 py-3 rounded border">
                          <h5>Tidak ada order</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 py-3">
                    <Row>
                      <Col>
                        <FormGroup>
                          <h6>Riwayat Servis</h6>
                          <h5>Belum ada</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Fragment>
              ) : (
                <Fragment key="detailAsset">
                  <div className="px-4 py-3 border-bottom">
                    <Row>
                      <Col>
                        <FormGroup>
                          <h6>Nama Aset</h6>
                          <h5>{item.name}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Nomor Aset</h6>
                          <h5>{item.serial_number}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Tipe Aset</h6>
                          <Badge
                            pill
                            outline
                            style={{
                              color: item.type && item.type.color,
                              borderColor: item.type && item.type.color
                            }}
                          >
                            {item.type && item.type.name}
                          </Badge>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 py-3 border-bottom">
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Induk</h6>
                          <h5>
                            {item.group &&
                              item.group.parent &&
                              item.group.parent.parent &&
                              item.group.parent.parent.name}
                          </h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Sub Induk</h6>
                          <h5>
                            {item.group &&
                              item.group.parent &&
                              item.group.parent.name}
                          </h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Equipment</h6>
                          <h5>{item.group && item.group.name}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 py-3 border-bottom">
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Jenis Part</h6>
                          <h5>{item.growth_type && item.growth_type.name}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Growth/Depression Rate</h6>
                          <h5>{item.growth_rate}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Kelas Aset</h6>
                          <h5>{item.class && item.class.name}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Konsumsi Aset</h6>
                          <h5>
                            {item.consumption_type &&
                              item.consumption_type.name}
                          </h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Kategori</h6>
                          <h5>{item.category && item.category.name}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Pabrikan</h6>
                          <h5>{item.manufacturer}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Kapasitas</h6>
                          <h5>{item.capacity}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Satuan Kapasitas</h6>
                          <h5>{item.capacity_unit}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Harga</h6>
                          <h5>Rp {formatIndonesianCurrency(item.price)}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Nomor Seri</h6>
                          <h5>{item.serial_number}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Tanggal Pembuatan</h6>
                          <h5>{toLocaleDateString(item.manufacture_date)}</h5>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <h6>Tanggal Pemasangan</h6>
                          <h5>{toLocaleDateString(item.installation_date)}</h5>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 py-3 ">
                    {item.custom_fields !== null &&
                      custom_field_list.map((custom_field, key) => (
                        <Row>
                          <Col sm="6">
                            <FormGroup>
                              <h6>{custom_field[0]}</h6>
                              <h5>{custom_field[1]}</h5>
                            </FormGroup>
                          </Col>
                        </Row>
                      ))}
                  </div>
                </Fragment>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" className="pl-0 mt-3">
          <ManageData
            // isServicePlan={Boolean(item.service_plan.start_date)}
            dataSuffix="Equipment"
            buttonSuffix="Detail Aset"
            buttonSwitch={this.state.toggleTabs}
            toggleDelete={toggleDelete}
            toggleEdit={toggleEdit}
            toggle={toggle}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AssetDetails);
