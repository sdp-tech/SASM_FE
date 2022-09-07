import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryList from "./components/StoryList";
import SearchBar from "../common/SearchBar";
import nothingIcon from "../../assets/img/nothing.svg";
import Pagination from "../common/Pagination";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../common/Loading";

const StoryListPage = () => {
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    handleSearchToggle();
  }, [page]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearchToggle(true);
    console.log(search);
    setLoading(true);
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }
    let searched;
    if (search === null || search === "") {
      //검색어 없을 경우 전체 리스트 반환
      searched = null;
    } else {
      //검색어 있는 경우
      searched = search;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/stories/story_search/",
        {
          params: {
            page: newPage,
            search: searched,
          },

          headers: {
            Authorization: headerValue,
          },
        }
      );

      console.log("response??", response);
      setItem(response.data.results);
      setPageCount(response.data.count);
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Section>
            <SearchBarSection>
              <SearchFilterBar>
                <SearchBar
                  search={search}
                  onChangeSearch={onChangeSearch}
                  handleSearchToggle={handleSearchToggle}
                  placeholder="어떤 장소의 이야기가 궁금하신가요?"
                />
              </SearchFilterBar>
            </SearchBarSection>
            <StoryListSection>
              <StoryList info={item} />
            </StoryListSection>
          </Section>
          <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </FooterSection>
        </>
      )}
    </>
  );
};
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: story;
  display: flex;
  flex-direction: column;
  // border: 1px solid red;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 8%;
  width: 100%;
  display: flex;
  margin-top: 0.1%;
  flex-direction: column;
  grid-area: story;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
`;
const StoryListSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 90%;
  width: 100%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  grid-area: story;
  scrollbar-height: thin;
`;
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  // grid-area: story;
  height: 12%;
`;
const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  height: 70%;
  border: 3px solid #99a0b0;
`;
export default StoryListPage;
