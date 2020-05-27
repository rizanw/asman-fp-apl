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
import { fetchRentInData } from "../../redux/rental/fetchRental";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statusRentalInHeader } from "../../data/column-header-items";
import { connect } from "react-redux";

const ListItemsWithSpinner = WithSpinner(ListItems);

class RentInContainer extends React.Component {
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
    this.props.dispatch(fetchRentInData(), this.setState({ isLoading: false }));
  };

  render() {
    const { rentInData: data } = this.props;
    const {
      isLoading,
      modalVisible,
      modalEditVisible,
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
                <div className="mr-auto">Rent-In</div>
              </div>
            </CardHeader>
            <ListItemsWithSpinner
              isLoading={isLoading}
              items={data}
              headerData={statusRentalInHeader}
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
  rentInData: state.rental.rentIn
});

export default connect(mapStateToProps)(RentInContainer);