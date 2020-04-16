import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import styled from "styled-components";
// Own components
import Navbar from "./Navbar/";
import Logo from "../hashtag.png";

const { Header, Content, Footer } = Layout;

const HeaderStyled = styled(Header)`
  background: #fff;
  padding: 0 2em;
`;

const Phrase = styled.div`
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 1.4em;
  }
`;

const LinkStyled = styled(Link)`
  color: initial;
  &:hover,
  &:focus {
    color: initial;
  }
`;

const MainLayout = withRouter(({ history, ...props }) => {
  const { children } = props;
  return (
    <Layout className="layout">
      <HeaderStyled>
        <Row type="flex" justify="space-between">
          <Col>
            <Phrase>
              <LinkStyled to="/">
                <img src={Logo} alt="ConsumeLocal Logo"
                  style={{
                    bottom: "3px",
                    position: "relative",
                    width: "24px",
                    left: "4px",
                  }}/>  ConsumeLocal
              </LinkStyled>
            </Phrase>
          </Col>
          <Col>
            <Navbar />
          </Col>
        </Row>
      </HeaderStyled>
      <Content style={{ minHeight: "200px" }} className="bg-white">
        {children}
      </Content>
      <Footer style={{
        background: "#000",
        color: "#FFF"
      }}>
        <Row>
          <Col xs={24}>
            <span className="d-block text-center">
              Made with ❤︎
            </span>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
});

export default MainLayout;