import React from "react";
import {
  Row,
  FormInput,
  Col,
  Card,
  CardHeader,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  FormGroup
} from "shards-react";

import { toLocaleDateString } from "../../utils/stringTransformer";
import ListItems from "../../components/ListItems";
import request from "../../utils/request";
import WithSpinner from "../../components/spinner/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statusServisHeader } from "../../data/column-header-items";
import ModalForm from "../../components/Modal";
import { connect } from "react-redux";
import { fetchReleaseServiceData } from "../../redux/servis/fetchServis";

const ListItemsWithSpinner = WithSpinner(ListItems);

class ServisReleaseContainer extends React.Component {
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
      fetchReleaseServiceData(),
      this.setState({ isLoading: false })
    );
    // request({
    //   method: "GET",
    //   url: "/services/released"
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
    this.setState({
      [name]: value
    });
  };

  render() {
    const { servisReleaseData: data } = this.props;
    const { isLoading, dataSearch } = this.state;
    const dataFilter = data.filter(items =>
      items.asset.name.toLowerCase().includes(dataSearch.toLowerCase())
    );

    return (
      <Row className="pb-4">
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <div className="mr-auto">Release</div>
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

                <ModalForm
                  create
                  title="Tambah"
                  isOpen={this.state.modalVisible}
                  toggle={this.toggle}
                >
                  <FormGroup>
                    <label htmlFor="name">Nama Induk</label>
                    <FormInput
                      type="text"
                      name="name"
                      placeholder="Nama Induk"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </ModalForm>
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={dataFilter}
              headerData={statusServisHeader}
              {...this.props}
            >
              {dataFilter.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.asset.name}</td>
                  <td>{item.asset.group.parent.parent.name}</td>
                  <td>{item.asset.group.parent.name}</td>
                  <td>{item.asset.group.name}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.service_date
                      ? toLocaleDateString(item.service_date)
                      : "-"}
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
  servisReleaseData: state.servis.release
});

export default connect(mapStateToProps)(ServisReleaseContainer);
