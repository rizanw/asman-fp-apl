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
import { fetchRentOutData } from "../../redux/rental/fetchRental";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statusRentalOutHeader } from "../../data/column-header-items";
import { connect } from "react-redux";
import ModalRentOutEdit from "./modalRentOut/ModalRentOutEdit";

const ListItemsWithSpinner = WithSpinner(ListItems);

class RentOutContainer extends React.Component {
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
      fetchRentOutData(),
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
      case "EDIT":
        this.setState({
          modalEditVisible: true,
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
    const { rentOutData: data } = this.props;
    const {
      isLoading,
      modalVisible,
      modalEditVisible,
      itemDetail,
      dataSearch
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
                <div className="mr-auto">Rent-Out</div>
              </div>
              <ModalRentOutEdit
                isOpen={modalEditVisible}
                toggle={this.toggle}
                item={itemDetail}
                refresh={this.fetchData}
              />
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={data}
              headerData={statusRentalOutHeader}
              {...this.props}
            >
              {data.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.rental.asset.name}</td>
                  <td>{item.rental.owner.name}</td>
                  <td>{item.rental.price}</td>
                  <td>{item.status}</td>
                  <td>{item.duration}</td>
                  <td>{item.issue_date}</td>
                  <td>{item.return_date}</td>
                  <td>
                    <Button
                      className="px-2 ml-2"
                      outline
                      theme="danger"
                      onClick={() => this.toggle("EDIT", item)}
                    >
                      <FontAwesomeIcon icon="edit" />
                      Konfirmasi
                    </Button>
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
  rentOutData: state.rental.rentOut
});

export default connect(mapStateToProps)(RentOutContainer);
