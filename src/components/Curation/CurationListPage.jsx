import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";
import Request from "../../functions/common/Request";
import ItemCard from "./components/ItemCard";
import CurationList from "./components/CurationList";
import { Grid } from "@mui/material";
import toggleOpenImg from "../../assets/img/toggleOpen.svg";


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
  margin-top: 20px;
  display: flex;
  grid-area: curation;
  scrollbar-height: thin;
  // overflow: scroll;
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
  &:hover {
    color: #00AFFF;
  }
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
  // bottom: 0;
  width: 100%;
  // position: absolute;
  z-index: 20;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;
const ToggleWrapper = styled.div`
  position: absolute;
  height: 50%;
  display: flex;
  right: 15vw;
  width: 12vw;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 30vw;
    top: 2vh;
    position: relative;
    right: -25vw;
    height: 3vh;
  }
`
const OrderToggle = styled.div`
  background-color: #FFFFFF;
  cursor: pointer;
  width: 125%;
  height: 130%;
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

const Image = styled.img`
  width: 160px;
  height:160px; 
  border-radius:80px;
  transition: all .5s;
  @media screen and (max-width: 767px) {
    width: 15vw;    
    height: 15vw;
    border-radius: 50%;   
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 13vw;    
    height: 13vw;
    border-radius: 50%;   
  }
  &:hover {
    transform: rotate(1turn);
  }
`

const CurationListPage = () => {
  const [item, setItem] = useState([]);
  const [repCuration, setRepCuration] = useState([]);
  const [verifedCuration, setVerifiedCuration] = useState([]);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [orderList, setOrderList] = useState(true);
  // 연관 스토리 검색
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = Request (navigate);

  const handleToggleOpen = () => {
    setToggleOpen(!toggleOpen);
  };
  const onChangeSearch = (e) => {
    e.preventDefault();
    setTempSearch(e.target.value);
  };
  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    checkSasmAdmin(token, setLoading, navigate).then((result) => setIsSasmAdmin(result));
  }, []);

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
    if(search && orderList) {
      navigate(`/curation/curationlist?page=1&search=${search}`, {state : {search: search}})
    } else if(search && !orderList) {
      navigate(`/curation/usercurationlist?page=1&search=${search}`, {state : {search: search}})
    }

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
    handleSearchToggle();
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
              <ToggleWrapper>
                {orderList ?
                  <>{toggleOpen ?
                    <>
                      <OrderToggle onClick={() => {
                        setOrderList(true);
                        handleToggleOpen();
                      }}>큐레이션 검색<img style={{ transform: 'rotate(180deg) scale(0.8)' }} src={toggleOpenImg} /></OrderToggle>
                      <OrderToggle onClick={() => {
                        setOrderList(false);
                        handleToggleOpen();
                      }}>유저 큐레이션 검색</OrderToggle>
                    </>
                    :
                    <OrderToggle onClick={handleToggleOpen}>큐레이션 검색<img src={toggleOpenImg} /></OrderToggle>}
                  </>
                  :
                  <>{toggleOpen ?
                    <>
                      <OrderToggle onClick={() => {
                        setOrderList(false);
                        handleToggleOpen();
                      }}>유저 큐레이션 검색 <img style={{ transform: 'rotate(180deg) scale(0.8)' }} src={toggleOpenImg} /></OrderToggle>
                      <OrderToggle onClick={() => {
                        setOrderList(true);
                        handleToggleOpen();
                      }}>큐레이션 검색</OrderToggle>
                    </>
                    :
                    <OrderToggle onClick={handleToggleOpen}>유저 큐레이션 검색 <img src={toggleOpenImg} /></OrderToggle>}
                  </>
                }
              </ToggleWrapper>
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
                <Image src="/img/place_seongsu.jpg" alt="성수동"/>
                <RecommendPlaceText>성수동</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.5090846971287, lng: 127.108220751231 }})  
              }}>
                <Image src="/img/place_songridan.jpg" alt="송리단길"/>
                <RecommendPlaceText>송리단길</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.555833333333325, lng: 126.89999999999999 }})
              }}>
                <Image src="/img/place_mangwon.jpg" alt="망원동"/>
                <RecommendPlaceText>망원동</RecommendPlaceText>
              </RecommendPlace>
              <RecommendPlace onClick={() => { 
                  navigate("/map?page=1", { state: { lat: 37.55972222222222, lng: 126.9752777777778 }})  
              }}>
                <Image src="/img/place_namdaemun.jpg" alt="남대문"/>
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
              <Grid container spacing={2}>
                {storyData.map((info, index) => (
                  <Grid item key={info.id} xs={3} sm={3} md={3} lg={3}>
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