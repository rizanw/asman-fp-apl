import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

import ServisReadyContainer from "./servisReady.container";
import ServisReleaseContainer from "./servisRelease.container";
import ServisProcessedContainer from "./servisProcessed.container";
import ServisFinishedContainer from "./servisFinished.container";
import ServisBacklogContainer from "./servisBacklog.container";
import ServisUnplannedContainer from "./servisUnplanned.container";
import ServisCompletedContainer from "./servisCompleted.container";

export default class Index extends React.Component {
  render() {
    return (
      <Container className="m-4">
        <Row className="page-header pb-4">
          <PageTitle
            sm="4"
            title="Status Servis"
            subtitle="Servis"
            className="text-sm-left"
          />
        </Row>
        <ServisUnplannedContainer />
        <ServisReadyContainer />
        <ServisReleaseContainer />
        <ServisProcessedContainer />
        <ServisCompletedContainer />
        <ServisFinishedContainer />
        <ServisBacklogContainer />
      </Container>
    );
  }
}
