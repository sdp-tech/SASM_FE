import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import qs from "qs";

function Pagination({ total, limit, page, setPage }) {
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

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <>
      {total === 0 ? (
        ""
      ) : (
        <Nav>
          <StyledLink
            onClick={()=>{setPage(1)}}
            style={previousPage === 0 ? { display: "none" } : { display: "inline" }}
          >
            &lt;&lt;
          </StyledLink>
          <StyledLink
            onClick={()=>{setPage(page-1)}}
            style={previousPage === 0 ? { display: "none" } : { display: "inline" }}
          >
            &lt;
          </StyledLink>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = i + startPage;
            return (
              <StyledLink
                key={page}
                onClick={(e)=>{ setPage(parseInt(e.target.textContent))}}
                aria-current={currentPage === page ? "page" : null}
              >
                {page}
              </StyledLink>
            );
          })}
          <StyledLink
            onClick={() => {setPage(page+1)}}
            style={nextPage === numPages + 1 ? { display: "none" } : { display: "inline" }}
          >
            &gt;
          </StyledLink>
          <StyledLink
            onClick={() => {setPage(numPages)}}
            style={nextPage === numPages + 1 ? { display: "none" } : { display: "inline" }}
          >
            &gt;&gt;
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
const StyledLink = styled.div`
  border: none;
  border-radius: 8px;
  padding: 4px;
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