//
//스토리 content 영역
//
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import StoryContentBox from "./StoryContentBox";

// import Button from '@mui/material/Button';

const Wrapper = styled.div`
  /*박스*/
  background: white;
  width: 800px;
  // height: 800px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
`;

const StoryContent = () => {
  const infos = require("./data.json");
  console.log("info", infos.Story);
  const info = infos.Story;
  // const content = props.content;

  // const handlePageGoToMap = () => {
  //   //추후 키값으로 찾고, 뒤에 붙여서 이동 예정
  //   window.location.href = "/map";
  // };

  // const { mainTitle, setTitle } = useState();
  // const { storeName, setStoreName } = useState();
  // const { content, setContent } = useState();

  // const { info, setInfo } = useState("a");

  // const loadItem = async () => {
  //   // Json Data 불러오기
  //   await axios // axios를 이용해
  //     // json을 가져온다음
  //     .get("./Data.json")

  //     .then(({ data }) => {
  //       // console.log("data : ", data.Story);

  //       const { Story } = data;
  //       console.log("data", Story);

  //       const title = Story.map((data) => data.mainTitle);
  //       console.log("title", title);

  //       const storeName = Story.map((datas) => datas.storeName);
  //       console.log("storeName", storeName);

  //       // setTitle(title);
  //       // setStoreName(storeName);
  //       setInfo([...info, Story]);

  //       // setState({
  //       //   loading: true, // load되었으니 true,
  //       //   ItemList: data.Item // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
  //       // });
  //     })
  //     .catch((e) => {
  //       // json이 로드되지않은 시간엔
  //       console.error(e); // 에러표시

  //       // setState({
  //       //   loading: false // 이때는 load 가 false 유지
  //       // });
  //     });
  // };

  // // 렌더링 관리
  // useEffect(() => {
  //   loadItem();
  // }, []);
  // console.log("data", info);

  return (
    <>
      <Wrapper>
        {info &&
          info.map((data, index) => (
            <StoryContentBox
              key={index}
              id={data.id}
              mainTitle={data.mainTitle}
              storeName={data.storeName}
              content={data.content}
            />
          ))}
      </Wrapper>
    </>
  );
};

export default StoryContent;
