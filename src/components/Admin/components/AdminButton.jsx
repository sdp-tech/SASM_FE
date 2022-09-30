import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
//   margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;

  border: 2px solid transparent;
  border-image: linear-gradient(
    to right,
    rgba(180, 227, 182, 1),
    rgba(180, 199, 244, 1)
  );
  border-image-slice: 1;
  color: black;

  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  translation: 0.2s all;

  &:hover {
    background: rgba(180, 227, 182, 1);
  }
  &:active {
    background: rgba(180, 199, 244, 1);
  }
`;

const AdminButton = ({ children, style, onClick }) => (
    <Wrapper style={style} onClick={onClick}>
        {children}
    </Wrapper>
);

export default AdminButton;