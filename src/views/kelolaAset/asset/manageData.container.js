import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageData = ({
  toggle,
  buttonSuffix,
  buttonSwitch,
  isServicePlan,
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
      <CardBody className="py-3 px-3 border-bottom">
        <div className="d-flex flex-row">
          {buttonSwitch ? (
            <Button
              className="px-2"
              theme="warning"
              onClick={() => toggleEdit("SCHEDULE")}
            >
              <FontAwesomeIcon icon="edit" />
              &nbsp;Edit Jadwal Servis
            </Button>
          ) : (
            <div>
              <Button
                className="px-2"
                theme="warning"
                onClick={() => toggleEdit("ASSET")}
              >
                <FontAwesomeIcon icon="edit" />
                &nbsp;Edit Detail Aset
              </Button>
              <Button
                className="px-2 ml-2"
                outline
                theme="danger"
                onClick={toggleDelete}
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="py-3 px-3">
        {/* {isServicePlan && (
          <Button block theme="primary" onClick={() => toggle("JADWAL")}>
            Rilis Jadwal Sekarang
          </Button>
        )} */}
      </CardFooter>
    </Card>
  );
};

export default ManageData;
