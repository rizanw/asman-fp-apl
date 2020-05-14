import React from "react";
import { Row, Col } from "shards-react";

const TitleHeader = ({ section, title }) => {
  return (
    <Row>
      <Col className="p-0">
        <h6 className="font-weight-bold text-uppercase text-secondary m-0">
          {section}
        </h6>
        <h3 className="font-weight-normal text-capitalized">{title}</h3>
      </Col>
    </Row>
  );
};

export default TitleHeader;
