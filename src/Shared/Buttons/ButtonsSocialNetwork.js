import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const ButtonBase = styled(Button)`
  width: 220px;
  border-radius: 0;
  font-weight: 800;
  margin-bottom: 0.5rem;
  border: none;
  &:hover,
  &:focus {
    border: none;
    color: initial;
  }

  @media (max-width: 600px){
    width: 90%!important;
    margin: 0 0 0.5rem 0!important;
  }
`;

export const ButtonFB = styled(ButtonBase)`
  background-color: #3B5998;
  color: white;
  border: 1px solid #2f477a;
  &:hover,
  &:focus {
    border: 1px solid #2f477a;
    color: #2f477a;
  }
`;


export const ButtonWA = styled(ButtonBase)`
  background-color: #128c7e;
  color: white;
  border: 1px solid #128c7e;
  &:hover,
  &:focus {
    border: 1px solid #128c7e;
    color: #128c7e;
  }
`;

export const ButtonPhone = styled(ButtonBase)`
  background-color: #0088cc;
  color: white;
  border: 1px solid #0088cc;
  &:hover,
  &:focus {
    border: 1px solid #0088cc;
    color: #0088cc;
  }
`;

export const ButtonUberEats = styled(ButtonBase)`
  background-color: #000;
  border: 1px solid #000;
  .uber-word {
    color: #fff;
  }
  .eats-word {
    color: #5FB709;
  }
  &:hover .uber-word,
  &:focus .uber-word {
    color: #000!important;
  }

  &:hover,
  &:focus {
    border: 1px solid #000;
  }
`

export const ButtonRappi = styled(ButtonBase)`
  background-color: #ff7864;
  color: #fff;
  border: 1px solid #ff7864;

  &:hover,
  &:focus{
    border: 1px solid #ff7864;
    color: #ff7864;
  }
`;

