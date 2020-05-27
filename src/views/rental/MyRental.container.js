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
import WithSpinner from "../../components/spinner/spinner";
import ListItems from "../../components/ListItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { fetchMyRentalData } from "../../redux/rental/fetchRental";
import { statusMyRentalHeader } from "../../data/column-header-items";
import ModalMyRentalCreate from "./modalMyRental/ModalMyRentalCreate";
import ModalMyRentalDelete from "./modalMyRental/ModalMyRentalDelete";

const ListItemsWithSpinner = WithSpinner(ListItems);

class MyRentalContainer extends React.Component {
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
      fetchMyRentalData(),
      this.setState({ isLoading: false })
    );
  };

  toggle = (type, item) => {
    switch (type) {
      case "CREATE":
        this.setState({
          modalVisible: true
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
    const { myRentalData: data } = this.props;
    const {
      isLoading,
      modalVisible,
      modalDeleteVisible,
      itemDetail,
      dataSearch,
      dataAssetSelectForm
    } = this.state;
    // const dataFilter = data.filter(items =>
    //   items.name.toLowerCase().includes(dataSearch.toLowerCase())
    // );

    return (
      <Row className="pb-4">
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <div className="mr-auto">My Asset</div>
                <div className="pr-2">
                  <Button
                    className="px-5"
                    theme="success"
                    onClick={() => this.toggle("CREATE")}
                  >
                    <FontAwesomeIcon icon="plus" />
                    &nbsp;Sewakan Aset Baru
                  </Button>
                </div>
                <ModalMyRentalCreate
                  isOpen={modalVisible}
                  toggle={this.toggle}
                  refresh={this.fetchData}
                  dataAssetSelectForm={
                    dataAssetSelectForm ? dataAssetSelectForm : []
                  }
                />
                <ModalMyRentalDelete
                  isOpen={modalDeleteVisible}
                  toggle={this.toggle}
                  item={itemDetail}
                  refresh={this.fetchData}
                />
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={data}
              headerData={statusMyRentalHeader}
              {...this.props}
            >
              {data.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.asset.name}</td>
                  <td>{item.price}</td>
                  <td>{item.availability}</td>
                  <td>
                    <div>
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
  myRentalData: state.rental.myRental
});

export default connect(mapStateToProps)(MyRentalContainer);
