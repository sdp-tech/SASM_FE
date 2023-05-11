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
  height: 50px;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 50px;
  color: #000000;
  padding-left: 10px;
  display: inline-block; //텍스트 크기에 자동 맞춤
  @media screen and (max-width: 768px) {
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
`;

const StoreName = styled.div`
  width: 100%;
  height: 50px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
   @media screen and (max-width: 768px) {
    height: auto;
    font-size: 2rem;
    flex-flow: row wrap;
   }
`;
const Tag = styled.div`
  width: auto;
  height: 50px;
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
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
  flex-direction: column;
  zoom: 1.6;
  @media screen and (max-width: 768px) {
    zoom: 1;
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

const MapButton = styled(Button)({
  border: 0,
  borderRadius: "29px",
  boxShadow:
    "0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25), 0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25)" /* 그림자 */,
  backgroundColor: "#3AE89480",
  fontWeight: "600",
  display: "flex",
  width: "137px",
  height: "30px"
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
`;
const StoryDetailBox = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const id = props.id; 
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const handlePageGoToMap = (place_name) => {
    navigate(`/map?page=1&place=${place_name}`, { state: { name : place_name }})
  };

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post("/stories/story_like/", { id: data.id }, null);
      console.log("response", response);

      //색상 채우기
      setLike(!like);
    }
  };

  const markup = () => {
    return { __html: `${data.html_content}` };
  };

  const loadItem = async () => {
    setLoading(true);
    const response_detail = await request.get(`/stories/story_detail/${id}/`);
    const response_comment = await request.get("/stories/comments/", { story: id }, null);
    const recommend_story = await request.get("/stories/recommend_story/", { id: id }, null);
    setData(response_detail.data.data);
    setComment(response_comment.data.data);
    setRecommend(recommend_story.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []);

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
              <BackToList
                onClick={() => { navigate(-1); }}>&#60; Back To List</BackToList>
            </ButtonDiv>
          </Mobile>
          <TopBox>
            <CategoryOptionBox>
              <Category>{data?.category}</Category>
              <Options>{data.semi_category}</Options>
            </CategoryOptionBox>
          </TopBox>
          <MainTitleNStoreNameBox>
            <MainTitleBox>
              <MainTitle>{data.title}</MainTitle>
              <Pc><BackToList onClick={() => { navigate(-1); }}>&#60; Back To List</BackToList></Pc>
              <Tablet><BackToList onClick={() => { navigate(-1); }}>&#60; Back To List</BackToList></Tablet>
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
          <FooterBox>
          </FooterBox>
        </Wrapper>
      )}
    </>
  );
};

export default StoryDetailBox;
