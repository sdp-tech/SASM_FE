import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${oc.gray[6]};
  &:hover {
    color: ${oc.gray[7]};
  }
`;

const LeftAlignedLink = ({ to, children }) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default LeftAlignedLink;
