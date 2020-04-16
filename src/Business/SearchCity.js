import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button } from "antd";
import styled from "styled-components";

// Own components
import SelectStates from "../Shared/Selects/SelectStates";
import SelectCounties from "../Shared/Selects/SelectCounties";

const DivVerticalCenter = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-flow: column;
  align-items: center;
  color: #FFF;
  justify-content: center;
`;

const Title = styled.h1`
  color: #000;
  font-weight: bold;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: center;

  @media (max-width: 426px){
    letter-spacing: 0rem;
  }
`;


const SearchCity = props => {
  const { match } = props;
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
  }, []);

  const handleChangeState = value => {
    setState(value);
  }

  const handleChangeCounties = value => {
    setDisabledButton(false);
    setCity(value);
  }

  return (
    <Fragment>
      <Row type="flex" justify="center" align="middle">
        <Col xs={24} lg={8}>
          <DivVerticalCenter>
            <Row className="w-75 mx-auto text-center" guttter={[20, 40]}>
              <h1
                className="text-center w-75 d-block position-absolute"
                style={{ fontSize: "2rem", marginTop: "-100px"} }>Busca tu ciudad</h1>
            </Row>
            <Row className="w-75 mx-auto text-center" gutter={[20, 40]}>
              <Title className="mb-0">Selecciona un estado</Title>
              <SelectStates className="w-100" onChange={handleChangeState} />
            </Row>
            {
              state ? (
                <Fragment>
                  <Row className="w-75 mx-auto text-center" gutter={[20, 40]}>
                    <Title className="mb-0 mt-4">Selecciona una ciudad</Title>
                    <SelectCounties
                      state={state}
                      className="w-100"
                      onChange={handleChangeCounties}/>
                  </Row>
                  <Row className="w-75 mx-auto text-center">
                    <Button
                      block
                      type="primary"
                      size="large"
                      disabled={disabledButton}
                      href={`/cities/${city}`}
                      >BUSCAR</Button>
                  </Row>
                  
                </Fragment>
              ) : null
            }
          </DivVerticalCenter>
        </Col>
      </Row>
  
    </Fragment>
  );
}

export default SearchCity;