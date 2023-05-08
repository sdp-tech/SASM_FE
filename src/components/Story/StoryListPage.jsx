import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryList from "./components/StoryList";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import Pagination from "../common/Pagination";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";
import Request from "../../functions/common/Request";
import toggleOpenImg from "../../assets/img/toggleOpen.svg";
import qs from 'qs';

const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 114px);
  min-height: 100%;
  width: 100%;
  grid-area: story;
  display: flex;
  flex-direction: column;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 8vh;
  width: 100%;
  display: flex;
  margin-top: 0.1%;
  flex-direction: row;
  grid-area: story;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin-top: 3vh;
    flex-direction: column;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
  }
`;
const ToggleWrapper = styled.div`
  position: absolute;
  height: 50%;
  display: flex;
  right: 15vw;
  width: 8vw;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 30vw;
    position: relative;
    right: -25vw;
    height: 4vh;
  }
`
const StoryListSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 64px - 13vh);
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-area: story;
  scrollbar-height: thin;
  overflow: scroll;
  @media screen and (max-width: 768px) {
  }
`;
const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  // position: relative;
  z-index: 20;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;
const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 4vh;
  }
  height: 50%;
  display: flex;
  background: #FFFFFF;
  border-radius: 56px;
`;
const OrderToggle = styled.div`
  background-color: #FFFFFF;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0 1vw;
  text-align: center;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  & + & {
    transform: translateY(100%);
    justify-content: center;
  }
  img {
    transform: scale(0.8);
  }
  @media screen and (max-width: 768px) {
    padding: 0 3vw;
  }
  z-index: 3;
`
const StoryListPage = () => {
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [limit, setLimit] = useState(4);
  const location = useLocation();
    const queryString = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggleOpen, setToggleOpen] = useState(false);
  const [orderList, setOrderList] = useState(true);
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  const handleOrderToggle = () => {
    setOrderList(!orderList);
  }
  const handleToggleOpen = () => {
    setToggleOpen(!toggleOpen);
  }
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    handleSearchToggle();
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, [queryString.page, orderList]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearchToggle(true);
    setLoading(true);
    let newPage;
    if (queryString.page == 1) {
      newPage = null;
    } else {
      newPage = queryString.page;
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
      latest: orderList.toString(),
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
        <div style={{}}>
          <Section>
            <SearchBarSection>
              <SearchFilterBar>
                <SearchBar
                  search={search}
                  onChangeSearch={onChangeSearch}
                  handleSearchToggle={handleSearchToggle}
                  placeholder="어떤 장소의 이야기가 궁금하신가요?"
                  searchIcon={searchBlack}
                  background="white"
                  color="black"
                  fontsize="0.8rem"
                />
              </SearchFilterBar>
              <ToggleWrapper>
                {orderList ?
                  <>{toggleOpen ?
                    <>
                      <OrderToggle onClick={() => {
                        setOrderList(true);
                        handleToggleOpen();
                      }}>최신순 <img style={{ transform: 'rotate(180deg) scale(0.8)' }} src={toggleOpenImg} /></OrderToggle>
                      <OrderToggle onClick={() => {
                        setOrderList(false);
                        handleToggleOpen();
                      }}>오래된 순</OrderToggle>
                    </>
                    :
                    <OrderToggle onClick={handleToggleOpen}>최신순 <img src={toggleOpenImg} /></OrderToggle>}
                  </>
                  :
                  <>{toggleOpen ?
                    <>
                      <OrderToggle onClick={() => {
                        setOrderList(false);
                        handleToggleOpen();
                      }}>오래된 순 <img style={{ transform: 'rotate(180deg) scale(0.8)' }} src={toggleOpenImg} /></OrderToggle>
                      <OrderToggle onClick={() => {
                        setOrderList(true);
                        handleToggleOpen();
                      }}>최신순</OrderToggle>
                    </>
                    :
                    <OrderToggle onClick={handleToggleOpen}>오래된 순 <img src={toggleOpenImg} /></OrderToggle>}
                  </>
                }
              </ToggleWrapper>
            </SearchBarSection>
            <StoryListSection>
              <StoryList info={item} />
            </StoryListSection>
          </Section>
          <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={queryString.page}
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
        </div>
      )}
    </>
  );
};

export default StoryListPage;