import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      {total == 0 ? (
        ""
      ) : (
        <Nav>
          <StyledLink to='#' onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
          </StyledLink>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <StyledLink to='#'
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </StyledLink>
            ))}
          <StyledLink to='#'
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          >
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
  // color: black;
  font-size: 1.3rem;
  text-decoration: none;

  &:hover {
    border: none;
    background: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] { 불가능한 경우 가리기
    border: none;
    background: white;
    // color: #999999;
    color: white;
    cursor: revert;
    transform: revert;
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
