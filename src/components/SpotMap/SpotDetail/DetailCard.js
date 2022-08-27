import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import axios from "axios";
const StyledCard = styled.section`
  width: 100%;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
  overflow: hidden;
`;
const TextBox = styled.div`
  font-size: 1em;
  color: black;
  min-width: 280px;
  // border: 1px solid yellow;
  margin: 0.7em 1.4em 0.7em 1.4em;
  // margin: 5em;
`;
const LikeBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  margin-top: -45px;
`;
const CategoryBox = styled.div`
  box-sizing: border-box;
  font-size: 1.3em;
  font-weight: 400;
  color: black;
  border-bottom: 1.3px solid #000000;
  // border: 1px solid red;
  display: flex;
  width: 90%;
  height: auto;
  justify-content: space-between;
`;

const ReviewBox = styled.div`
  height: auto;
  margin-top: 20px;
  padding: 0.017px;
  background: #cbced7;
  font-size: 1em;
`;
const AddressBox = styled.div`
  height: auto;
  width: 90%;
  margin-left: 4.5%;
`;

const PhotoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // height: 00px;
`;

const ShortCurBox = styled.div`
  height: auto;
  background: #ffffff;
`;
const Title = styled.p`
  color: #7c1d30;
  font-size: 2em;
  margin-top: -2px;
`;
// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  background: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  width: "30px",
  marginTop: "30px",
});
function DetailCard({
  key,
  MainImage,
  StoreName,
  Category,
  PlaceReview,
  ShortCur,
  Address,
  Mon,
  Tues,
  Wed,
  Thurs,
  Fri,
  Sat,
  Sun,
  Photo0,
  Photo1,
  Photo2,
}) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    // alert(`${props.id}`);
    const token = cookies.name; // 쿠키에서 id 를 꺼내기

    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8000/places/place_like/",
    //     { id: props.id },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );

    //   console.log("response", response);

    //   // setState({
    //   //   loading: true,
    //   //   ItemList: response.detailInfo.results,
    //   // });
    // } catch (err) {
    //   console.log("Error >>", err);
    // }

    //색상 채우기
    setLike(!like);
  };
  return (
    <StyledCard className="component component--item_card" key={key}>
      <ImgBox>
        <img
          src={MainImage}
          className="image--itemcard"
          alt="main image"
          width="600px"
          height="400px"
        />
      </ImgBox>
      <TextBox>
        <Title>{StoreName}</Title>
        <LikeBox>
          <CategoryBox>
            <p>{Category}</p>
          </CategoryBox>
          <LikeButton>
            <HeartButton like={like} onClick={toggleLike} />
          </LikeButton>
        </LikeBox>
        <ReviewBox>
          {/* PlaceReview */}
          <p>{PlaceReview}</p>
        </ReviewBox>
        <AddressBox>
          {/* address */}
          <p
            style={{
              fontSize: "1em",
              fontWeight: "500",
              color: "black",
              // marginTop: "-1em",
            }}
          >
            {Address}
          </p>
          {/* openingHours */}
          <div
            style={{
              fontSize: "1em",
              fontWeight: "500",
              color: "black",
              height: "100%",
              // marginTop: "-1em",
            }}
          >
            <p>영업시간 : </p>
            <p>월 : {Mon}</p>
            <p>화 : {Tues}</p>
            <p>수 : {Wed}</p>
            <p>목 : {Thurs}</p>
            <p>금 : {Fri}</p>
            <p>토 : {Sat}</p>
            <p>일 : {Sun}</p>
          </div>
        </AddressBox>
        <PhotoBox>
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo0}
            className="image--itemcard"
            alt="image1"
            width="600px"
            height="400px"
          />
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo1}
            className="image--itemcard"
            alt="image2"
            width="600px"
            height="400px"
          />
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo2}
            className="image--itemcard"
            alt="image3"
            width="600px"
            height="400px"
          />
        </PhotoBox>
        {/* images */}
        <ShortCurBox>
          {/* ShortCur */}
          <p>{ShortCur}</p>
        </ShortCurBox>
      </TextBox>
    </StyledCard>
  );
}

export default DetailCard;
