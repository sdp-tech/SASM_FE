import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react'
import Request from "../../../functions/common/Request";
import HeartButton from '../../common/Heart';
import { useCookies } from "react-cookie";
import Heart from '../../common/Heart'
import styled from "styled-components";
import { Button } from 'rsuite';
import OtherUserData from '../../../functions/common/OtherUserData';

const TitleBox = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  align-items: center;
  margin-top: 50px;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const StoryTitleBox = styled(TitleBox)`
  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }  
`

const CurationPlusButton = styled.div`
`
const LikeIconBox = styled.div`
  width: 30px;
  height: 30px
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`
const StoryPlaceName = styled.p`
  
`
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  width: 19%;
  @media screen and (max-width: 767px) {
    width: 45%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 45%;
  }
`
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-text: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
`
const GotoMap = styled.button`
  // margin: 20px auto;
  background-color: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
`
const StorySection = styled.div`
`
const ProfileImage = styled.img`
  width: 30%;
  width: 50px;
  height: 50px;
  border-radius: 25px; margin-right: 20px;
  &:hover {
    transform: scale(1.02);
  }
`
const StoryProfileImage = styled(ProfileImage)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Image = styled.img`
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`
const View = styled.div`
  position: relative;
  align-items: center;
`
const IconView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`
const StoryInfoBox = styled.div`
  position: relative;
`
const GotoStory = styled.button`
margin-bottom: 15px;
margin-top: 15px;
background-image: linear-gradient(
  // to right,
  #f5f6fa,
  #f6e58d
);
  color: #485460;
  border-radius: 5px;
  padding: 2px 8px;
  // font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  // margin-left: 25px;
  align-items: center;
  cursor: pointer;
  border: none;
  font-size: 0.8rem;
  // box-shadow: 1px 1px 1px black;
  transition-duration: 0.3s;
  &:active {
    background-image: linear-gradient(
      // to right,
      #f6e58d,
      #f5f6fa
    );
    margin-left: 5px;
    margin-top: 20px;
  }
`
const StoryContentBox = styled.div`
  padding-horizontal: 25px;
  margin-vertical: 20px;
`
const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0 10vw;
  position:relative;
`;

const BackToList = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  margin-top: 2rem;
  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
  @media screen and (max-width: 768px) {
  }
  // margin: 20px auto;
`;
const DeleteButton = styled.div`
  text-align: right;
  color: black;
  cursor : pointer;
  margin-top: 5px;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
  @media screen and (max-width: 768px) {
  }
  // margin: 20px auto;
`;
const UpdateButton = styled(DeleteButton)`
`
const ButtonDiv = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    align-items: right;
    margin-bottom: 1rem;
    margin-top: 0px;
  }
`;
const Title = styled.div`
  width: 100%;
  height: 50px;
  color: #000000;
  font-weight: 700;
  font-size: 2.5rem;
  padding: 10px;
  align-items: center;
  justify-content: left;
  display: flex;
   @media screen and (max-width: 768px) {
    height: auto;
    font-size: 1.2rem;
    flex-flow: row wrap;
   }
`;
const ImgBox = styled.div`
   display: flex;
   flex-direction:column;
   align-items:center;
`
const StoryProfileInfoBox = styled(InfoBox)`
   text-align : right;
`
const Writer = styled.p`
   &:hover {
    color: #00AFFF;
   }
`
const ButtonWrapper = styled.div`
`
export default function CurationDetailBox() {
  const navigate = useNavigate();
  const params = useParams();
  const myEmail = localStorage.getItem("email");
  const token = localStorage.getItem("accessTK");
  const [like, setLike] = useState(false);
  const request = Request(navigate);
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const [curatedStory, setCuratedStory] = useState([]);
  const [curationDetail, setCurationDetail] = useState({
    contents: '',
    created: '',
    like_curation: false,
    like_cnt: 0,
    map_image: '',
    rep_pic: '',
    title: '',
    nickname: '',
    profile_image: '',
    writer_email: '',
    writer_is_verified: false,
    writer_is_followed: false
  });
  const [refresh, setRefresh] = useState(false);

  const rerender = () => {
    setRefresh(!refresh);
  }

  const delCuration = async() => {
    const isVerified = curationDetail.writer_is_verified
    if(window.confirm("삭제하시겠습니까?")) {
      const response = await request.del(`/curations/curation_delete/${params.id}/`);
      alert("삭제되었습니다.");
      isVerified ? navigate('/curation/usercurationlist?page=1') : navigate('/curation/curationlist?page=1')
    }
  }

    // 좋아요 클릭 이벤트
    const toggleLike = async () => {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      } try {
        const response = await request.post(`/curations/curation_like/${params.id}/`);
        rerender();
      } catch (err) {
        console.log(err);
      }
    };

  const getCurationDetail = async () => {
    try {
    const response_detail = await request.get(`/curations/curation_detail/${params.id}/`);
    setCurationDetail(response_detail.data.data);
    }
    catch (err) {
      navigate('/notexistpage');
    }
  }
  const getCurationStoryDetail = async () => {
    const reponse_story_detail = await request.get(`/curations/curated_story_detail/${params.id}/`); 
    setCuratedStory(reponse_story_detail.data.data);
   }
  

  useEffect(() => {
    getCurationDetail();
    getCurationStoryDetail();
  }, [refresh])
  
  const following = async (email) => {
    const response = await request.post('/mypage/follow/',
      {
        targetEmail: email
      })
      if(curationDetail.writer_is_followed) {
        curationDetail.writer_is_followed = !curationDetail.writer_is_followed;
      }
    if(response.data.status == 'fail') alert(response.data.message)
    rerender();
  }

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

  const markup = () => {
    return { __html: `${curationDetail.contents}` };
  };

  return (
    <>
      <Wrapper>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <View style={{ position: 'relative' }}>
            <TitleBox>
              <Title>{curationDetail.title}</Title>
              {open && <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose}/>}
              <InfoBox>
                <IconView>
                  <ProfileImage src={ curationDetail.profile_image } onClick={() => {otherUserData(curationDetail.writer_email)}}/>
                  <LikeIconBox style={{marginTop: "20px", marginBottom:"20px"}}>
                      {curationDetail.like_curation === true ? (
                        <HeartButton like={!like} onClick={toggleLike} />
                      ) : (
                        <HeartButton like={like} onClick={toggleLike} />
                      )}
                      <div style={{fontWeight: 500, marginLeft: '5px'}}>
                        {curationDetail.like_cnt}
                      </div>
                  </LikeIconBox>
                </IconView>
                <View>
                  <Writer style={{textAlign: "right"}} onClick={() => {otherUserData(curationDetail.writer_email)}}>{curationDetail.nickname}</Writer>
                  <p style={{textAlign: "right"}}>{curationDetail.created.slice(0, 10).replace(/-/gi, '.')} 작성</p>
                  <ButtonWrapper>
                    {myEmail === curationDetail.writer_email ? <DeleteButton onClick={delCuration}>삭제하기</DeleteButton> : <></>}
                    {myEmail === curationDetail.writer_email ? <UpdateButton onClick={() => {navigate(`/admin/curation/${params.id}`)}}>수정하기</UpdateButton> : <></>}
                  </ButtonWrapper>
                  {myEmail !== curationDetail.writer_email ? <Button onClick={()=>{following(curationDetail.writer_email)}}>{curationDetail.writer_is_followed ? 
                  <Text >팔로우 취소</Text>:
                  <Text >+ 팔로잉</Text>}</Button> : <></>}
                </View>
              </InfoBox>
            </TitleBox>
            <ButtonDiv>
              <BackToList onClick={() => { navigate(-1) }}>&#60; Back To List</BackToList>
              <GotoMap onClick={() => {
                 navigate('/map?page=1');
                 }}>
                  &#60; Go To Map
              </GotoMap>
            </ButtonDiv>
            
          </View>
          <ContentBox dangerouslySetInnerHTML={markup()}>
          </ContentBox>
          <ImgBox>
            <Image src={curationDetail.map_image} 
            // style={{ width: width, height: width * (mapImageSize.height / mapImageSize.width) }}
            />
            <Image src={curationDetail.rep_pic}
              // style={{ width: width, height: width * (reppicSize.height / reppicSize.width) }}
              />
          </ImgBox>
          {
            curatedStory.map(data =>
              <Storys {...data} refresh={refresh} setRefresh={setRefresh} />
            )
          }
        </View>
        <CurationPlusButton />
      </Wrapper>
    </>
  )
}

