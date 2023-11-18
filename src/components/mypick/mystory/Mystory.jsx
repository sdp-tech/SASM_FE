import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import Loading from "../../common/Loading";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
import { useNavigate, useLocation, Link, useSearchParams } from "react-router-dom";
import Request from "../../../functions/common/Request";
import ChangeMode from "../../../assets/img/Mypick/ChangeMode.svg"
import CategorySelector, { CATEGORY_LIST, MatchCategory } from "../../common/Category"
import qs from 'qs';
import SearchBar from "../../common/SearchBar";
import searchBlack from "../../../assets/img/search_black.svg";

const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 4vh;
  }
  @media screen and (min-width: 767px) and (max-width: 991px) {
    width:40%;
    height:80%;
    font-size: 0.2rem;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    margin-top: 10px;
    width:40%;
    height:90%;
    font-size: 0.5rem;
  }
  @media screen and (min-width: 1200px) {
    width:35%;
    height:50%;
    font-size: 0.8rem;
  }
  height: 50%;
  display: flex;
  background: #FFFFFF;
  border-radius: 56px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin: 0 auto;
  margin-top: 3%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MyplaceSection = styled.div`
  font-family: pretendard;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
  grid-area: story;
`;
const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: story;
`;
const CardSection = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  // border-radius: 10%;
  justify-content: center;
  align-items: center;
  transition: all .5s ease;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 767px) {
    border-radius: 3%;
  }
`;
const NothingSearched = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChangeModeButton = styled(Link)`
  // width: 30%;
  text-align: left;
  font-size: 1.25rem;
  z-index: 3;
  color: inherit;
  text-decoration: none;
  transition: all .5s ease;
  @media screen and (max-width: 768px) {
    position: absolute;
    left: 30px;
  }
  &:hover {
    background: linear-gradient(to right top, #228B22, #C1FF6B);
    color: transparent;
    -webkit-background-clip: text;
    transform: scale(1.01);
  }

`
const FilterOptions = styled.div`
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`
const MenuSection = styled.div`
  margin-top: 20px;
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`
const MoveSection = styled.div`
  display: flex;
  flex-direction: column;
`
const Mystory = () => {
  const [checkedList, setCheckedList] = useState('');
  const [info, setInfo] = useState([]);
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(6);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const request = Request(navigate);
  const [page, setPage] = useState(1);
  const [pageOneFlag, setPageOneFlag] = useState(false);
  const nickname = localStorage.getItem('nickname');
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    checked ? setCheckedList([...checkedList, item]) : setCheckedList(checkedList.filter((el) => el !== item));
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setTempSearch(e.target.value);
  };

  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearch(tempSearch);
  }

  const pageMystory = async () => {

    setLoading(true);
    let params = new URLSearchParams();
    for (const category of checkedList) params.append('filter', category);
    
    const response = await request.get(`/mypage/mypick_story/?${params.toString()}`, {
      page: queryString.page,
      search: queryString.search
    }, null);

    setPageCount(response.data.data.count);
    setInfo(response.data.data.results);
    setLoading(false);
  };

  useEffect(() => {
    if (queryString.search || checkedList||search=="") setPage(1);
  }, [checkedList, queryString.search]);
  useEffect(() => {
    const params = {
       page: page,
       me: nickname
    };
    if (search) params.search = search;
    if (checkedList) params.checkedList = checkedList
    if ((page===1 && search)||(page===1 && checkedList)||page !== 1) {
      setSearchParams(params);
      setPageOneFlag(true);
    } else if (page === 1 && pageOneFlag) {
      setSearchParams(params);
    }
  }, [search, page, checkedList]);

  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    pageMystory();
    if (parseInt(queryString.page) !== page) setPage(parseInt(queryString.page));
    if (queryString.search) setTempSearch(queryString.search);
  }, [queryString.page, checkedList, queryString.search]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MyplaceSection>
            <span style={{ fontWeight: "500", fontSize: "1.6rem", color: "#000", marginBottom: "50px" }}>
              MY STORY
            </span>
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
            <HeaderSection>
              <MoveSection>
                <MenuSection>
                  <ChangeModeButton to={`/mypick/myplace?page=1&me=${nickname}`}>
                    <img src={ChangeMode} style={{ marginRight: '10px' }} />
                    PLACE
                  </ChangeModeButton>
                </MenuSection>
                <MenuSection>
                  <ChangeModeButton to={`/mypick/mycuration?page=1&me=${nickname}`}>
                    <img src={ChangeMode} style={{ marginRight: '10px' }} />
                    CURATION
                  </ChangeModeButton>
                </MenuSection>
              </MoveSection>
              
              <FilterOptions>
                <CategorySelector checkedList={checkedList} onCheckedElement={onCheckedElement} />
              </FilterOptions>
            </HeaderSection>
            <main style={{ width: '100%' }}>
              <Container
                sx={{
                  marginTop: "3%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <>
                  {info.length === 0 ? (
                    <NothingSearched>
                      <img
                        src={nothingIcon}
                        style={{ marginTop: "50%", paddingTop: "50%" }}
                        alt="no data"
                      />
                      해당하는 스토리가 없습니다
                    </NothingSearched>
                  ) : (
                    <Grid container spacing={5}>
                      {info.map((info, index) => (
                        <Grid item key={info.id} xs={12} sm={12} md={6} lg={6}>
                          <CardSection>
                            <ItemCard
                              category={info.category}
                              key={index}
                              story_id={info.id}
                              rep_pic={info.rep_pic}
                              title={info.title}
                              place_name={info.place_name}
                              place_like={info.place_like}
                              preview={info.preview}
                            />
                          </CardSection>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              </Container>
            </main>
          </MyplaceSection>
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

export default Mystory;
