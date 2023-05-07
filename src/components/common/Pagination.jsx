import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import qs from 'qs';

function Pagination({ total, limit }) {
  const numPages = Math.ceil(total / limit);
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const previousPage = (parseInt(queryString.page) -1);
  const nextPage = (parseInt(queryString.page) +1);

  return (
    <>
      {total == 0 ? (
        ""
      ) : (
        <Nav>
          <StyledLink to={`?page=${previousPage}`} style={previousPage === 0? {display: 'none'} : {display:'inline'}}>
            &lt;
          </StyledLink>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <StyledLink to={`?page=${i+1}`}
              aria-current={parseInt(queryString.page) === i + 1 ? "page" : null}
              >
                {i + 1}
              </StyledLink>
            ))}
          <StyledLink to={`?page=${nextPage}`} style={nextPage === numPages+1? {display: 'none'} : {display:'inline'}}>
            &gt;
          </StyledLink>
        </Nav>
      )}
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;
 const StyledLink = styled(Link)`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: white;
  color: #808080;
  font-size: 1.3rem;
  text-decoration: none;

  &:hover {
    border: none;
    background: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[aria-current] {
    border: none;
    background: white;
    font-weight: bold;
    cursor: revert;
    color: #209DF5;
    transform: revert;
  }
`;

export default Pagination;
