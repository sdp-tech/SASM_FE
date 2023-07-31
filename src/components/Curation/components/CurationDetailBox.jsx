import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react'
// import { HomeStackParams } from '../../pages/Home'
import Request from "../../../functions/common/Request";
import { useCookies } from "react-cookie";
// import CardView from '../../common/CardView'
// import { CurationPlusButton } from './CurationHome'
import Heart from '../../common/Heart'
import styled from "styled-components";

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
const StoryInfoBox = styled.div`
  position: relative;
`
const GotoStory = styled.button`
  background-color: #75E59B;
  border-radius: 5px;
  padding: 2px 8px;
  margin-left: 25px;
  align-items: center;
  cursor: pointer;
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
  const request = new Request(cookies, localStorage, navigate);
  const [curatedStory, setCuratedStory] = useState([]);
  const [curationDetail, setCurationDetail] = useState({
    contents: '',
    created: '',
    like_curation: false,
    map_image: '',
    rep_pic: '',
    title: '',
    nickname: '',
    profile_image: '',
    writer_email: '',
    writer_is_verified: false,
  });
  const [reppicSize, setReppicSize] = useState({
    width: 1, height: 1
  })
  const [mapImageSize, setMapImageSize] = useState({
    width: 1, height: 1
  })
  const getCurationDetail = async () => {
    const response_detail = await request.get(`/curations/curation_detail/${params.id}/`);
    setCurationDetail(response_detail.data.data);
    // Image.getSize(response_detail.data.data[0].rep_pic, (width, height) => { setReppicSize({ width: width, height: height }) });
    // Image.getSize(response_detail.data.data[0].map_image, (width, height) => { setMapImageSize({ width: width, height: height }) })
  }
  const getCurationStoryDetail = async () => {
    const reponse_story_detail = await request.get(`/curations/curated_story_detail/${params.id}/`);
    setCuratedStory(reponse_story_detail.data.data);
  }

  useEffect(() => {
    getCurationDetail();
    getCurationStoryDetail();
  }, [])

  return (
    <>
      <Wrapper>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <View style={{ position: 'relative' }}>
            <TitleBox>
              <Title>{curationDetail.title}</Title>
              <InfoBox>
                <Image src={ curationDetail.profile_image } style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} />
                <View>
                  <p>{curationDetail.nickname}</p>
                  <p>{curationDetail.created.slice(0, 10).replace(/-/gi, '.')} 작성</p>
                </View>
              </InfoBox>
            </TitleBox>
            <ButtonDiv>
              <BackToList onClick={() => { navigate('/curation') }}>&#60; Back To List</BackToList>
              <GotoMap onClick={() => { navigate('/map?page=1') }}>
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
              <Storys data={data} navigation={navigate} />
            )
          }
        </View>
        <CurationPlusButton />
      </Wrapper>
    </>
  )
}

export const Storys = (data) => {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = localStorage.getItem("accessTK");
  const request = new Request(cookies, localStorage);
  const navigate = useNavigate();
  const handleLike = async () => {
    const response_like = await request.post('/stories/story_like/', { id: data.data.story_id });
    setLike(!like);
  }

  useEffect(()=>{
    setLike(true);
    setLike(data.data.like_story);
  }, [])
  return (
    <StorySection>
      <StoryInfoBox>
        <TitleBox>
            <Text style={{marginRight:'20px'}}>{data.data.place_name}</Text>
            <InfoBox>
              <Image src={`${data.data.profile_image}`} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} />
              <View>
                <Text>{data.data.nickname}</Text>
                <Text>{data.data.created.slice(0, 10).replace(/-/gi, '.')} 작성</Text>
              </View>
            </InfoBox>
            <Heart like={like} onClick={handleLike} />
        </TitleBox>
        <Text style={{ fontSize: 16 }}>{data.data.place_address}</Text>
      </StoryInfoBox>
      {/* <Image src={`${data.data.rep_photos}`} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} /> */}
      <StoryContentBox>
        <Text style={{fontWeight:'bold', fontSize:'18px'}}>{data.data.place_category}</Text>
        <Text>{data.data.story_review}</Text>
        <Text>{data.data.preview}</Text>
        <Text>{data.data.hashtags}</Text>
      </StoryContentBox>
      <GotoStory onClick={() => { navigate(`/story/${data.data.story_id}`)}}>
        <Text>스토리 보러 가기</Text>
      </GotoStory>
    </StorySection>
  )
}
