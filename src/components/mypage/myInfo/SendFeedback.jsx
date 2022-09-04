import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import {
  AuthContent,
  InputWithLabel,
  ProfileButton,
  LeftAlignedLink,
} from "../../Auth/module";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const SendFeedback = (props) => {
  const navigate = useNavigate();

  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const [loading, setLoading] = useState(true);

  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  // 저장하기 버튼 클릭 -> 서버에 변경 요청
  const SaveInfo = async () => {
    // console.log(info.nickname);
    // console.log(info.birthdate);
    // console.log(info.email);
    console.log(info);

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/users/me/",

        { info: info },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.nickname) {
        //nickname이 변경된 경우, localStorage에 저장
        localStorage.setItem("nickname", response.data.nickname);
      }
    } catch (err) {
      console.log("Error >>", err);
    }
    navigate("/mypage");
  };
  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <>
        <Section>
          <FeedbackSection>
            <h1>의견 보내기</h1>
            <p style={{ color: "#DB524E" }}>
              * 문제를 설명하거나 아이디어를 공유해주세요.(필수)
            </p>
            <form>
              <FeedbackBox placeholder="ex> oo식당이 폐업했는데 아직 지도에 남아있습니다. 삭제부탁드립니다." />
            </form>
            <ButtonBox>
              <ProfileButton onClick={SaveInfo}>저장하기</ProfileButton>
              <LeftAlignedLink to="/auth/find">의견 보내기</LeftAlignedLink>
            </ButtonBox>
          </FeedbackSection>
        </Section>
      </>
      {/* )} */}
    </>
  );
};

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // overflow: hidden;
  //   height: 800px;
  width: 100%;
  margin-top: 5%;
`;

const FeedbackSection = styled.div`
  display: flex;
  //   justify-content: center;
  //   align-items: center;
  flex-direction: column;
  width: 40%;
  height: 80%;
  box-shadow: 0px 4px 4px rgba(84, 128, 229, 0.04),
    0px 4px 16px rgba(84, 128, 229, 0.08);
  border-radius: 8px;
  padding: 4%;
`;

const FeedbackBox = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 20vh;
  height: 100%;
  //   margin-top: 3%;
  border: none;
  background: none;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04),
    0px 4px 16px rgba(51, 51, 51, 0.08);
  border-radius: 4px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  width: 700px;
  margin-top: 10%;
`;

export default SendFeedback;
