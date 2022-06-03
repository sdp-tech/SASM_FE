import React from "react";
import styled from "styled-components";
import oc from 'open-color';

const Wrapper = styled.div`
  width: 60%;

  transform: translate(30%, 20%);

  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  border: 4px solid transparent;
  border-image: linear-gradient(to right, rgba(180, 227, 182, 1), rgba(180, 199, 244, 1));
  border-image-slice: 1;
  color: black;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  translation: .2s all;

  &:hover {
    background: rgba(180, 227, 182, 1);
  }
  &:active {
    background: rgba(180, 199, 244, 1);
  }
`;

const AuthButton = ({children, onClick}) => (
  <Wrapper onClick={onClick}>
    {children}
  </Wrapper>
);

export default AuthButton;