import React from "react";
import {
  Card,
  FormGroup,
  FormInput,
  CardBody,
  CardHeader,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  CardFooter
} from "shards-react";
import ErrorMessages from "../../../../components/errorMessages";

const JadwalForm = ({ formData, errors, handleChange, handleSkip, step }) => {
  return step === 2 ? (
    <Card>
      <CardHeader className="border-bottom px-4">
        <h5 className="m-0">Jadwal Servis</h5>
      </CardHeader>
      <CardBody className="px-4 pb-2">
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="induk">Tanggal Mulai Servis</label>
              <FormInput
                required
                type="date"
                name="start_date"
                // value={
                //   formData.service_plan && formData.service_plan.start_date
                // }
                placeholder="Masukkan nama induk disini"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.start_date} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="">Lama Waktu Servis</label>
              <Row>
                <Col sm="6">
                  <InputGroup className="mb-2">
                    <FormInput
                      required
                      type="number"
                      name="long"
                      // value={formData.number}
                      placeholder="Lama servis"
                      onChange={handleChange}
                    />
                    <InputGroupAddon type="append">
                      <InputGroupText>Hari</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <ErrorMessages message={errors.long} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <label htmlFor="">Jadwal Periodik Servis</label>
              <Row>
                <Col sm="6">
                  <InputGroup className="mb-2">
                    <FormInput
                      required
                      type="number"
                      name="periodic"
                      // value={formData.periodic}
                      placeholder="Lama servis"
                      onChange={handleChange}
                    />
                    <InputGroupAddon type="append">
                      <InputGroupText>Hari</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <ErrorMessages message={errors.periodic} />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="border-top py-3 px-4">
        <Button outline className="mr-4" theme="success" onClick={handleSkip}>
          Atur Jadwal Nanti
        </Button>
        <Button type="submit" theme="success">
          Daftarkan aset
        </Button>
      </CardFooter>
    </Card>
  ) : null;
};

export default JadwalForm;
