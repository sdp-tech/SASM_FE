import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react'
import Request from "../../../functions/common/Request";
import HeartButton from '../../common/Heart';
import { useCookies } from "react-cookie";
import Heart from '../../common/Heart'
import styled from "styled-components";
import AdminButton from "../../Admin/components/AdminButton";

const TitleBox = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  align-items: center;
  margin-top: 50px;
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
`
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  width: 19%;
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
  border: none;
  cursor: pointer;
  font-size: 1rem;
`
const StorySection = styled.div`
`
const Image = styled.img`
  width: 30%;
`
const View = styled.div`
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
    margin-top: 5px;
  }
`
const StoryContentBox = styled.div`
  padding-horizontal: 25px;
  margin-vertical: 20px;
`
const Wrapper = styled.div`
  background: white;
  width: 100vw;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0 10vw;
  position:relative;
`;

const BackToList = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
  }
  // margin: 20px auto;
`;
const ButtonDiv = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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
    font-size: 2rem;
    flex-flow: row wrap;
   }
`;
const ImgBox = styled.div`
   display: flex;
   flex-direction:column;
   item-align:center;
`
export default function CurationDetailBox() {
  const navigate = useNavigate();
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = localStorage.getItem("accessTK");
  const [like, setLike] = useState(false);
  const request = new Request(cookies, localStorage, navigate);
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
  const myEmail = localStorage.getItem('email');

  const rerender = () => {
    setRefresh(!refresh);
  }

    // 좋아요 클릭 이벤트
    const toggleLike = async () => {
      if (!token) {
        alert("로그인이 필요합니다.");
      } else {
        const response = await request.post(`/curations/curation_like/${params.id}/`);
        console.log("response", response);
        rerender();
      }
    };

  const getCurationDetail = async () => {
    const response_detail = await request.get(`/curations/curation_detail/${params.id}/`);
    setCurationDetail(response_detail.data.data);
    console.log(response_detail.data.data);
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

  return (
    <>
      <Wrapper>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <View style={{ position: 'relative' }}>
            <TitleBox>
              <Title>{curationDetail.title}</Title>
              <InfoBox>
                <IconView>
                  <Image src={ curationDetail.profile_image } style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} />
                  <LikeIconBox style={{marginTop: "40px"}}>
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
                  <p>{curationDetail.nickname}</p>
                  <p>{curationDetail.created.slice(0, 10).replace(/-/gi, '.')} 작성</p>
                  {myEmail !== curationDetail.writer_email ? <AdminButton onClick={()=>{following(curationDetail.writer_email)}}>{curationDetail.writer_is_followed ? 
                  <Text >팔로우 취소</Text>:
                  <Text >+ 팔로잉</Text>}</AdminButton> : <></>}
                </View>
              </InfoBox>
            </TitleBox>
            <ButtonDiv>
              <BackToList onClick={() => { navigate('/curation') }}>&#60; Back To List</BackToList>
              <GotoMap onClick={() => {
                 navigate('/map?page=1');
                 }}>
                <Text>맵페이지로 이동</Text>
              </GotoMap>
            </ButtonDiv>
            
          </View>
          <ImgBox>
            <Image src={curationDetail.map_image} 
            // style={{ width: width, height: width * (mapImageSize.height / mapImageSize.width) }}
            />
            <Image src={curationDetail.rep_pic}
              // style={{ width: width, height: width * (reppicSize.height / reppicSize.width) }}
              />
          </ImgBox>
          <ContentBox>
            <p>{curationDetail.contents}</p>
          </ContentBox>
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
  const params = useParams();
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = localStorage.getItem("accessTK");
  const request = new Request(cookies, localStorage);
  const navigate = useNavigate();
  const myEmail = localStorage.getItem('email');

  const handleLike = async () => {
    const response_like = await request.post(`/stories/${story_id}/story_like/`);
    setLike(!like);
  }

  const following = async (email) => {
    const response = await request.post('/mypage/follow/',
      {
        targetEmail: email
      })
      if(writer_is_followed) {
        writer_is_followed = !writer_is_followed;
      }
    if(response.data.status == 'fail') alert(response.data.message);
    setRefresh(!refresh);
  }

  useEffect(()=>{
    setLike(true);
    setLike(like_story);
  }, [])

  return (
    <StorySection>
      <StoryInfoBox>
        <TitleBox>
            <Text style={{marginRight:'20px'}}>{place_name}</Text>
            <InfoBox>
              <Image src={`${profile_image}`} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} />
              <View>
                <Text>{nickname}</Text>
                <Text>{created.slice(0, 10).replace(/-/gi, '.')} 작성</Text>
              </View>
            </InfoBox>
            <Heart like={like} onClick={handleLike} />
            {
              myEmail !== writer_email ? <AdminButton  style={{marginLeft: "30px"}} onClick={()=>{following(writer_email)}}>{writer_is_followed ? 
              <Text >팔로우 취소</Text>:
              <Text >+ 팔로잉</Text>}
              </AdminButton> : <></>
            }
        </TitleBox>
        <Text style={{ fontSize: 16 }}>{place_address}</Text>
      </StoryInfoBox>
      <StoryContentBox>
        <Text style={{fontWeight:'bold', fontSize:'18px'}}>{place_category}</Text>
        <Text>{story_review}</Text>
        <Text>{preview}</Text>
        <Text>{hashtags}</Text>
      </StoryContentBox>
      <GotoStory onClick={() => { navigate(`/story/${story_id}`)}}>
        <Text>Go to Story</Text>
      </GotoStory>
    </StorySection>
  )
}
