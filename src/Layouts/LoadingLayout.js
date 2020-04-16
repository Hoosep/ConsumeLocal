import React from "react";
import { Row } from "antd";
import styled, { keyframes } from "styled-components";

const fazer1 = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -80px;
    opacity: 0;
  }
`;
const fazer2 = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -100px;
    opacity: 0;
  }
`;
const fazer3 = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -50px;
    opacity: 0;
  }
`;
const fazer4 = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -150px;
    opacity: 0;
  }
`;
const speeder = keyframes`
  0% {
    //transform: translate(2px, 1px) rotate(0deg);
    margin-left: -51px;
  }
  10% {
    //transform: translate(-1px, -3px) rotate(-1deg);
    margin-left: -52px;
  }
  20% {
    //transform: translate(-2px, 0px) rotate(1deg);
    margin-left: -53px;
  }
  30% {
    //transform: translate(1px, 2px) rotate(0deg);
    margin-left: -54px;
  }
  40% {
    //transform: translate(1px, -1px) rotate(1deg);
    margin-left: -55px;
  }
  50% {
    //transform: translate(-1px, 3px) rotate(-1deg);
    margin-left: -56px;
  }
  60% {
    //transform: translate(-1px, 1px) rotate(0deg);
    margin-left: -57px;
  }
  70% {
    //transform: translate(3px, 1px) rotate(-1deg);
    margin-left: -58px;
  }
  80% {
    //transform: translate(-2px, -1px) rotate(1deg);
    margin-left: -59px;
  }
  90% {
    //transform: translate(2px, 1px) rotate(0deg);
    margin-left: -60px;
  }
  100% {
    //transform: translate(1px, -2px) rotate(-1deg);
    margin-left: -61px;
  }
`;
const lf = keyframes`
  0% {
    left: 200%;
  }
  100% {
    left: -200%;
    opacity: 0;
  }
`;
const lf2 = keyframes`
  0% {
    left: 200%;
  }
  100% {
    left: -200%;
    opacity: 0;
  }
`;
const lf3 = keyframes`
  0% {
    left: 200%;
  }
  100% {
    left: -100%;
    opacity: 0;
  }
`;
const lf4 = keyframes`
  0% {
    left: 200%;
  }
  100% {
    left: -100%;
    opacity: 0;
  }
`;

const RowStyled = styled(Row)`
  height: calc(100vh - 64px);
  overflow: hidden;
  background-color: #063651;

  .body {
    position: absolute;
    top: 50%;
    margin-left: -61px;
    left: 50%;
    animation: ${speeder} 2s linear infinite;
  }

  .body > span {
    height: 5px;
    width: 35px;
    background: #FFF;
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }

  .body > span > span:nth-child(1),
  .body > span > span:nth-child(2),
  .body > span > span:nth-child(3),
  .body > span > span:nth-child(4) {
    width: 30px;
    height: 1px;
    background: #FFF;
    position: absolute;
    animation: ${fazer1} .2s linear infinite;
  }

  .body > span > span:nth-child(2) {
    top: 3px;
    animation: ${fazer2} .4s linear infinite;
  }

  .body > span > span:nth-child(3) {
    top: 1px;
    animation: ${fazer3} .4s linear infinite;
    animation-delay: -1s;
  }

  .body > span > span:nth-child(4) {
    top: 4px;
    animation: ${fazer4} 1s linear infinite;
    animation-delay: -1s;
  }

  .base span {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 100px solid #FFF;
    border-bottom: 6px solid transparent;
  }

  .base span:before {
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    right: -110px;
    top: -16px;
  }
  .base span:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-right: 55px solid #FFF;
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
  }

  .face {
    position: absolute;
    height: 12px;
    width: 20px;
    background: #FFF;
    border-radius: 20px 20px 0 0;
    transform: rotate(-40deg);
    right: -125px;
    top: -15px;
  }
  .face:after {
    content: "";
    height: 12px;
    width: 12px;
    background: #FFF;
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
  }

  .longfazers {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .longfazers span {
    position: absolute;
    height: 2px;
    width: 20%;
    background: #FFF;
  }
  .longfazers span:nth-child(1) {
    top: 20%;
    animation: ${lf} .6s linear infinite;
    animation-delay: -5s;
  }
  .longfazers span:nth-child(2) {
    top: 40%;
    animation: ${lf2} .8s linear infinite;
    animation-delay: -1s;
  }
  .longfazers span:nth-child(3) {
    top: 60%;
    animation: ${lf3} .6s linear infinite;
  }
  .longfazers span:nth-child(4) {
    top: 80%;
    animation: ${lf4} .5s linear infinite;
    animation-delay: -3s;
  }
`;

const DotsText = keyframes`
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
`;

const Text = styled.h1`
  position: relative;
  width: 100%;
  text-align: center;
  color: #FFF;
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 50px;
  margin-bottom: 0;

  &:after {
    display: ${props => props.show ? "block" : "none" };
    position: absolute;
    content: "...";
    animation: ${DotsText} 1s linear infinite;
  }
`;

const Landing = props => {
  const { text, dots } = props;
  return (
    <RowStyled type="flex" justify="center" align="middle">
      <div className='body'>
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className='base'>
          <span></span>
          <div className='face'></div>
        </div>
      </div>
      <div className='longfazers'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Text show={dots}>{text}</Text>
    </RowStyled>
  )
}

export default Landing;