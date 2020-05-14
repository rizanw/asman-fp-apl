import React from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "shards-react";
import { connect } from "react-redux";
import { setBreadcrumbsHistory } from "../redux/breadcrumbs/actions";

export class Breadcrumbs extends React.Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(setBreadcrumbsHistory(match.params));
  }

  render() {
    console.log(this.props.locations);

    return (
      <Row>
        <Col className="p-0">
          <Breadcrumb>
            {this.props.locations.map((item, key) => (
              <BreadcrumbItem key={`${key}-${item.name}`}>
                <a href={item.path}>{item.name}</a>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.breadcrumbs.locations
});

export default connect(mapStateToProps)(Breadcrumbs);
