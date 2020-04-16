import React, { Fragment } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import styled, { keyframes } from "styled-components";
import { Button, Row } from "antd";

//Own components
import HealthCares from "../Shared/Assets/img/main.jpg";

const Title = styled.p`
  margin-bottom: 0;
  font-size: 3rem;
  font-weight: 800;
  margin: 10px 0;

  @media (max-width: 425px) {
    font-size: 1.3rem;
    margin: 0;
  }
`;

const upDown = keyframes`
  0% {
    margin-top: -1px;
    padding-bottom: 1px;
  }
  10% {
    margin-top: -2px;
    padding-bottom: 2px;
  }
  20% {
    margin-top: -3px;
    padding-bottom: 3px;
  }
  30% {
    margin-top: -4px;
    padding-bottom: 4px;
  }
  40% {
    margin-top: -5px;
    padding-bottom: 5px;
  }
  50% {
    margin-top: -6px;
    padding-bottom: 6px;
  }
  60% {
    margin-top: -5px;
    padding-bottom: 5px;
  }
  70% {
    margin-top: -4px;
    padding-bottom: 4px;
  }
  80% {
    margin-top: -3px;
    padding-bottom: 3px;
  }
  90% {
    margin-top: -2px;
    padding-bottom: 2px;
  }
  100% {
    margin-top: -1px;
    padding-bottom: 1px;
  }
`;

const HeaderImg = styled.img.attrs({
  src: HealthCares,
  alt: "Healthcares"
})`
  width: 400px;
  animation: ${upDown} 1.5s linear infinite;
  height: auto;
  @media (max-width: 425px) {
    width: 100%
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: justify;
  font-weight: 300;
  padding-bottom: 1rem;

  @media (max-width: 425px){
    padding-bottom: 0rem;
  }

  @media (min-width: 426px) {
    font-size: 1.3rem;
    text-align: center;
  }

  @media (min-width: 1024px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const ButtonBase = styled(Button)`
  width: 220px;
  border-radius: 0;
  font-weight: 800;
  border: none;
  &:hover,
  &:focus {
    border: none;
    color: initial;
  }
  &:first-child {
    margin-right: 1rem;
  }

  @media (max-width: 426px){
    width: 100%!important;
    &:first-child {
      margin: 0 0 0.5rem 0;
    }
  }
`;

const ButtonHelp = styled(ButtonBase)`
  background-color: #dc3545;
  color: white;

  &:hover,
  &:focus {
    border: 1px solid #dc3545;
    color: #dc3545;
  }
`;

const ButtonVolunteer = styled(ButtonBase)`
  background-color: #4440BF;
  color: white;

  &:hover,
  &:focus {
    border: 1px solid #4440BF;
    color: #4440BF;
  }
`;

const DivVerticalCenter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  justify-content: center;
  padding: 1.3rem 0;

  @media (max-width: 425px){
    overflow-y: scroll;
  }
  
  .inner-vertical-center{
    height:auto;
    position:absolute;
  }
`;
const Main = props => {

  return (
    <Fragment>
      <HeaderImg className="d-block mx-auto" />
      <Title className="text-center">
        ¡Todos somos&nbsp;
        <span className="text-dark">Super</span><span className="text-danger">HEROES</span>
        !
      </Title>
      <Subtitle>
        Apoyemos a la economía local durante este tiempo de retos. <br/>
        ¡Encuentra, ayuda y salva a un negocio local!
      </Subtitle>
      <div className="mx-auto text-center">
          <Link to="/#business">
            <ButtonHelp>
              AÑADIR MI NEGOCIO LOCAL
            </ButtonHelp>
          </Link>
          <Link to="/#customer">
            <ButtonVolunteer>
              QUIERO AYUDAR
            </ButtonVolunteer>
          </Link>
      </div>
    </Fragment>
  )
}

export default Main;