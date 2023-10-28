import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import HeartButton from "../../common/Heart";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import WriteComment from "./WriteComment";
import Comments from "./Comments";
import Recommends from "./StoryRecommend";
import { useMediaQuery } from "react-responsive";
import { Mobile, Pc, Tablet } from "../../../device"
import AdminButton from "../../Admin/components/AdminButton";
import OtherUserData from "../../../functions/common/OtherUserData";
import StoryInCuration from "./StoryIncludedCuration";

const Wrapper = styled.div`
  background: white;
  width: 100vw;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0 10vw;
  position:relative;
`;

const TopBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 1rem;
`;
const CategoryOptionBox = styled.div`
  position: relative;
  display: flex;
  float: left;
  line-height: 1rem;
`;
const Category = styled.div`
  height: 1.5rem; //line-height와 맞춰서 중앙정렬
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: #000000;
  padding: 0 10px;
  display: inline-block; //텍스트 크기에 자동 맞춤
`;
const Options = styled.div`
  height: 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: #999999;
  border-left: 1px solid #000000;
  border-width: 3px;
  padding: 0 10px;
  display: inline-block;
`;

const MainTitleNStoreNameBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 150px;
  font-weight: 100;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const MainTitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const MainTitle = styled.div`
  width: 80%;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 50px;
  color: #000000;
  padding-left: 10px;
  height: auto;
  display: inline-block; //텍스트 크기에 자동 맞춤
  @media screen and (max-width: 767px) {
    font-size: 1.3rem;
    height: auto;
    line-height: 150%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.3rem;
    height: auto;
    line-height: 150%;
  }
`;
const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.8rem;
    height: auto;
    line-height: 150%;
  }
`;

const StoreName = styled.div`
  width: 100%;
  height: 50px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  padding: 10px;
  height: auto;
  display: flex;
  align-items: center;
   @media screen and (max-width: 768px) {
    height: auto;
    font-size: 2rem;
    flex-flow: row wrap;
   }
   @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.7rem;
    width: 100%;
    height: auto;
    line-height: 150%;
  }
`;
const Tag = styled.div`
  width: 60%;
  height: auto;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 50px;
  padding: 10px;
  margin-left: 2%;
  @media screen and (max-width: 768px) {
    margin: 0;
    padding: 0;
    height: auto;
    font-size: 0.9rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    // display: none;
    font-size: 0.8rem;
  }
`;
const ButtonDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`;
const LikeIconBox = styled.div`
  width: 30px;
  height: 30px
  cursor: pointer;
`;
const ImageNContentBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 95%;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  flex-direction: column;
  zoom: 1.6;
  font-weight: 400;
  @media screen and (max-width: 767px) {
    zoom: 1;
    height: 97%;
  }
  @media screen and (min-width: 768px) and (max-width:1023px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 1024px) {
    // zoom: 1;
    padding-top: 20px;
  }
`;
// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  background-color: #ffffff;
  height: 50px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const MarkupBox = styled.div`
  width: 100%;
  @media screen and (max-width: 768px) {
    * img {
      width: 100%;
      height: 100%;
    }
    * p {
    }
  }
`
const Text = styled.p`
  margin: auto;
`
const ProfileText = styled.p`
  cursor: pointer;
  margin: auto;
  &:hover {
    color: #00AFFF;
  }
`
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  width: 19%;
`
const View = styled.div`
  align-items: center;
