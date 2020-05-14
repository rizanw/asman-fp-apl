import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

import IndukContainer from "./induk.container";
import SubIndukContainer from "./subinduk.container";
import EquipmentContainer from "./equipment.container";
import KategoriContainer from "./kategori.container";

export default class Index extends React.Component {
  render() {
    return (
      <Container className="m-4">
        <Row className="page-header pb-4">
          <PageTitle
            sm="4"
            title="Bank Niaga"
            subtitle="Struktur Aset"
            className="text-sm-left"
          />
        </Row>
        <IndukContainer />
        <SubIndukContainer />
        <EquipmentContainer />
        <KategoriContainer />
      </Container>
    );
  }
}
