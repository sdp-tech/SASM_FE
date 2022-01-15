import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from 'react-router-dom';

const Positioner = styled.div`
  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
  width: 500px;
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
`;

const LogoWrapper = styled.div`
  background: ${oc.teal[7]};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${oc.teal[5]};
  border-bottom: none;
`;

const Logo = styled(Link)`
  color: white;
  font-family: 'Rajdhani';
  font-size: 2.8rem;
  letter-spacing: 5px;
  text-decoration: none;
`;

const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
  border: 2px solid ${oc.teal[5]};
`;

const AuthWrapper = ({children}) => (
  <Positioner>
    <LogoWrapper>
      <Logo to="/">SASM</Logo>      
    </LogoWrapper>
    <Contents>
      {children}
    </Contents>
  </Positioner>
);

export default AuthWrapper;