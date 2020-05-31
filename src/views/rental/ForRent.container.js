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
import { fetchForRentData } from "../../redux/rental/fetchRental";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroups from "../../components/components-overview/InputGroups";
import { connect } from "react-redux";
import { statusRentalForRentHeader } from "../../data/column-header-items"; 
import ModalForRentCreate from "./modalForRent/ModalForRentCreate";

const ListItemsWithSpinner = WithSpinner(ListItems);

class ForRentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSearch: "",
      modalVisible: false,
      modalRentVisible: false,
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
      fetchForRentData(),
      this.setState({ isLoading: false })
    );
  };

  toggle = (type, item) => {
    switch(type) {
      case "CREATE":
        this.setState({
          modalRentVisible: true
        })
        break;
      default:
        this.setState({
          modalVisible: false,
          modalRentVisible: false
        })
        break
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { forRentData: data } = this.props;
    const {
      isLoading,
      modalVisible,
      modalRentVisible,
      itemDetail,
      dataRentalSelectForm,
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
                <div className="mr-auto">For Rent</div>
                <div className="px-2">
                  <InputGroup seamless> 
                    <div className="pr-2">
                      <Button
                        className="px-5"
                        theme="success"
                        onClick={() => this.toggle("CREATE")}
                      >
                        <FontAwesomeIcon icon="plus" />
                        &nbsp;Sewa Aset
                      </Button>
                    </div>
                  </InputGroup>
                </div>
                <ModalForRentCreate
                  isOpen={modalRentVisible}
                  toggle={this.toggle} 
                  refresh={this.fetchData}
                  dataRentalSelectForm={
                    dataRentalSelectForm ? dataRentalSelectForm : []
                  }
                />
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={data}
              headerData={statusRentalForRentHeader}
              {...this.props}
            >
              {data.map((item, key) => (
                <tr key={`${item.name}~${item.id}`}>
                  <td className="pl-3">{++key}</td>
                  <td>{item.asset.name}</td>
                  <td>{item.owner.name}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.status}
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
  forRentData: state.rental.forRent
});

export default connect(mapStateToProps)(ForRentContainer);
