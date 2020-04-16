import React, { Fragment } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
// Own components
import Main from "./Main";
import BusinessCostumer from "./BusinessCostumer";

const RowStyled = styled(Row)`
  height: calc(100vh - 64px);
  padding: 0 2em;
`;

const Landing = props => {
  return (
    <Fragment>
      <RowStyled type="flex" align="middle" justify="center">
        <Col xs={24}>
          <Main />
        </Col>
      </RowStyled>
      <Row type="flex" justify="center" align="middle" >
        <BusinessCostumer />
      </Row>
    </Fragment>
  )
}

export default Landing;