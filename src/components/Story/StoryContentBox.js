//
//스토리 content 영역
//
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  /*박스*/
  background: white;
  width: 800px;
  // height: 800px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
`;

const Image = styled.div`
  width: 800px;
  height: 200px;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #d3d3d3;
  color: white;
  margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const MainTitleBox = styled.div`
  // border: 1px solid RED;
  width: 800px;
  height: 50px;
  font-size: 2.5rem;
  font-weight: 900;
  color: #000000;
  margin: 0 auto; /* 페이지 중앙 정렬 */
  display: flex;
`;

const MainTitle = styled.div`
  // border: 1px solid RED;
  width: 800px;
  height: 50px;
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  display: flex;
`;

const SubTitle = styled.div`
  padding-top: 1rem;
  width: 800px;
  height: 50px;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const Content = styled.div`
  padding-top: 1rem;
  width: 800px;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const ButtonDiv = styled.div`
  // border: 1px solid RED;
  height: 30px;
  width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 7px;
`;

// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  background-color: #fcf16e;
  padding: 0px 13px;
  font-size: 1rem;
  font-weight: 800;
  color: #000000;
  border-radius: 5px;
  border-color: #fcf16e;
  justify-content: flex-end;
`;

const MapButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "#000000",
  padding: "0 30px",
});

const StoryContentBox = (props) => {
  const handlePageGoToMap = (id) => {
    //추후 키값으로 찾고, 뒤에 붙여서 이동 예정
    window.location.href = "/map" + id;
  };

  return (
    <>
      <Wrapper>
        <Image>
          <h3> image </h3>
        </Image>
        <MainTitleBox>
          <MainTitle>{props.mainTitle}</MainTitle>
          <ButtonDiv>
            <MapButton onClick={handlePageGoToMap}>Go To Map</MapButton>
          </ButtonDiv>
        </MainTitleBox>

        <SubTitle>{props.storeName}</SubTitle>

        <Content>{props.content}</Content>
      </Wrapper>
    </>
  );
};

export default StoryContentBox;
