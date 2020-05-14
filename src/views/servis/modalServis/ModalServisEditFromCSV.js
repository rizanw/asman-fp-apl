import React from "react";
import { FormInput, FormGroup, Button } from "shards-react";

import request from "../../../utils/request";
import { showAlert, dismissAlert } from "../../../redux/alert/actions";

import ModalForm from "../../../components/Modal";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import ErrorMessages from "../../../components/errorMessages";

class ModalServisEditFromCSV extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: [],
      dataSearch: "",
      isLoading: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { form } = this.state;
    const formData = new FormData();

    formData.append("csv", form ? form.file : null);

    request({
      method: "POST",
      url: `/services/unplanned/csv`,
      data: formData
    })
      .then(resp => {
        this.props.dispatch(
          showAlert(resp.messageNotification || resp, "success")
        );
        this.props.refresh();
        this.props.toggle();
        this.setState({
          form: {},
          error: []
        });
        setTimeout(() => this.props.dispatch(dismissAlert()), 1000);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleDownloadTemplate = event => {
    event.preventDefault();
    request({
      method: "GET",
      url: `/services/revision/csv`,
      responseType: "blob"
    })
      .then(resp => {
        saveAs(resp, "template-edit-servis.csv");
      })
      .catch(err => {
        this.props.dispatch(
          showAlert(err.messageNotification || err, "danger")
        );
      });
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({
      form: { [name]: e.target.files[0] }
    });
  };

  render() {
    const { error } = this.state;
    const { isOpen, toggle } = this.props;

    return (
      <ModalForm
        edit
        title="Upload CSV"
        isOpen={isOpen}
        toggle={toggle}
        handleSubmit={this.handleSubmit}
      >
        <div className="d-flex justify-content-end">
          <Button outline theme="success" onClick={this.handleDownloadTemplate}>
            Download Template CSV
          </Button>
        </div>
        <FormGroup className="my-4">
          <label htmlFor="file">Upload file CSV Servis</label>
          <FormInput
            type="file"
            name="file"
            id="file"
            onChange={this.handleChange}
          />
          <ErrorMessages message={error} />
        </FormGroup>
      </ModalForm>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ModalServisEditFromCSV);
