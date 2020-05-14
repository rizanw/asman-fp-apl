import React from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
  Row,
  Col,
  CardHeader,
  CardFooter
} from "shards-react";
import { connect } from "react-redux";
import { signIn } from "../redux/auth/authAPI";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo/logo-min.png";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: null,
    redirect: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props
      .dispatch(signIn(this.state))
      .then(res => this.setState({ redirect: true }))
      .catch(err =>
        this.setState({
          error: err.message
        })
      );
  };

  render() {
    const { redirect, error } = this.state;

    const isLogin = Boolean(Cookies.get("userId"));

    return isLogin || redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <Row
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Col className="text-right">
            <h1 className="mb-4" style={{ fontSize: "5em" }}>
              Special Service
            </h1>
            <h5 style={{ fontSize: "2em" }}>by A7 Pro</h5>
          </Col>
          <Col sm="6" md="4">
            <Card>
              <CardHeader className="text-center">
                <img alt="apitu pro logo" src={logo} width="45%" />
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <h6 className="text-danger">{error}</h6>
                  <FormGroup>
                    <label>Username</label>
                    <FormInput
                      required
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <FormInput
                      required
                      type="password"
                      name="password"
                      placeholder="username"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button block type="submit" theme="primary">
                    Login
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className="py-5 watermark-background" />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Login);
