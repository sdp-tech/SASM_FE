import { useState, useEffect } from "react";
import styled from "styled-components";
import StoryList from "./components/StoryList";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import Pagination from "../common/Pagination";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  margin-top: 1%;
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
  width: 10vw;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 30vw;
    position: relative;
    right: -25vw;
    top: 2vw;
    height: 4vh;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    height: 4vh;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    height: 4vh;
  }
`
const StoryListSection = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 1%;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-area: story;
  scrollbar-height: thin;
`;
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
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
  @media screen and (min-width: 767px) and (max-width: 991px) {
    width:40%;
    font-size: 0.8rem;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    margin-top: 10px;
    width:40%;
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1200px) {
    width:35%;
    height:50%;
    font-size: 0.8rem;
  }
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
  const [searchToggle, setSearchToggle] = useState(false);
  const [limit, setLimit] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [toggleOpen, setToggleOpen] = useState(false);
  const [orderList, setOrderList] = useState(true);
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = Request(navigate);
  const [page, setPage] = useState(1);
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const handleToggleOpen = () => {
    setToggleOpen(!toggleOpen);
  }
  const onChangeSearch = (e) => {
    e.preventDefault();
    setTempSearch(e.target.value);
  };
  useEffect(() =>{
    if (search) setPage(1);
  },[search]) // 검색할 때마다 페이지 번호 1로 수정
  
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    getList();
    checkSasmAdmin(token, setLoading, navigate).then((result) => setIsSasmAdmin(result));
  }, [page, orderList, search]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearch(tempSearch);
  }
  const getList = async () => {

    setSearchToggle(true);
    setLoading(true);
    let searched;
    if (location.state?.name) {
      searched = location.state.name;
      setSearch("비건")
    } else {
      searched = search.trim();
    }
    
    const order = orderList ? "latest" : "oldest";

    const response = await request.get("/stories/story_search/", {
      page: page,
      search: search,
      order: order
    }, null);

    const params = {
      page: page
    }
    // navigate로 왔을 때, url 변경할 수 있게 하기...
    if(search) params.search = searched;
    setSearchParams(params);
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
                  search={tempSearch}
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
        </div>
      )}
    </>
  );
};

export default StoryListPage;