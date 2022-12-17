//
//스토리 content 영역
//
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

const Wrapper = styled.div`
  /*박스*/
  background: white;
  // width: 60%;
  width: 1200px;
  // height: 800px;
  // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
  // border: 1px solid red;
`;

const TopBox = styled.div`
  box-sizing: border-box;
  height: 60px;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  color: white;
  // margin: 0 auto; /* 페이지 중앙 정렬 */
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 0;
  margin: 0 30px 0 30px;
  // border: 1px solid yellow;
`;
const CategoryOptionBox = styled.div`
  display: flex;
  float: left;
`;
const Category = styled.div`
  height: 21px; //line-height와 맞춰서 중앙정렬
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  color: #000000;
  // border: 1px solid #000000;
  padding: 10px;
  display: inline-block; //텍스트 크기에 자동 맞춤
`;
const Options = styled.div`
  height: 21px;
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  color: #999999;
  border-left: 1px solid #000000;
  border-width: 3px;
  padding: 10px;
  display: inline-block;
`;

const MainTitleNStoreNameBox = styled.div`
  box-sizing: border-box;
  height: 150px;
  // font-size: 2.5rem;
  font-weight: 100;
  // color: white;
  display: flex;
  margin: 0 30px 0 30px;
  flex-direction: column;
  width: auto;
`;

const MainTitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const MainTitle = styled.div`
  // border: 1px solid RED;
  height: 50px;
  font-weight: 600;
  font-size: 40px;
  line-height: 44px;
  color: #000000;
  padding: 10px;
  display: inline-block; //텍스트 크기에 자동 맞춤
`;
const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  // border: 1px solid red;
`;

const StoreName = styled.div`
  width: 1000px;
  height: 50px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  // border: 1px solid red;
`;
const Tag = styled.div`
  width: auto;
  height: 50px;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 50px;
  padding: 10px;
  margin-left: 2%;
  // border: 1px solid red;
`;

const LikeIconBox = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px 10px 25px 10px;
  cursor: pointer;
`;
const ImageNContentBox = styled.div`
  box-sizing: border-box;
  // height: 400px;
  // font-size: 2.5rem;
  font-weight: 200;
  // color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 0 30px;
  padding-top: 8px;
  width: auto;
  flex-direction: column;
  // overflow: hidden;
  // border: 1px solid red;
  zoom: 1.6;
  p {
    font-family: "Dotum";
  }
`;

const ButtonDiv = styled.div`
  box-sizing: border-box;
  height: 60px;
  width: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  // margin: 7px;
`;

// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  background-color: #ffffff;
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;


const MapButton = styled(Button)({
  border: 0,
  borderRadius: "29px",
  boxShadow:
    "0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25), 0px 3.25367px 3.25367px rgba(0, 0, 0, 0.25)" /* 그림자 */,
  backgroundColor: "#3AE89480",
  fontWeight: "600",
  display: "flex",
  width: "137px",

  // justifyContent: "flex-end",
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

const backToList = styled.div`
  color: black;
  font-size: 20px;
`
const StoryDetailBox = (props) => {
  // const location = useLocation();
  // const pageCount = location.state?.pageCount;
  const id = props.id;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const handlePageGoToMap = (place_name) => {
    window.location.href = `/map/${place_name}`
  };

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
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
    console.log(id);
    const response_detail = await request.get("/stories/story_detail/", { id: id }, null);
    const response_comment = await request.get("/stories/comments/", { story: id }, null);
    const recommend_story = await request.get("/stories/recommend_story/", { id: id }, null);
    // console.log("data", response.data);.
    setData(response_detail.data.data[0]);
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
          <TopBox>
            <CategoryOptionBox>
              <Category>{data.category}</Category>
              <Options>{data.semi_category}</Options>
            </CategoryOptionBox>
          </TopBox>
          <MainTitleNStoreNameBox>
            <MainTitleBox>
              <MainTitle>{data.title}</MainTitle>
              <backToList
                onClick={() => {
                  navigate(`/story`);
                }}
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}>&#60; Back To List</backToList>
            </MainTitleBox>
            <StoreNameBox>
              <StoreName>
                {data.place_name}
                <LikeIconBox>
                  <LikeButton>
                    {data.story_like === "ok" ? (
                      <HeartButton like={!like} onClick={toggleLike} />
                    ) : (
                      <HeartButton like={like} onClick={toggleLike} />
                    )}
                  </LikeButton>
                </LikeIconBox>
                <Tag>{data.tag}</Tag>
              </StoreName>
              <ButtonDiv>
                <MapButton onClick={(e) => { handlePageGoToMap(data.place_name) }}>
                  <ButtonText>Go To Map</ButtonText>
                </MapButton>
              </ButtonDiv>
            </StoreNameBox>
          </MainTitleNStoreNameBox>

          <ImageNContentBox>
            <div>{data.story_review}</div>
            {/* <iframe src={data.story_url} width="100%" height="500px"></iframe> */}
            {/* <object data={data.story_url} width="1500vw" height="1000px" /> */}

            <div dangerouslySetInnerHTML={markup()}></div>
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