export const Storys = ({
    created,
    hashtags, 
    like_story,
    nickname, 
    place_address, 
    place_category, 
    place_name, 
    preview,
    profile_image,
    story_id, story_review,
    writer_email, 
    writer_is_followed, 
    refresh, 
    setRefresh
    }) => {
  const [like, setLike] = useState(false);
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const request = Request(navigate);
  const myEmail = localStorage.getItem('email');

  const handleLike = async () => {
    const response_like = await request.post(`/stories/${story_id}/story_like/`);
    setLike(!like);
  }

  const following = async (email) => {
    const response = await request.post('/mypage/follow/',
      {
        targetEmail: email
      });
    if(writer_is_followed) {
      writer_is_followed = !writer_is_followed;
    }
    if(response.data.status == 'fail') alert(response.data.message);
    setRefresh(!refresh);
  }

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

  useEffect(()=>{
    setLike(true);
    setLike(like_story);
  }, [])

  return (
    <StorySection>
      <StoryInfoBox>
        <StoryTitleBox>
          <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose}/>
            <StoryPlaceName style={{marginRight:'30px'}}>{place_name}</StoryPlaceName>
            <StoryProfileInfoBox>
              <StoryProfileImage src={`${profile_image}`} onClick={() => {otherUserData(writer_email)}}/>
              <View>
                <Writer style={{fontWeight:600, textAlign:"right"}} onClick={() => {otherUserData(writer_email)}}>{nickname}</Writer>
                <Text style={{fontWeight:600}}>{created.slice(0, 10).replace(/-/gi, '.')} 작성</Text>
              </View>
            </StoryProfileInfoBox>
            <Heart like={like} onClick={handleLike} />
            {
              myEmail !== writer_email ? <Button  style={{marginLeft: "30px"}} onClick={()=>{following(writer_email)}}>{writer_is_followed ? 
              <Text >팔로우 취소</Text>:
              <Text >+ 팔로잉</Text>}
              </Button> : <></>
            }
        </StoryTitleBox>
        <Text style={{ fontSize: 18, color: "#282828" }}>{place_address}</Text>
      </StoryInfoBox>
      <StoryContentBox>
        <Text style={{fontWeight:'bold', fontSize:'20px'}}>{place_category}</Text>
        <Text style={{color:"#000", fontWeight:600}}>{story_review}</Text>
        <Text style={{color:"#000", fontWeight:600}}>{preview}</Text>
        <Text>{hashtags}</Text>
      </StoryContentBox>
      <GotoStory onClick={() => { navigate(`/story/${story_id}`)}}>
        <Text>Go to Story</Text>
      </GotoStory>
    </StorySection>
  )
}
