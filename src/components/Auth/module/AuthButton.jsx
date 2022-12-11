import React from "react";
import styled from "styled-components";
import oc from 'open-color';

const Wrapper = styled.div`
  margin: 3rem auto;
  padding: 1rem 0;
  border: 2px solid #44ADE7;
  border-radius:10px;

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

const AuthButton = ({children, style, onClick}) => (
  <Wrapper style={style} onClick={onClick}>
    {children}
  </Wrapper>
);

export default AuthButton;