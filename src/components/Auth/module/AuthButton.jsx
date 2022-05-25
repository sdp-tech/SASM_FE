import React from "react";
import styled from "styled-components";
import oc from 'open-color';

const Wrapper = styled.div`
  width: 60%;

  position: absolute;
  bottom : -15%;
  left: 50%;
  transform: translate(-50%, 10%);

  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  border: 3px solid  ${oc.teal[6]};
  color: black;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  translation: .2s all;

  &:hover {
    background: ${oc.teal[5]};
  }
  &:active {
    background: ${oc.teal[7]};
  }
`;

const AuthButton = ({children, onClick}) => (
  <Wrapper onClick={onClick}>
    {children}
  </Wrapper>
);

export default AuthButton;