import React, { useEffect, useState } from "react";
import { List, Avatar, Button, Tooltip, Result } from "antd";
import { HashLink as Link } from 'react-router-hash-link';
import styled from "styled-components"

// Own components
import HomeDeliveryIcon from "../Shared/Icons/HomeDelivery";
import TakeAwayIcon from "../Shared/Icons/TakeAwayIcon";
import Hashtag  from "../hashtag.png";

const TitleLink = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
  color: #063651!important;
`
const ContainerFluid = styled.div`
  width: 90%;
  margin: 0 auto;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-flow: column;
`;

const Title = styled.p`
  margin-bottom: 0;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  margin: 10px 0;

  @media (max-width: 425px) {
    font-size: 1.3rem;
  }
`;

const ListStyled = styled(List)`
  .ant-list-pagination {
    text-align: center;
  }
  .ant-pagination-item-active {
    border-color: #063651;
  }
  .ant-list-item-action-split {
    background-color: transparent;
  }
  .ant-pagination-item a {
    color: #186fa2;
  }
  .ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
    color: #063651;
    border-color: #063651;
  }
  .ant-pagination-item-active a {
    font-weight: bold;
    color: #063651;
  }
  

  @media (max-width: 426px){
    .ant-list-item-action {
      display: flex;
    }
    .ant-list-item-action > li:last-child{
      flex: 1;
      position: relative;
    }
    .ant-list-item-action > li:last-child button {
      width: 100%;
      display: block;
    }
    .ant-list-pagination {
      margin: 1rem 0;
    }
  }
`;

const ButtonHelp = styled(Button)`
  font-weight: bold;
  color: #FFF;
  background-color: #186fa2;
  border: 1px solid #186fa2;
  &:hover,
  &:focus {
    border: 1px solid #186fa2;
    color: #186fa2;
  }
`;

const AvatarStyled = styled(Avatar)`
  display: ${props => props.img ? "block" : "flex" };
  justify-content: ${props => props.img ? "unset" : "center" };
  align-items: ${props => props.img ? "unset" : "center" };

  img {
    width: ${props => props.img ? "90px" : "32px"};
    height: ${props => props.img ? "90px" : "32px"}
  }
`;

const renderActions = (deliveryOptions, slug) => {
  let actions = deliveryOptions.map(item => {
    if (item === "Servicio a domicilio") {
      return (
        <Tooltip title="Servicio a domicilio">
          <HomeDeliveryIcon style={{ width: "20px"}} />
        </Tooltip>
      );
    }
    if (item === "Pide y pasa") {
      return (
        <Tooltip title="Pide y pasa">
          <TakeAwayIcon style={{ width: "20px"}} />
        </Tooltip>
      );
    }
  });
  if(actions.length === 1) {
    actions.push(
      <span className="anticon" style={{ width: "20px"}} />
    )
  }
  actions.push(
    <Link to={`/business/${slug}`}>
      <ButtonHelp size="large" style={{ letterSpacing: "2px"}}>APOYAME</ButtonHelp>
    </Link>);

  return actions;
}

const ListBusiness = props => {
  const { data, city } = props;
  const [listLayout, setListLayout] = useState("horizontal")
  const totalBusiness = data.length;

  useEffect(() => {
    let mobile = window.innerWidth < 426;
    if(mobile) setListLayout("vertical");
  }, []);

  return (
    <ContainerFluid>
      <Title>
        {totalBusiness} {totalBusiness > 1 ? "negocios locales" : "negocio local"} en {city}
      </Title>
      {
        data.length > 0 ? (
          <ListStyled
            pagination={{ pageSize: 5 }}
            itemLayout={listLayout}
            dataSource={data}
            renderItem={item => {
              const actions = renderActions(item.delivery_options, item.slug);
              return (
                <List.Item key={item.business_name}
                  actions={actions}>
                  <List.Item.Meta
                    avatar={
                      <AvatarStyled
                        shape="square"
                        size={90}
                        src={item.main_img ? item.main_img : Hashtag }
                        img={item.main_img} /> }
                    title={<TitleLink to={`/business/${item.slug}`}>{item.business_name}</TitleLink>}
                    description={
                      <p className="mb-0">
                        {item.street} {item.exterior_number} <br/>
                        {item.neighborhood}, {item.county}, {item.state}. <br/>
                        { item.subcategory ? (
                            `${item.category} » ${item.subcategory}`
                          ) : (
                            `${item.category}`
                          )
                        }
                      </p>
                    }
                  />
                </List.Item>
              )
            }}
          />
        ) : (
          <Result
            status="404"
            title="¡Oh, no!"
            subTitle="Esta ciudad no cuenta con ningún negocio local aún."
            extra={
              <Link to={`/add-local-business`}>
                <ButtonHelp className="w-75 mx-auto">CREAR NEGOCIO</ButtonHelp>
              </Link>
            }
          />
        )
      }
    </ContainerFluid>
  );
}

export default ListBusiness;