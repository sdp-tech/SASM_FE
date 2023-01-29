import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: pink;
  // display: flex;
  // position: relative;
  // flex-direction: column;
  // justify-content: center;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${oc.gray[8]};
  margin-bottom: 4rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
  text-align: center;
`;

const AuthContent = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
  </Wrapper>
);

export default AuthContent;
