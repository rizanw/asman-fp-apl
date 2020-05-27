import React from "react";
import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";
import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import { fetchMyRentalData } from "../../../redux/rental/fetchRental";

class ModalMyRentalDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSeach: "",
      isLoading: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    request({
      method: "DELETE",
      url: `/rental/my-asset/delete/${this.props.item.id}`
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.dispatch(fetchMyRentalData());
        this.props.toggle();
        this.setState({
          form: {}
        });
        setTimeout(() => this.props.dispatch(dismissAlert()), 1000);
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  render() {
    const { isOpen, toggle, item } = this.props;

    return (
      <ModalForm
        delete
        title="Hapus"
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        toggle={toggle}
      >
        <h5>{item && item.asset.name}</h5>
      </ModalForm>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalMyRentalDelete);

