import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import qs from "qs";

function Pagination({ total, limit }) {
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const currentPage = parseInt(queryString.page) || 1;
  const numPages = Math.ceil(total / limit);
  const pagesToShow = 10; // 페이지 최대 개수

  // 현재 페이지에서 시작과 끝 페이지 계산
  let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  let endPage = Math.min(startPage + pagesToShow - 1, numPages);

  if (endPage - startPage + 1 < pagesToShow) {
    // 마지막 부분에 다가갈 때, 첫 페이지 조정
    startPage = Math.max(endPage - pagesToShow + 1, 1);
  }

  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < numPages ? currentPage + 1 : numPages;

  return (
    <>
      {total === 0 ? (
        ""
      ) : (
        <Nav>
          <StyledLink
            to={`?page=${previousPage}`}
            style={previousPage === 1 ? { display: "none" } : { display: "inline" }}
          >
            &lt;
          </StyledLink>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = i + startPage;
            return (
              <StyledLink
                key={page}
                to={`?page=${page}`}
                aria-current={currentPage === page ? "page" : null}
              >
                {page}
              </StyledLink>
            );
          })}
          <StyledLink
            to={`?page=${nextPage}`}
            style={nextPage === numPages ? { display: "none" } : { display: "inline" }}
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
  font-family: pretendard;
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