import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryList from "./components/StoryList";
import SearchBar from "../common/SearchBar";
import nothingIcon from "../../assets/img/nothing.svg";
import Pagination from "../common/Pagination";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";
import Request from "../../functions/common/Request";

const StoryListPage = () => {
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const CATEGORY_LIST = [
    { id: 0, data: "식당 및 카페" },
    { id: 1, data: "전시 및 체험공간" },
    { id: 2, data: "제로웨이스트 샵" },
    { id: 3, data: "도시 재생 및 친환경 건축물" },
    { id: 4, data: "복합 문화 공간" },
    { id: 5, data: "녹색 공간" },
  ];

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle);
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    handleSearchToggle();
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, [page]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearchToggle(true);
    console.log(search, checkedList);
    setLoading(true);
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }
    let headerValue;
    if (token === null || undefined) {
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

    const response = await request.get("/stories/story_search/", {
      page: newPage,
      search: searched,
      filter: checkedList,
    }, null);
    // console.log("response??", response);
    setItem(response.data.data.results);
    setPageCount(response.data.data.count);
    setLoading(false);
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
                  handleFilterToggle={handleFilterToggle}
                  placeholder="어떤 장소의 이야기가 궁금하신가요?"
                />
              </SearchFilterBar>
              <div style={{ marginTop: "-2%" }}>
                {filterToggle ? (
                  <FilterOptions>
                    <CategoryTitle>카테고리</CategoryTitle>
                    <CategoryCheckBox>
                      {CATEGORY_LIST.map((item) => {
                        return (
                          <CategoryLabel key={item.id}>
                            <input
                              type="checkbox"
                              // 이때 value값으로 data를 지정해준다.
                              value={item.data}
                              // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                              onChange={(e) => {
                                onCheckedElement(
                                  e.target.checked,
                                  e.target.value
                                );
                              }}
                              // 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                              checked={
                                checkedList.includes(item.data) ? true : false
                              }
                            />
                            <div>{item.data}</div>
                          </CategoryLabel>
                        );
                      })}
                    </CategoryCheckBox>
                  </FilterOptions>
                ) : null}
              </div>
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
            {isSasmAdmin ? (
              <AdminButton
                onClick={() => {
                  navigate("/admin/story");
                }}
              >
                스토리 생성
              </AdminButton>
            ) : (
              <></>
            )}
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
  flex-direction: row;
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
  flex-direction: row;
  // overflow: hidden;
  // grid-area: story;
  height: 12%;
  justify-content: center;
  align-items: center;
`;
const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  height: 70%;
  border: 3px solid #99a0b0;
`;
const FilterOptions = styled.div`
  width: 20%;
  min-height: 30%;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  background: white;
  z-index: 4;
`;
const CategoryTitle = styled.div`
  width: 30%;
  min-height: 30%;
  margin: 4.3% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;
const CategoryCheckBox = styled.div`
  width: 100%;
  min-height: 30%;
  // margin: 7% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CategoryLabel = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 5%;
  height: 14%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2%;
`;
export default StoryListPage;
