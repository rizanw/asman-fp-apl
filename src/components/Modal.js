import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Row, Form } from "shards-react";
import Scrollbars from "react-custom-scrollbars";

const ModalForm = ({
  handleSubmit,
  isOpen,
  title,
  children,
  toggle,
  ...props
}) => {
  return (
    <div>
      <Modal centered open={isOpen} toggle={toggle}>
        <ModalHeader>{title ? title : "Untitled"}</ModalHeader>
        <Scrollbars autoHeight autoHeightMax="70vh">
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              {children ? children : "Empty Modal"}
              {props.delete && (
                <p>
                  akan dihapus. Semua data didalam bagian ini akan dihapus juga.
                </p>
              )}
              <Row noGutters className="mt-3">
                <Button
                  outline
                  theme="success"
                  onClick={toggle}
                  className="mr-2"
                >
                  Batalkan
                </Button>
                {props.delete && <Button theme="danger">Hapus</Button>}
                {props.edit && <Button theme="warning">Edit</Button>}
                {props.create && <Button theme="success">Tambahkan</Button>}
              </Row>
            </Form>
          </ModalBody>
        </Scrollbars>
      </Modal>
    </div>
  );
};

export default ModalForm;
