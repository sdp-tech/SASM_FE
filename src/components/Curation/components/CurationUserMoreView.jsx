import React,  {useState, useEffect} from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import CurationList from "./CurationList";
import styled from "styled-components";
import Loading from "../../common/Loading";
import SearchBar from "../../common/SearchBar";
import searchBlack from "../../../assets/img/search_black.svg";
import Request from "../../../functions/common/Request";
import { useCookies } from "react-cookie";
import checkSasmAdmin from "../../Admin/Common";
import Pagination from "../../common/Pagination";
import qs from 'qs';

const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 80vh;
  min-height: 100%;
  width: 100%;
  grid-area: curation;
  display: flex;
  flex-direction: column;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 7vh;
  width: 100%;
  display: flex;
  margin-top: 0.1%;
  flex-direction: row;
  grid-area: curation;
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
const SectionCuration = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 64px - 13vh);
  width: 70%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  grid-area: curation;
  scrollbar-height: thin;
  // overflow: scroll;
  @media screen and (max-width: 768px) {
  }
`;
const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 4vh;
  }
  height: 70%;
  display: flex;
  background: #FFFFFF;
  border-radius: 56px;
  margin: auto;
  margin-top: 10px;
`;
const TitleBox = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  margin-bottom: 0px;
  width: 70%;
  margin: auto;
  margin-top: 50px;
`
const MainTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`
const SubText = styled.p`
  font-size: 14px;
  font-family: pretendard;
  color: #6C6C6C;
`
const SubWrap = styled.div`
  display: flex;
  position: relative;
  margin: 0;
`
const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  bottom: 0;
  width: 100%;
  position: relative;
  z-index: 20;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;

const CurationUserMoreView = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = Request(navigate);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  useEffect(() =>{
    if (search) queryString.page = 1;
   },[search]) // 검색할 때마다 페이지 번호 1로 수정

  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    handleSearchToggle();
    checkSasmAdmin(token, setLoading, navigate).then((result) => setIsSasmAdmin(result));
  }, [queryString.page]);

  const handleSearchToggle = async (e) => {
    if(e) e.preventDefault();
    
    let searched
    if (location.state?.search) {
      searched = location.state.search;
      setSearch(location.state.search);
      location.state.search = "";
    } else {
      searched = search.trim();
    }
    const response = await request.get("/curations/verified_user_curations/", {
      page: queryString.page,
      search: searched
    }, null);
    if(search) setSearchParams({page:queryString.page, search: search});
    setItem(response.data.data.results);
    setPageCount(response.data.data.count);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Section>
            <SearchBarSection>
              <SearchFilterBar>
                <SearchBar
                  search={search}
                  onChangeSearch={onChangeSearch}
                  handleSearchToggle={handleSearchToggle}
                  placeholder="원하는 장소를 입력해주세요."
                  searchIcon={searchBlack}
                  background="white"
                  color="black"
                  fontsize="0.8rem"
                />
              </SearchFilterBar>
            </SearchBarSection>
            <TitleBox>
              <MainTitle>이 큐레이션은 어때요?</MainTitle>
                <SubWrap>
                  <SubText>유저가 직접 작성한 큐레이션을 살펴보세요.</SubText>
                </SubWrap>
            </TitleBox>
            <SectionCuration>
              <CurationList info={item} />
            </SectionCuration>
          </Section>
          <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={queryString.page}
            />
          </FooterSection>
        </div>
      )}
    </>
  );
};
   

export default CurationUserMoreView;
