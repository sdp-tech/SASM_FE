import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: white;
  color: #999999;
  // color: black;
  font-size: 1.3rem;

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
    color: black;
    transform: revert;
  }
`;

export default Pagination;