`
const Image = styled.img`
  width: 30%;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`

const MapButton = styled(Button)({
  border: 0,
  borderRadius: "29px",
  boxShadow:
    "0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25), 0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25)" /* 그림자 */,
  backgroundColor: "#3AE89480",
  fontWeight: "600",
  display: "flex",
  width: "137px",
  height: "30px",
});

const ButtonText = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
});

const FooterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackToList = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
  }
  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
`;
const DeleteButton = styled.div`
  // position: absolute;
  color: black;
  cursor : pointer;
  // right: 0;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
  @media screen and (max-width: 768px) {
  }
  // margin: 20px auto;
`;
const FollowBox = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`

const StoryDetailBox = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const id = props.id; 
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [curation, setCuration] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = Request(navigate);
  const handlePageGoToMap = (place_name) => {
    navigate(`/map?page=1&place=${place_name}`, { state: { name : place_name }});
    localStorage.setItem('place_name', place_name);
  };
  const [refresh, setRefresh] = useState(false);
  const myEmail = localStorage.getItem('email');

  const rerender = () => {
    setRefresh(!refresh);
  }

  const following = async (email) => {
    const response = await request.post('/mypage/follow/',
      {
        targetEmail: email
      })
      if(data.writer_is_followed) {
        data.writer_is_followed = !data.writer_is_followed;
      }
    if(response.data.status == 'fail') alert(response.data.message)
    rerender();
  }

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post(`/stories/${id}/story_like/`);
      rerender();
    }
  };

  const delStory = async() => {
    if(window.confirm("삭제하시겠습니까?")) {
      const response = await request.del(`/stories/${id}/delete/`);
      alert("삭제되었습니다.");
      navigate("/story?page=1");
    }
  }

  const markup = () => {
    return { __html: `${data.html_content}` };
  };

  const loadItem = async () => {
  try {
    setLoading(true);
    const response_detail = await request.get(`/stories/story_detail/${id}/`);
    const response_comment = await request.get("/stories/comments/", { story: id }, null);
    const recommend_story = await request.get("/stories/recommend_story/", { id: id }, null);
    const included_curation = await request.get(`/stories/story_included_curation/${id}/`);
    setData(response_detail.data.data);
    setComment(response_comment.data.data);
    setRecommend(recommend_story.data.data);
    setCuration(included_curation.data.data);
    setLoading(false);
  }
  catch (e) {
    navigate("/notexistpage");
  }
  };

  const otherUserData = async (email) => {
    const response = await request.get('/mypage/user/', {
      email: email
    });
    setOtherUser(response.data.data);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    loadItem();
  }, [refresh]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Mobile>
            <ButtonDiv>
              <MapButton onClick={(e) => { handlePageGoToMap(data.place_name) }}>
                <ButtonText>Go To Map</ButtonText>
              </MapButton>
              <BackToList style={{marginBottom: '30px'}}
                onClick={() => { navigate('/story?page=1'); }}>&#60; Back To List</BackToList>
            </ButtonDiv>
          </Mobile>
          <TopBox>
            <CategoryOptionBox>
              <Category>{data?.category}</Category>
              <Options>{data.semi_category}</Options>
              <div style={{position: "absolute", left:'63vw', top:"-30px"}}>               
                <InfoBox>
                  <Image src={data.profile} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} onClick={() => {otherUserData(data.writer)}} />
                  <View>
                  <ProfileText onClick={() => {otherUserData(data.writer)}}>{data.nickname}</ProfileText>
                  <Text>{data.created.slice(0, 10).replace(/-/gi, '.')} 작성</Text>  
                  {myEmail === data.writer ? <DeleteButton onClick={delStory}>삭제하기</DeleteButton> : <></>}
                  {myEmail === data.writer ? <DeleteButton onClick={() => {navigate(`/admin/story/${id}`)}}>수정하기</DeleteButton> : <></>}
                  </View>
                </InfoBox>
                <FollowBox>
                {
                  myEmail !== data.writer ? <AdminButton style={{width:"100%"}} onClick={()=>{following(data.writer)}}>{data.writer_is_followed ? 
                <Text>팔로우 취소</Text>:
                <Text>+ 팔로잉</Text>}</AdminButton> : <></>
                }
                </FollowBox>
                </div>
            </CategoryOptionBox>
          </TopBox>
          <MainTitleNStoreNameBox>
            <MainTitleBox>
              <MainTitle>{data.title}</MainTitle>
              <Pc>
                <BackToList style={{marginTop: "30px"}} onClick={() => { navigate('/story?page=1'); }}>&#60; Back To List</BackToList>
              </Pc>
              <Tablet><BackToList style={{marginTop: "30px"}} onClick={() => { navigate('/story?page=1'); }}>&#60; Back To List</BackToList></Tablet>
            </MainTitleBox>
            <StoreNameBox>
              <StoreName>
                {data.place_name}
                <LikeIconBox>
                  <LikeButton>
                    {data.story_like === true ? (
                      <HeartButton like={!like} onClick={toggleLike} />
                    ) : (
                      <HeartButton like={like} onClick={toggleLike} />
                    )}
                    {data.like_cnt}
                  </LikeButton>
                </LikeIconBox>
                <Tag>{data.tag}</Tag>
              </StoreName>
              <Pc>
                <ButtonDiv>
                  <MapButton onClick={(e) => { handlePageGoToMap(data.place_name) }}>
                    <ButtonText>Go To Map</ButtonText>
                  </MapButton>
                </ButtonDiv>
              </Pc>
              <Tablet>
                <ButtonDiv>
                  <MapButton onClick={(e) => { handlePageGoToMap(data.place_name) }}>
                    <ButtonText>Go To Map</ButtonText>
                  </MapButton>
                </ButtonDiv>
              </Tablet>
            </StoreNameBox>
          </MainTitleNStoreNameBox>
          {open && <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose}/>}
          <ImageNContentBox>
            <div>{data.story_review}</div>
            <MarkupBox dangerouslySetInnerHTML={markup()}></MarkupBox>
          </ImageNContentBox>
          <Comments data={comment}></Comments>
          <WriteComment id={id}></WriteComment>
          {recommend.count != 0 ? (
            <Recommends data={recommend}></Recommends>
          ) : (
            <></>
          )}
          {curation.length ? (
            <StoryInCuration data={curation}/>
          ) : (
            <></>
          )}
          <FooterBox>
          </FooterBox>
        </Wrapper>
      )}
    </>
  );
};

export default StoryDetailBox;
