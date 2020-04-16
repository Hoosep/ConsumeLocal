import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, List, Button } from "antd";
import styled from "styled-components";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";

// Own components
import MapBusiness from "../Map/MapBusiness";
import { ButtonFB, ButtonWA, ButtonPhone,
         ButtonUberEats, ButtonRappi } from "../Shared/Buttons/ButtonsSocialNetwork";
import LoadingLayout from "../Layouts/LoadingLayout";

// Own services
import { BusinessAPI } from "../Services/Business";

const ContainerBusinessImg = styled(Row)`
  height: 300px;
  ${props => props.image ? `background: url(${props.image}) no-repeat center` : "background: black" };}
  background-size: cover;

  @media (max-width: 425px){
    height: 200px;
  }
`;

// const DivVerticalCenter = styled.div`
//   height: 100vh;
//   display: flex;
//   flex-flow: column;
//   align-items: center;
//   color: #000;
//   justify-content: center;
// `;

const DivVerticalCenter = styled.div`
  min-height: 100vh;
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
    position:relative;
  }
`;

const DivVerticalCenterMap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Title = styled.h1`
  width: 80%;
  margin: 0 auto;
  color: #000;
  font-weight: bold;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 426px){
    width: 70%;
    letter-spacing: 0rem;
    font-size: 1.5rem;
  }
`;

const BusinessName = styled.h1`
  font-size: 2.2rem;
`;


const GiftCardButton = styled(Button)`
  font-weight: bold;
  color: #FFF;
  background-color: #186fa2;
  border: 1px solid #186fa2;
  padding: 10px 25px!important;
  height: 41px;
  line-height: unset!important;
  &:hover,
  &:focus {
    border: 1px solid #186fa2;
    color: #186fa2;
  }

  @media (max-width: 600px){
    width: 90%!important;
    margin: 0 0 0.5rem 0!important;
  }
`
const BusinessInfo = props => {
  const { match } = props;
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { slug } = match.params;
      let response = await BusinessAPI.getBusiness(slug);
      setDataSource(response);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      {
        dataSource ? (
          <Fragment>
            <ContainerBusinessImg type="flex" align="middle" justify="center" image={dataSource.main_img}>
                <Col className="w-75">
                  <BusinessName className="font-weight-bold text-white my-0">
                    {dataSource.business_name}
                  </BusinessName>
                  <p className="mb-0 text-white">
                    {`${dataSource.street} ${dataSource.exterior_number},
                      ${dataSource.neighborhood}, ${dataSource.zipcode},
                      ${dataSource.county}, ${dataSource.state}.`}
                  </p>
                </Col>
            </ContainerBusinessImg>
            <Row type="flex">
              <Col xs={24} lg={12} >
                <DivVerticalCenter>
                  <Row className="w-100 text-center inner-vertical-center">
                    <Col xs={24}>
                      <Title>
                        ¡Gracias por ayudar a&nbsp;
                        <span style={{
                          color: "#186fa2",
                          whiteSpace: "nowrap"
                        }} >{dataSource.business_name}</span>
                        &nbsp;a superar esto!
                      </Title>
                    </Col>
                    <Col xs={24}>
                      <p className="text-dark mb-1 mx-auto" style={{ width: "90%"}}>
                        Para ayudar a <strong>{dataSource.business_name}</strong> puedes contactarlos a través de
                      </p>
                    </Col>
                    <Col xs={24} className="mb-3">
                      {
                        dataSource.telephone ? (
                          <ButtonPhone
                            className="mr-2"
                            href={`tel:${dataSource.telephone}`}
                            target="_blank">Llamada</ButtonPhone>
                        ) : null
                      }
                      {
                        dataSource.facebook ? (
                          <ButtonFB
                            href={dataSource.facebook}
                            className="mr-2"
                            target="_blank">Facebook</ButtonFB>
                        ) : null
                      }
                      {
                        dataSource.whatsapp ? (
                          <ButtonWA
                            className="mr-2"
                            target="_blank"
                            href={`https://wa.me/521${dataSource.whatsapp}`}>Whatsapp</ButtonWA>
                        ) : null
                      }
                    </Col>
                    <Col xs={24}>
                      <p className="text-dark mb-1">
                        Opciones de entrega
                      </p>
                      <List
                        itemLayout="vertical"
                        size="small"
                        className="mb-4"
                        dataSource={dataSource.delivery_options}
                        renderItem={item => (
                          <List.Item className="py-0" style={{ borderBottom: "unset" }}>
                            <List.Item.Meta
                              className="mb-0"
                              description={item}
                            />
                          </List.Item>
                        )}
                      />
                      <p>
                        {
                          dataSource.uber_eats ? (
                            <ButtonUberEats href={dataSource.uber_eats} target="_blank" className="mr-2">
                              <span className="uber-word">Uber</span>&nbsp;
                              <span className="eats-word">Eats</span>
                          </ButtonUberEats>
                          ) : null
                        }
                        {
                          dataSource.rappi ? (
                            <ButtonRappi href={dataSource.rappi} target="_blank"   className="mr-2">Rappi</ButtonRappi>
                          ) : null
                        }
                      </p>
                    </Col>
                    {
                      dataSource.gift_card ? (
                        <Col xs={24}>
                          <GiftCardButton
                            href={dataSource.gift_card}
                            target="_blank"
                            >
                            COMPRAR CERTIFICADO DE REGALO
                          </GiftCardButton>
                        </Col>
                      ) : null
                    }

                    <Col xs={24}>
                      <p className="mt-3 mb-2">Comparte este negocio</p>
                      <FacebookShareButton
                        url={window.location.href}
                        quote={`Ayuda a ${dataSource.business_name}. ¡Apoyemos los negocios locales!`}
                        hashtag="#ConsumeLocal">
                        <FacebookIcon size={45} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        title={`Ayuda a ${dataSource.business_name}. ¡Apoyemos los negocios locales!`}
                        hashtags={["ConsumeLocal", "YoConsumoLocal"]}
                        >
                        <TwitterIcon size={45} />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={window.location.href}
                        title={`Ayuda a ${dataSource.business_name}. ¡Apoyemos los negocios locales!`}>
                        <WhatsappIcon size={45} />
                      </WhatsappShareButton>
                      <EmailShareButton
                        url={window.location.href}
                        subject="¡Apoyemos los negocios locales!"
                        body={`Ayuda a ${dataSource.business_name}. ¡Apoyemos los negocios locales!`}>
                        <EmailIcon size={45} />
                      </EmailShareButton>
                    </Col>
                  </Row>
                </DivVerticalCenter>
              </Col>
              <Col xs={24} lg={12}>
                <DivVerticalCenterMap>
                  <MapBusiness
                    coordenates={[dataSource.coordenates.lat, dataSource.coordenates.lng]} />
                </DivVerticalCenterMap>
              </Col>
            </Row>
          </Fragment>
        ) : <LoadingLayout text="¡Vamos a apoyar!" dots={false}/>
      }
    </Fragment>
  );
}

export default BusinessInfo;