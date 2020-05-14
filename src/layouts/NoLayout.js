import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const NoLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid className="watermark-background">
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);

NoLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

NoLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default NoLayout;
