import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  CardFooter,
  Button
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ManageData = ({
  buttonSuffix,
  dataSuffix,
  toggleAdd,
  toggleAddEquipment,
  toggleDelete,
  toggleEdit,
  ...props
}) => {
  return (
    <Card>
      <CardHeader className="border-bottom">Aksi</CardHeader>
      <CardBody className="py-3 px-3">
        <h6 className="font-weight-bold">Nama {dataSuffix}</h6>
        <h6>Bank Niaga Cabang Mulyosari</h6>
        {toggleEdit && (
          <Row noGutters className="mt-3">
            <Button block theme="warning" onClick={toggleEdit}>
              <FontAwesomeIcon icon="edit" />
              &nbsp;Edit {buttonSuffix}
            </Button>
          </Row>
        )}
        {toggleDelete && (
          <Row noGutters className="mt-3">
            <Button block outline theme="danger" onClick={toggleDelete}>
              <FontAwesomeIcon icon="trash" />
              &nbsp;Hapus {buttonSuffix}
            </Button>
          </Row>
        )}
      </CardBody>
      <CardFooter className="border-top py-3 px-3">
        {props.asset ? (
          <Link to="/equipment/asset">
            <Button
              block
              outline={toggleAddEquipment && true}
              theme="success"
              onClick={toggleAdd}
            >
              <FontAwesomeIcon icon="plus" />
              &nbsp;Tambah
              {buttonSuffix && props.asset ? "Asset" : buttonSuffix}
            </Button>
          </Link>
        ) : (
          <Button
            block
            outline={toggleAddEquipment && true}
            theme="success"
            onClick={toggleAdd}
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;Tambah {buttonSuffix}
          </Button>
        )}
        {toggleAddEquipment && (
          <Button block theme="success" onClick={toggleAddEquipment}>
            <FontAwesomeIcon icon="plus" />
            &nbsp;Equipment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ManageData;
