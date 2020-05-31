import React from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import ForRentContainer from "./ForRent.container";
import RentInContainer from "./RentIn.container";
import MyRentalContainer from "./MyRental.container";
import RentOutContainer from "./RentOut.container";

// View Rental ini belum sepenuhnya selesai.. 
// TO-DO: 
// - create & update

export default class Index extends React.Component {
    render() {
        return (
            <Container className="m-4">
                <Row className="page-header pb-4">
                    <PageTitle
                        sm="4"
                        title="Rental Asset"
                        subtitle="Rental"
                        className="text-sm-left"
                    />
                </Row>
                <ForRentContainer/>
                <RentInContainer/>
                <RentOutContainer/>
                <MyRentalContainer/>
            </Container>
        );
    }
}