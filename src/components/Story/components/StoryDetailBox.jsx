//
//스토리 content 영역
//
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoToMapImg from "../../../assets/img/GoToMapImg.png";
import LikeImg from "../../../assets/img/LikeImg.png";
// import htmlex from "../../../assets/html/SASM_word2html.html";
// import htmlex2 from "../../../assets/html/htmlex.html";
// import htmlex3 from "../../../assets/html/123.html";
// import htmlex from "../../../assets/html/practice2.html";
import htmlex from "../../../assets/html/practice3/practice3.html";
import axios from "axios";
import { useCookies } from "react-cookie";
const Wrapper = styled.div`
  /*박스*/
  background: white;
  width: 80%;
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
  // border: 1px solid yellow;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 0;
  margin: 0 30px 0 30px;
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
  // border: 1px solid yellow;
  display: flex;
  margin: 0 30px 0 30px;
  flex-direction: column;
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
  width: 800px;
  height: 50px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  padding: 10px;
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
  // border: 1px solid yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 0 30px;
  padding-top: 8px;
  width: auto;
  // overflow: hidden;
`;

const ImageBox = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 400px;
  display: flex;
`;
const Image = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 400px;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #d3d3d3;
  color: white;
`;
const ContentBox = styled.div`
  box-sizing: border-box;
  width: calc(100% - 420px);
  // border: 1px solid green;
  display: flex;
`;
const Content = styled.div`
  box-sizing: border-box;
  // border: 1px solid yellow;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  color: #797979;
  // display: flex;
  // display: inline-block; //텍스트 크기에 자동 맞춤
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
  const [storyHtml, setStoryHtml] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  const handlePageGoToMap = (id) => {
    //추후 키값으로 찾고, 뒤에 붙여서 이동 예정
    window.location.href = "/map" + id;
  };
  const infos = require("../data.json");
  // console.log("info", infos.Story);
  const info = infos.Story;
  const res = info.filter((i) => i.id == props.id);
  // console.log("res", res);
  const termsTitle = `${storyHtml}`;

  const markup = () => {
    return { __html: termsTitle };
  };

  const loadItem = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/stories/story_detail/${res[0].id}`,
        { id: res[0].id }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log("data", response.data);
      setStoryHtml(response.data.story_url);
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
            <Category>{res[0].category}</Category>
            <Options>{res[0].options}</Options>
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
            <MainTitle>{res[0].mainTitle}</MainTitle>
          </MainTitleBox>
          <StoreNameBox>
            <StoreName>{res[0].storeName}</StoreName>
            <LikeIconBox>
              <LikeButton>
                <img src={LikeImg} />
              </LikeButton>
            </LikeIconBox>
          </StoreNameBox>
        </MainTitleNStoreNameBox>

        <ImageNContentBox>
          {/* <ImageBox>
            <Image>
              <h3> image </h3>
            </Image>
          </ImageBox>
          <ContentBox>
            <Content>{res[0].content}</Content>
          </ContentBox> */}
          {/* <div
          dangerouslySetInnerHTML={{
            __html: "<div>Hello!</div>",
          }}
        ></div> */}

          <div dangerouslySetInnerHTML={markup()}></div>

          {/* <div>{storyHtml}</div> */}
        </ImageNContentBox>
      </Wrapper>
    </>
  );
};

export default StoryDetailBox;
