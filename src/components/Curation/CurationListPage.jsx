import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";
import Request from "../../functions/common/Request";
import ItemCard from "./components/ItemCard";
import CurationList from "./components/CurationList";
import { Grid } from "@mui/material";
import SeongSu from "../../assets/img/Curation/place_seongsu.jpeg";
import NamDaeMun from "../../assets/img/Curation/place_namdaemun.jpeg";
import MangWon from "../../assets/img/Curation/place_mangwon.jpeg";
import SongRiDan from "../../assets/img/Curation/place_songridan.jpg";


const CardSection = styled.div`
box-sizing: border-box;
position: relative;
display: flex;
// flex-direction: column;
overflow: hidden;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`;

const Section = styled.div`
  box-sizing: border-box;
  font-family: pretendard;
  color: #000;
  position: relative;
  height: 220vh;
  min-height: 100%;
  width: 100%;
  grid-area: curation;
  display: flex;
  flex-direction: column;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 50px;
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
  height: calc(100vh - 64px - 25vh);
  width: 75%;
  margin: auto;
  display: flex;
  grid-area: curation;
  scrollbar-height: thin;
  // overflow: scroll;
  @media screen and (max-width: 768px) {
  }
`;
const RecommendPlace = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  width: 100%;
  height: 50%;
  text-align: center;
  cursor: pointer;
`
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
const MoreView = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
`
const MoreViewText = styled.p`
  font-weight: 600;
  font-size: 12px;
  font-family: pretendard;
`
const RecommendPlaceText = styled.p`
  font-weight: 600;
  font-size: 16px;
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

const CurationListPage = () => {
  const [item, setItem] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [repCuration, setRepCuration] = useState([]);
  const [verifedCuration, setVerifiedCuration] = useState([]);
  // 큐레이션 검색어
  const [checkedList, setCheckedList] = useState('');
  // 연관 스토리 검색
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  const onCheckedElement = (checked, item) => {
    navigate('/map?page=1');
    if (checked) {
        setCheckedList([...checkedList, item]);
    } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setTempSearch(e.target.value);
  };
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, []);
  useEffect(()=>{
    handleSearchToggle();
  }, [search]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if(e) {e.preventDefault();}
    const response = await request.get("/curations/curation_search/", {
      search: tempSearch,
    }, null);
    setSearch(tempSearch);
    setItem(response.data.data.results);
    setLoading(false);
  };
  const getCurration = async () => {
    setLoading(true);
    if(search) {navigate(`/curation/curationlist?page=1&search=${search}`, {state : {search: search}})}
    const response_admin = await request.get('/curations/admin_curations/');
    const response_rep = await request.get('/curations/rep_curations/');
    setRepCuration(response_rep.data.data.results);
    const response_verifed = await request.get('/curations/verified_user_curations/');
    setVerifiedCuration(response_verifed.data.data.results);
    setLoading(false);
  }
  const getStory = async() => {
    const response_story = await request.get('/stories/story_search/', {
      page: 1,
      search: '비건',
      latest: true
    });
    setStoryData(response_story.data.data.results);
  }
  useEffect(() => {
    getStory();
    getCurration();
  }, [search])

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
                  search={tempSearch}
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
              <MainTitle>큐레이션</MainTitle>
                <SubWrap>
                  <SubText>장소를 모아 놓은 코스를 추천 받아보세요.</SubText>
                  <MoreView onClick={() => { navigate('/curation/curationlist?page=1') }}><MoreViewText>더 보기 &gt;</MoreViewText></MoreView>
                </SubWrap>
            </TitleBox>
            <SectionCuration >
              <CurationList info={repCuration} />
            </SectionCuration>
            <TitleBox>
                <MainTitle>이 큐레이션은 어때요?</MainTitle>
                  <SubWrap>
                    <SubText>유저가 직접 작성한 큐레이션을 살펴보세요.</SubText>
                    <MoreView onClick={() => { navigate('/curation/usercurationlist?page=1') }}><MoreViewText>더 보기 &gt;</MoreViewText></MoreView>
                  </SubWrap>
            </TitleBox>
            <SectionCuration>
              <CurationList info={verifedCuration} />
            </SectionCuration>
            <TitleBox>
              <MainTitle style={{marginBottom: 40}}>장소추천</MainTitle>
            </TitleBox>
            <SectionCuration>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.544641605, lng: 127.055896738 }});  
              }}>
                <img src={SeongSu} style={{width: 160, height:160, borderRadius:100}} alt="성수동"/>
                <RecommendPlaceText>성수동</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.5090846971287, lng: 127.108220751231 }})  
              }}>
                <img src={SongRiDan} style={{width: 160, height:160, borderRadius:160}} alt="송리단길"/>
                <RecommendPlaceText>송리단길</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.555833333333325, lng: 126.89999999999999 }})
              }}>
                <img src={MangWon} style={{width: 160, height:160, borderRadius:160}} alt="망원동"/>
                <RecommendPlaceText>망원동</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.55972222222222, lng: 126.9752777777778 }})  
              }}>
                <img src={NamDaeMun} style={{width: 160, height:160, borderRadius:160}} alt="남대문"/>
                <RecommendPlaceText>남대문</RecommendPlaceText>
              </RecommendPlace>
            </SectionCuration>
            <TitleBox>
              <MainTitle>비건과 관련된 스토리</MainTitle>
              <SubWrap>
                <MoreView onClick={() => { navigate('/story?page=1&search=비건', {state: {name:'비건'}}) }}><MoreViewText>더 보기 &gt;</MoreViewText></MoreView>
              </SubWrap>
            </TitleBox>
            <SectionCuration style={{marginTop:40}}>
              <Grid container spacing={4}>
                {storyData.map((info, index) => (
                  <Grid item key={info.id} xs={12} sm={6} md={4} lg={3}>
                    <CardSection onClick={()=>{navigate(`/story/${info.id}`)}}>
                      <ItemCard
                        category={info.category}
                        key={index}
                        story_id={info.id}
                        rep_pic={info.rep_pic}
                        title={info.title}
                        place_name={info.place_name}
                        place_like={info.place_like}
                        // preview={info.preview}
                      />
                    </CardSection>
                  </Grid>
                ))}
              </Grid>
            </SectionCuration>
          </Section>
          <FooterSection>
            {isSasmAdmin ? (
              <AdminButton
                onClick={() => {
                  navigate("/admin/curation?page=1");
                }}
              >
                큐레이션 생성
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

export default CurationListPage;