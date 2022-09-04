//
//스토리 content 영역
//
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoToMapImg from "../../../assets/img/GoToMapImg.png";
import LikeImg from "../../../assets/img/LikeImg.png";
import htmlex from "../../../assets/html/practice3/practice3.html";
import axios from "axios";
import { useCookies } from "react-cookie";
import HeartButton from "../../common/Heart";

const Wrapper = styled.div`
  /*박스*/
  background: white;
  width: 80%;
  // height: 800px;
  // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
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
  font-size: 2.5rem;
  font-weight: 100;
  color: white;
  display: flex;
  margin: 0 30px 0 30px;
  flex-direction: column;
  width: auto;
`;

const MainTitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
`;
const MainTitle = styled.div`
  // border: 1px solid RED;
  height: 50px;
  font-weight: 400;
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
  line-height: 50px;
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
  padding: 10px;
  cursor: pointer;
`;
const ImageNContentBox = styled.div`
  box-sizing: border-box;
  // height: 400px;
  // font-size: 2.5rem;
  // font-weight: 100;
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
  borderRadius: "15px",
  // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  boxShadow:
    "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)" /* 그림자 */,
  color: "#5480E5",
  display: "flex",
  // justifyContent: "flex-end",
});

const ButtonImg = styled.div`
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  display: flex;
  margin: 2px 4px 2px 2px;
`;
const ButtonText = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 2px 4px 2px 3px;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
});

const StoryDetailBox = (props) => {
  const id = props.id;
  const [data, setData] = useState([]);
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  const handlePageGoToMap = (id) => {
    //추후 키값으로 찾고, 뒤에 붙여서 이동 예정
    window.location.href = "/map" + id;
  };

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/stories/story_like/",
          { id: data.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("response", response);
      } catch (err) {
        console.log("Error >>", err);
      }

      //색상 채우기
      setLike(!like);
    }
  };

  const markup = () => {
    return { __html: `${data.story_url}` };
  };

  const loadItem = async () => {
    //토큰 만료 or 없을 경우
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/stories/story_detail/`,
        {
          params: {
            id: id,
          },

          headers: {
            Authorization: headerValue,
          },
        }
      );
      console.log("data", response.data);
      setData(response.data[0]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <>
      <Wrapper>
        <TopBox>
          <CategoryOptionBox>
            <Category>{data.category}</Category>
            <Options>{data.semi_category}</Options>
          </CategoryOptionBox>
          <ButtonDiv>
            <MapButton onClick={handlePageGoToMap}>
              <ButtonImg>
                <img src={GoToMapImg} />
              </ButtonImg>
              <ButtonText>Go To Map</ButtonText>
            </MapButton>
          </ButtonDiv>
        </TopBox>
        <MainTitleNStoreNameBox>
          <MainTitleBox>
            <MainTitle>{data.title}</MainTitle>
          </MainTitleBox>

          <StoreNameBox>
            <StoreName>
              {data.place_name}
              <Tag>{data.tag}</Tag>
            </StoreName>
            <LikeIconBox>
              <LikeButton>
                {data.story_like === "ok" ? (
                  <HeartButton like={!like} onClick={toggleLike} />
                ) : (
                  <HeartButton like={like} onClick={toggleLike} />
                )}
              </LikeButton>
            </LikeIconBox>
          </StoreNameBox>
        </MainTitleNStoreNameBox>

        <ImageNContentBox>
          <div>{data.story_review}</div>
          <iframe src={data.story_url} width="100%" height="500px"></iframe>
          {/* <object data={data.story_url} width="1500vw" height="1000px" /> */}

          {/* <div dangerouslySetInnerHTML={markup()}></div> */}
        </ImageNContentBox>
      </Wrapper>
    </>
  );
};

export default StoryDetailBox;
