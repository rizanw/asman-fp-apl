import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Badge
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrays = [];
for (let index = 0; index < 10; index++) {
  arrays.push(
    <Col sm="4" xs="12" className="mb-4 equipment-items">
      <Card>
        <CardHeader className="border-bottom py-2 px-3">
          <h6>
            <FontAwesomeIcon icon="box-open" />
            &nbsp;Bank Niaga cabang Mulyosari
          </h6>
        </CardHeader>
        <CardBody className="p-2">
          <Row className="text-center">
            <Col md="4" xs="12" className="px-1">
              <p>Depression</p>
            </Col>
            <Col md="4" xs="12" className="px-0 border-right border-left">
              <p>Non-Important</p>
            </Col>
            <Col md="4" xs="12" className="px-1">
              <p>Low Cost</p>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="border-top py-2 px-2">
          <div class="d-flex justify-content-between align-items-center">
            <Badge outline pill theme="secondary" className="mr-2">
              <p>Non-Supporting</p>
            </Badge>
            <p>Belum ada jadwal preventif</p>
            {/* <p>
              <FontAwesomeIcon icon="calendar" />
              &nbsp;31 Mar 2020
            </p> */}
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
}

const ListItemsEquipment = ({ items }) => {
  return <Row>{arrays}</Row>;
};

export default ListItemsEquipment;
