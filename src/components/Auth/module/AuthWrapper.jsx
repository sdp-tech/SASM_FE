import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from 'react-router-dom';

const Positioner = styled.div`
  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  grid-area: auth;
`;
  
const Contents = styled.div`
  position: relative;
  padding: 2rem;
  height: auto;
  display: flex;
  justify-content: center;
  // background: red;
  // border: 2px solid ${oc.teal[5]};
`;

const AuthWrapper = ({children}) => (
  <Positioner>
    <Contents>
      {children}
    </Contents>
  </Positioner>
);

export default AuthWrapper;