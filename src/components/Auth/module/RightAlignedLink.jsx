import React from "react";
import styled from "styled-components";
import oc from 'open-color'
import { Link } from "react-router-dom";

const Aligner = styled.div`
  margin-top: 1rem;
  margin-right: 2.5%;
  text-align: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${oc.gray[6]};
  &:hover {
    color: ${oc.gray[7]};
  }
`;

const RightAlignedLink = ({to, children}) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;