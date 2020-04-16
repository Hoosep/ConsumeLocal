import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Drawer } from "antd";
import styled from "styled-components";
import { MenuOutlined } from '@ant-design/icons';


const MenuStyled = styled(Menu)`
  border-bottom:none;
  background: #186fa2;
  .ant-menu-item {
    border-bottom: none;
  }
  &.ant-menu-vertical {
    border-right: none;
  }
  &.ant-menu-vertical > .ant-menu-item:first-child {
    margin-top: 2rem;
  }
  .ant-menu-item-selected {
    background-color:transparent!important;
  }
  &.ant-menu-vertical > .ant-menu-item {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 1.4rem
  }
`;

const MenuItemStyled = styled(Menu.Item)`
  border-bottom: none;
  color: white!important;

  a {
    display: unset!important;
    letter-spacing: 1px;
    font-size: 1.1em;
    color: white!important;
    font-weight: bold;
  }

  a:hover{
    margin-bottom: 4px;
    border-bottom: 3px solid black;
  }
  &:active{
    background: unset;
  }
  &:hover{
    border-bottom:none!important;
  }
`;


const MenuOutlinedStyled = styled(MenuOutlined)`
  font-weight: 800;
  font-size: 1.2rem;
  color: #186fa2!important;
`


const DrawerStyled = styled(Drawer)`
  & .ant-drawer-content {
    background-color: #186fa2;

  }
  .ant-drawer-close {
    color: white;
  }
`;

const Navbar = props => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <Fragment>
      <MenuOutlinedStyled 
        onClick={toggleDrawer} />
      <DrawerStyled
        placement="left"
        onClose={toggleDrawer}
        visible={showDrawer}
        width="100%">
        <MenuStyled theme="light" mode="vertical">
          <MenuItemStyled key="1" onClick={toggleDrawer}>
            <Link to="/add-local-business">AÑADIR NEGOCIO</Link>
          </MenuItemStyled>
          <MenuItemStyled key="2" onClick={toggleDrawer}>
            <Link to="/cities">QUIERO AYUDAR</Link>
          </MenuItemStyled>
          <MenuItemStyled key="3" onClick={toggleDrawer}>
            <Link to="/faqs">PREGUNTAS FRECUENTES</Link>
          </MenuItemStyled>
          <MenuItemStyled key="4" onClick={toggleDrawer}>
            <Link to="/thank-you">AGRADECIMIENTOS</Link>
          </MenuItemStyled>
        </MenuStyled>
      </DrawerStyled>
    </Fragment>
  );
}

export default Navbar;