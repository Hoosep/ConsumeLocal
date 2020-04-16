import React, { Fragment } from "react";
import { Col, Button } from "antd";
import styled from "styled-components";

// Own components
import Chef from "../Shared/Assets/img/chef.png";
import Customer from "../Shared/Assets/img/customer.png";

const ColWorkersStyled = styled(Col)`
  background-color: #dc3545;
`;

const ColVolunteersStyled = styled(Col)`
  height: 100vh;
  background-color: #4440BF;
`;

const DivVerticalCenter = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: #FFF;
  justify-content: center;
`;

const ButtonBase = styled(Button)`
  width: 220px;
  border-radius: 0;
  border: none;
  font-weight: 800;
  line-height: 32px!important;
  padding: 0!important;
  &:hover {
    border: none;
    color: initial;
  }

  @media (max-width: 426px){
    width: 90%!important;
  }
`;

const ButtonHelp = styled(ButtonBase)`
  color: #dc3545;
`;
const ButtonVolunteer = styled(ButtonBase)`
  color: #4440BF;
`;

const Title = styled.h1`
  color: #FFF;
  font-weight: bold;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  font-size: 1.8rem;
  text-align: center;

  @media (max-width: 426px){
    letter-spacing: 0rem;
    font-size: 1.5rem;
  }
`;

const Paragraph = styled.p`
  padding: 0 2rem;
  font-size: 1.1rem;
  text-align: center;

  @media (max-width: 425px){
    text-align: justify;
  }

  @media (min-width: 768px){
    padding: 0 4rem;
  }
`;

const WorkerImg = styled.img.attrs({
  src: Chef,
  alt: "Chef"
})`
  width: 400px;
  height: auto;
  @media (max-width: 425px) {
    width: 100%
  }
`
const CustomerImg = styled.img.attrs({
  src: Customer,
  alt: "Costumer"
})`
  width: 475px;
  height: auto;
  @media (max-width: 425px) {
    width: 100%
  }
`


const VolunteerHealthcare = props => {

  return (
    <Fragment>
      <ColWorkersStyled xs={24} lg={12} id="business">
        <DivVerticalCenter>
          <Title>PROPIETARIOS</Title>
          <WorkerImg />
          <Paragraph>
            Añade tu negocio y haz que te encuentren más fácil en tu ciudad.
          </Paragraph>
          <ButtonHelp href="/add-local-business">
            AÑADIR MI NEGOCIO LOCAL
          </ButtonHelp>
        </DivVerticalCenter>
      </ColWorkersStyled>
      <ColVolunteersStyled xs={24} lg={12} id="customer">
        <DivVerticalCenter>
          <Title>CLIENTES</Title>
          <CustomerImg />
          <Paragraph className="mb-0">
            Ordena comida, frutas y verduras, carnes, suministros médicos
            y cosas esenciales.
          </Paragraph>
          <Paragraph>
            Todo a domicilio o para recoger y llevar.
          </Paragraph>
          <ButtonVolunteer href="/cities">
            QUIERO AYUDAR YA
          </ButtonVolunteer>
        </DivVerticalCenter>
      </ColVolunteersStyled>
    </Fragment>
  );
}

export default VolunteerHealthcare;