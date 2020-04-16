import React from 'react';
import { Collapse, Row, Col, } from 'antd';
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Panel } = Collapse;

const CollapseStyled = styled(Collapse)`
  background-color: #FFF;
  .ant-collapse-header {
    font-size: 1rem;
  }
  .ant-collapse-content-box{
    text-align: justify
  }

  @media (min-width: 768px){
    width: 50%;
    margin: 0 auto;
  }
`;

const RowStyled = styled(Row)`
  width: 100%;
`;

const Faqs = props => {
  return (
    <RowStyled type="flex" align="middle" justify="center">
      <Col xs={24} style={{ minHeight: "100vh" }}>
        <h1 className="text-center font-weight-bold my-3">Preguntas Frecuentes</h1>
        <CollapseStyled bordered={false} defaultActiveKey={['1']}>
          <Panel header="¿Qué es #ConsumeLocal?" key="1">
            <p className="mb-0">Es un directorio de negocios locales esenciales que brindan servicio a domicilio y/o pide y pasa en diversas ciudades de México e incluso, comprar certificados de regalo.</p>
          </Panel>
          <Panel header="He visto que recomiendo Boletico, ¿Qué es Boletico?" key="2">
            <p className="mb-0">
              Es una plataforma web donde se gestiona, difunden y venden boletos. 
              Sin embargo, durante la contigencia por el coronavirus se sumaron 
              creando cupones de regalo para poder usarlos a futuro.
            </p>
            <p className="mb-0">
              Puedes tener más información en su sitio de <a href="https://boleti.co/frequently_asked_questions" target="_blank">preguntas frecuentes</a> y a través
              de su <a href="https://boleti.co/covid-19?fbclid=IwAR2vooH3MMGIJy_3iLMeyv8aXgjutyxKQw6ixuZYLwwr5_gpYDY0SyViTAo" target="_blank">iniciativa para la contigencia por el coronavirus.</a>
            </p>
          </Panel>
          <Panel header="¿Puedo utilizar algo más que Boletico?" key="3">
            <p className="mb-0">
              ¡Claro que si! Puedes añadir cualquier plataforma. Por ejemplo, el sitio web de tu negocio, <a href="https://www.paypal.me/" target="_blank">PayPal.Me</a>, entre otros.
            </p>
          </Panel>
          <Panel header="¿Cuánto cuesta usar #ConsumeLocal?" key="4">
            <p className="mb-0">Aparecer en #ConsumeLocal no tiene ningún costo.</p>
          </Panel>
          <Panel header="¿Quiénes pueden añadir un negocio local?" key="5">
            Cualquier propietario del local puede añadir un negocio al directorio haciendo <Link to="/add-local-business">clic aquí</Link>.
          </Panel>
          <Panel header="¿Cómo aparecería mi negocio local?" key="6">
            Puedes ver un ejemplo de como aparecería tu negocio local dando <Link to="/business/negocio-cero" target="_blank">clic aquí</Link>.
          </Panel>
          <Panel header="Tengo una duda y/o sugerencia" key="7">
            Mandame un correo electrónico a hoose.muu@gmail.com o contactame a través de <a href="https://twitter.com/Hoose_" target="_blank">Twitter</a>.
          </Panel>
          {/* <Panel header="Mi negocio aparecía pero ya no, ¿Por qué?" key="4">
            <p>
              Tu negocio se publicó desde el primer momento en que lo añadiste porque
              queremos que aparezcas lo más pronto posible.
            </p>
            <p>
              Sin embargo, cuando lo publicaste debió de haberte llegado un correo para verificar
              la información. Si pasaron más de 24 horas y no lo verificaste, se elimina.
            </p>
          </Panel> */}
        </CollapseStyled>
      </Col>
    </RowStyled>
  )
}

export default Faqs;