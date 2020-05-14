import React, { useState } from "react";
import {
  Card,
  FormGroup,
  FormInput,
  CardBody,
  CardHeader,
  Row,
  Col,
  FormRadio,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  FormCheckbox,
  Collapse,
  Button,
  CardFooter
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessages from "../../../../components/errorMessages";

const DetailForm = ({
  children,
  dataInduk,
  dataSubInduk,
  dataEquipment,
  dataCategory,
  selectOptions,
  handleChange,
  step,
  toggle,
  formData,
  errors,
  handleDeleteAdditionalForm,
  handleAddAdditionalForm,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([
    {
      label: "",
      isian: ""
    }
  ]);

  const addNewForm = () => {
    const values = [...fields];
    values.push({
      label: "",
      isian: ""
    });
    setFields(values);
  };

  const deleteNewForm = index => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const renderAdditionalForm = () => {
    return (
      formData.custom_field &&
      formData.custom_field.map((item, key) => (
        <Row key={`${item}-${key}`}>
          <Col sm="4">
            <FormGroup>
              <label htmlFor="additional_fields">Nama Label</label>
              <FormInput
                type="text"
                name="additional_fields"
                placeholder="Kapasitas aset"
                onChange={e => handleChange(e, key)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="additional_fields_input">Isian</label>
              <Row>
                <Col>
                  <FormInput
                    type="text"
                    name="additional_fields_input"
                    placeholder="contoh: PK"
                    onChange={e => handleChange(e, key)}
                  />
                </Col>
                <Col sm="2">
                  <Button
                    theme="danger"
                    onClick={() => handleDeleteAdditionalForm(key)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      ))
    );
  };

  return step === 1 ? (
    <Card>
      <CardHeader className="border-bottom px-4">
        <h5 className="m-0">Detail Aset</h5>
      </CardHeader>
      <CardBody className="px-4 py-3 border-bottom">
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="name">Nama Aset</label>
              <FormInput
                type="text"
                name="name"
                required
                // value={formData.name}
                placeholder="Masukkan nama asset"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.name} />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="px-4 py-3 border-bottom">
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="">Induk</label>
              <Row noGutters>
                <Col>
                  <FormSelect
                    name="nama_induk"
                    required
                    onChange={e =>
                      props.fetchSubIndukSelectForm(e.target.value)
                    }
                  >
                    <option disabled selected>
                      Pilih Induk
                    </option>
                    {dataInduk.map(item => (
                      <option
                        key={`${item.name}~${item.id}`}
                        value={item.id}
                        selected={formData.nama_induk === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                  <ErrorMessages message={errors.nama_induk} />
                </Col>
                <Col>
                  <Button
                    className="text-success"
                    theme=""
                    onClick={() => toggle("INDUK")}
                  >
                    Tambah induk baru
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <label htmlFor="">Sub Induk</label>
              <Row noGutters>
                <Col>
                  <FormSelect
                    required
                    name="nama_subinduk"
                    onChange={e =>
                      props.fetchEquipmentSelectForm(e.target.value)
                    }
                  >
                    <option disabled selected>
                      Pilih Sub Induk
                    </option>
                    {dataSubInduk.map((item, key) => (
                      <option
                        value={item.id}
                        selected={formData.nama_subinduk === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                  <ErrorMessages message={errors.nama_subinduk} />
                </Col>
                <Col>
                  <Button
                    className="text-success"
                    theme=""
                    onClick={() => toggle("SUBINDUK")}
                  >
                    Tambah sub induk baru
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <label htmlFor="">Equipment</label>
              <Row noGutters>
                <Col>
                  <FormSelect name="group_id" onChange={handleChange}>
                    <option disabled selected>
                      Pilih Equipment
                    </option>
                    {dataEquipment.map((item, key) => (
                      <option
                        value={item.id}
                        selected={formData.group_id === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                  <ErrorMessages message={errors.group_id} />
                </Col>
                <Col>
                  <Button
                    className="text-success"
                    theme=""
                    onClick={() => toggle("EQUIPMENT")}
                  >
                    Tambah equipment baru
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="px-4 py-3 border-bottom">
        <Row>
          <Col sm="6">
            <FormGroup>
              <label htmlFor="type_id">Tipe Aset</label>
              {selectOptions.types.map(item => (
                <FormRadio
                  key={`${item.name}~${item.id}`}
                  name="type_id"
                  value={item.id}
                  onChange={handleChange}
                  checked={formData.type_id === item.id}
                >
                  {item.name}
                </FormRadio>
              ))}
              <ErrorMessages message={errors.type_id} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="growth_type_id">
                Tipe Growth/Depression Rate
              </label>
              {selectOptions.growthTypes.map(item => (
                <FormRadio
                  key={`${item.name}~${item.id}`}
                  name="growth_type_id"
                  value={item.id}
                  checked={formData.growth_type_id === item.id}
                  onChange={handleChange}
                >
                  {item.name}
                </FormRadio>
              ))}
              <ErrorMessages message={errors.growth_type_id} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="growth_rate">Growth/Depression Rate</label>
              <InputGroup>
                <FormInput
                  type="number"
                  step=".01"
                  name="growth_rate"
                  required
                  // value={formData.growth_rate}
                  placeholder="contoh: 0.05"
                />
                <InputGroupAddon type="append">
                  <InputGroupText>% per Tahun</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <ErrorMessages message={errors.growth_rate} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="class_id">Kelas Aset</label>
              {selectOptions.classes.map(item => (
                <FormRadio
                  key={`${item.name}~${item.id}`}
                  name="class_id"
                  value={item.id}
                  checked={formData.class_id === item.id}
                  onChange={handleChange}
                >
                  {item.name}
                </FormRadio>
              ))}
              <ErrorMessages message={errors.class_id} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="consumption_type_id">Konsumsi Aset</label>
              {selectOptions.consumptionTypes.map(item => (
                <FormRadio
                  key={`${item.name}~${item.id}`}
                  name="consumption_type_id"
                  value={item.id}
                  checked={formData.consumption_type_id === item.id}
                  onChange={handleChange}
                >
                  {item.name}
                </FormRadio>
              ))}
              <ErrorMessages message={errors.consumption_type_id} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="category_id">Kategori</label>
              <Row noGutters>
                <Col>
                  <FormSelect
                    required
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option disabled selected>
                      Pilih Kategori
                    </option>
                    {dataCategory.map((item, key) => (
                      <option
                        key={`${item.name}~${item.id}`}
                        value={item.id}
                        selected={formData.category_id === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                  <ErrorMessages message={errors.category_id} />
                </Col>
                <Col>
                  <Button
                    className="text-success"
                    theme=""
                    onClick={() => toggle("CATEGORY")}
                  >
                    Tambah kategori baru
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <label htmlFor="manufacturer">Manufaktur</label>
              <FormInput
                type="text"
                name="manufacturer"
                required
                // value={formData.manufacturer}
                placeholder="Nama manufaktur"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.manufacturer} />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="capacity">Kapasitas</label>
                  <FormInput
                    type="text"
                    name="capacity"
                    required
                    // value={formData.capacity}
                    placeholder="Kapasitas aset"
                    onChange={handleChange}
                  />
                  <ErrorMessages message={errors.capacity} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="capacity_unit">Satuan kapasitas</label>
                  <FormInput
                    type="text"
                    name="capacity_unit"
                    required
                    // value={formData.capacity_unit}
                    placeholder="contoh: PK"
                    onChange={handleChange}
                  />
                  <ErrorMessages message={errors.capacity_unit} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <label htmlFor="price">Harga</label>
              <InputGroup className="mb-2">
                <InputGroupAddon type="prepend">
                  <InputGroupText>Rp</InputGroupText>
                </InputGroupAddon>
                <FormInput
                  type="text"
                  name="price"
                  required
                  // value={formData.price}
                  placeholder="Harga awal pembelian"
                  onChange={handleChange}
                />
              </InputGroup>
              <ErrorMessages message={errors.price} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="serial_number">Nomor Seri</label>
              <FormInput
                type="text"
                name="serial_number"
                required
                // value={formData.serial_number}
                placeholder="Nomor seri aset dari manufaktur"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.serial_number} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="manufacture_date">Tanggal pembuatan</label>
              <FormInput
                type="date"
                name="manufacture_date"
                required
                // value={formData.manufacture_date}
                placeholder="Tanggal pembuatan dari manufaktur"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.manufacture_date} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="installation_date">Tanggal pemasangan</label>
              <FormInput
                type="date"
                name="installation_date"
                required
                // value={formData.installation_date}
                placeholder="Tanggal pemasangan di kantor/gedung"
                onChange={handleChange}
              />
              <ErrorMessages message={errors.installation_date} />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="px-4 py-3 border-bottom">
        <FormGroup>
          <FormCheckbox
            toggle
            small
            checked={open}
            onChange={() => setOpen(!open)}
          >
            Data Tambahan
          </FormCheckbox>
        </FormGroup>
        <Collapse open={open}>
          {renderAdditionalForm()}
          <Button
            theme="none"
            className="p-0 text-success font-weight-bold"
            onClick={handleAddAdditionalForm}
          >
            Tambah data baru
          </Button>
        </Collapse>
      </CardBody>
      <CardFooter className="px-4 py-3 ">
        {children}
        <Button type="submit" theme="success">
          Daftarkan Aset
        </Button>
      </CardFooter>
    </Card>
  ) : null;
};

export default DetailForm;
