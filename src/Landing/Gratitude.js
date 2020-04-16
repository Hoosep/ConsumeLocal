import React from 'react';
import { Row, Col } from 'antd';
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
import styled from "styled-components";

const RowStyled = styled(Row)`
  width: 100%;
`;


const URL_SHARE = "http://consume-local-29145.firebaseapp.com/";

const Faqs = props => {
  return (
    <RowStyled type="flex" align="middle" justify="center">
      <Col xs={24} lg={12} style={{ minHeight: "100vh" }}>
        <h1 className="text-center font-weight-bold my-3">Agradecimientos</h1>
        <p className="text-center">Agradecemos a las siguientes organizaciones, empresas y personas que han apoyado esta causa.</p>
        <h1 className="text-center font-weight-bold mt-5 mb-3">¡Ayuda compartiendo!</h1>
        <p className="text-center">
          <FacebookShareButton
            url={URL_SHARE}
            quote="¡Apoyemos los negocios locales!"
            hashtag="#ConsumeLocal">
            <FacebookIcon size={45} />
          </FacebookShareButton>
          <TwitterShareButton
            url={URL_SHARE}
            title="¡Apoyemos los negocios locales! Conoce los negocios locales de tu ciudad :)"
            hashtags={["ConsumeLocal", "YoConsumoLocal"]}
            >
            <TwitterIcon size={45} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={URL_SHARE}
            title="¡Apoyemos los negocios locales!">
            <WhatsappIcon size={45} />
          </WhatsappShareButton>
          <EmailShareButton
            url={URL_SHARE}
            subject="¡Apoyemos los negocios locales!"
            body="¡Apoyemos los negocios locales!">
            <EmailIcon size={45} />
          </EmailShareButton>
        </p>
      </Col>
    </RowStyled>
  )
}

export default Faqs;