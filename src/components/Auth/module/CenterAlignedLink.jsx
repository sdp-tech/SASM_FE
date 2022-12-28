import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${oc.gray[6]};
  &:hover {
    color: ${oc.gray[7]};
  }
`;

export default function CenterAlignedLink({to, children, style}) {
  return (
    <Aligner>
      <StyledLink style={style} to={to}>{children}</StyledLink>
    </Aligner>
  )
}
