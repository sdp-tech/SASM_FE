import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import Loading from "../../common/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import Request from "../../../functions/common/Request";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import OtherUserData from "../../../functions/common/OtherUserData";

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: 50%;
  overflow-y: hidden;
`;
const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  // justify-content: space-between;
`
const Label = styled.div`
  width: 27vw;
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  border: 2px solid rgba(171, 239, 194, 0.1);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5vw;
  padding: 2% 0;
  font-size: 1rem;
  font-weight: 400;
  & + & {
    margin-left: 2vw;
  }
  &:hover {
    background-color: #51FFA6
  }
  @media screen and (max-width: 768px) {
    width: 25vw;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 15vw;
  }
  @media screen and (min-width: 992px) and (max-width: 1023px) {
    width: 30vw;
  }
`
const Text = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  justify-content: left;
  border: none;
  border-radius; 2px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
  padding: 2% 1vw;
  @media screen and (max-width: 768px) {
    width: 45vw;
    margin-left: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
    margin-left: 50px;
  }
  @media screen and (min-width: 992px) and (max-width: 1023px) {
    width: 40vw;
    margin-left: 30px;
  }
  @media screen and (min-width: 1023px) {
    width: 35vw;
    margin-left: 40px;
  }
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`
const FollowText = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  align-items: center;
  margin-left: 20px;
  transition: all 0.5s ease;
  &:hover {
    color: #1E90FF;
  }
`
const InfoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px - 0.3 * (100vh - 64px));
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding-left: 10vw;
  padding-right: 5vw;
  // border-right: 2px #44ADF7 solid;
  @media screen and (max-width: 767px) {
    padding: 2vw;
    border: none;
    border-bottom : 2px #44ADF7 solid;
  }
  @media screen and (min-width: 768px) and (max-width: 991px){
    padding: 2vw;
    border: none;
    border-bottom : 2px #44ADF7 solid;
  }
  
`
const DetailContainer = styled.div`
  height: calc(100vh - 64px - 0.3 * (100vh - 64px));
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding-left: 5vw;
  padding-right: 10vw;
`
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  border: 1px black solid;
  margin-left: 10vw;
  background-image: url(${props => props.profile});
  background-size: cover;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 150px;
    height: 150px;
  }
`;
const AllSection = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
`

const MySection = styled.div`
  margin-top: 30px;
`

const MySectionTitle = styled.div`
  margin: 20px 0;
  font-weight: bold;
  color:#282828;
`

const HistoryText = styled.div`
  cursor: pointer;
  &:hover {
    color: #1E90FF;
    text-decoration: underline;
  }
`

export default function InfoForm(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followerNum, setFollowerNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [myReviewedPlace, setMyReviewedPlace] = useState([]);
  const [myStory, setMyStory] = useState([]);
  const [myCuration, setMyCuration] = useState([]);
  const [myProfileModal, setMyProfileModal] = useState({});
  const request = Request(navigate);
  const myNickname = localStorage.getItem('nickname');
  //   초기에 mypage data 불러오기
  const updateMypage = async () => {
    const response_info = await request.get("/mypage/me/", null, null);
    setInfo(response_info.data.data);
    const response_following = await request.get('/mypage/following/', {
      email: response_info.data.data.email,
      search_email: ''
    });
    const response_follower = await request.get('/mypage/follower/', {
      email: response_info.data.data.email,
      search_email: ''
    });
    const response_myCuration = await request.get('/mypage/my_curation/', null, null);
    const response_myStory = await request.get('/mypage/my_story/',null, null);
    const response_myReviewPlace = await request.get('/mypage/my_reviewed_place/',null, null);

    setSearchParams({me: myNickname});
    setMyReviewedPlace(response_myReviewPlace.data.data.results);
    setMyStory(response_myStory.data.data.results);
    setMyCuration(response_myCuration.data.data);
    setFollowingNum(response_following.data.data.count);
    setFollowerNum(response_follower.data.data.count);
    setLoading(false);
  };
  const { profile_image, nickname, birthdate, email, introduction } = info;
  const myEmail = info.email

  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    updateMypage();
  }, []);

  const EditProfile = async () => {
    navigate("./change", { state: info });
  };

  const myData = async (email) => {
    const response = await request.get('/mypage/user/', {
      email: email
    });
    setMyProfileModal(response.data.data);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
      <>  
        <AllSection>
          <Section>
            <div style={{ width: '100%', height: '30%', display: 'flex', alignItems: 'center' }}>
              <ImageBox profile={profile_image} onClick={()=>{myData(info.email)}} />
              {open && <OtherUserData open = {open} userData = {myProfileModal} handleClose={handleClose}/>}
              <TextBox>
                <FollowText onClick={() =>{navigate('/mypage/follower?page=1')}}>팔로워 {followerNum}</FollowText>
                <FollowText onClick={() =>{navigate('/mypage/following?page=1')}}>팔로잉 {followingNum}</FollowText>
              </TextBox>
            </div>
            <InfoContainer>
              <LabelWrapper>
                <Label backgroundColor={"#AAEFC2"}>이메일</Label>
                <Text>{email}</Text>
              </LabelWrapper>
              <LabelWrapper>
                <Label backgroundColor={"#AAEFC2"}>닉네임</Label>
                <Text>{nickname}</Text>
              </LabelWrapper>
              <LabelWrapper>
                <Label backgroundColor={"#AAEFC2"}>한 줄 소개</Label>
                <Text>{introduction}</Text>
              </LabelWrapper>
              <LabelWrapper>
                <Label onClick={EditProfile} style={{ fontSize: '0.75rem', cursor: 'pointer' }}>프로필 편집</Label>
                <Label style={{ fontSize: '0.75rem' }}>
                  <Link to='/mypage/changepassword' style={{ color: '#000000', textDecoration: 'none' }}>비밀번호 변경</Link>
                </Label>
                <Label style={{ fontSize: '0.75rem' }}>
                  <Link to='./feedback' style={{ color: '#000000', textDecoration: 'none' }}>의견 보내기</Link>
                </Label>
              </LabelWrapper>
            </InfoContainer>
          </Section>
          <Section>
            <MySection>
              <MySectionTitle>내가 리뷰를 쓴 장소</MySectionTitle>
              {myReviewedPlace && myReviewedPlace.map(data => (
                <HistoryText
                  onClick={() => {
                  window.open(`/map?page=1&place=${data.place_name}`);
                  localStorage.setItem("place_name", data.place_name);
                  localStorage.setItem("value", 1);
                  }}
                  >{data.place_name}</HistoryText>
              ))}
            </MySection>
            <MySection>
              <MySectionTitle>내가 쓴 스토리</MySectionTitle>
              {myStory && myStory.map(data => (
                <HistoryText onClick={() => {window.open(`/story/${data.id}`)}}>{data.title}</HistoryText>
              ))}
            </MySection>
            <MySection>
              <MySectionTitle>내가 쓴 큐레이션</MySectionTitle>
              {myCuration && myCuration.map(data => (
                <HistoryText onClick={() => {window.open(`/curation/${data.id}`)}}>{data.title}</HistoryText>
              ))}              
            </MySection>
          </Section>
        </AllSection>
      </>
      )}
    </>
  );
};

