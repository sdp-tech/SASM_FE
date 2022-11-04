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
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";

const InfoForm = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const [loading, setLoading] = useState(true);

  const refreshtoken = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  //   초기에 mypage data 불러오기
  const updateMypage = useCallback(async () => {
    setLoading(true);
    const response = await request.get("/users/me/", null, null);
    //   setPageCount(response.data.count);
    setInfo(response.data.data);
    setLoading(false);
  }, [token]);

  const { profile_image, nickname, birthdate, email } = info;

  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    updateMypage();
  }, [updateMypage]);

  const EditProfile = async () => {
    navigate("./change", { state: info });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Section>
            <MyplaceSection>
              <ImageBox>
                <img
                  src={profile_image}
                  alt="profile"
                  height="180px"
                  width="180px"
                />
              </ImageBox>
              <InfoBox>
                <Name>
                  <p>닉네임</p> <ValueBox>{nickname}</ValueBox>
                </Name>
                <Bday>
                  <p>생년월일</p> <ValueBox>{birthdate}</ValueBox>
                </Bday>
                <Email>
                  <p>이메일</p> <ValueBox>{email}</ValueBox>
                </Email>
              </InfoBox>
              <ButtonBox>
                <ProfileButton onClick={EditProfile}>
                  프로필 편집하기
                </ProfileButton>
                <LeftAlignedLink to="./feedback">의견 보내기</LeftAlignedLink>
              </ButtonBox>
            </MyplaceSection>
          </Section>
        </>
      )}
    </>
  );
};

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin-top: 5%;
`;

const MyplaceSection = styled.div`
  display: flex;

  flex-direction: column;
  width: 60%;
  height: 80%;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: 180px;
  height: 180px;
  overflow: hidden;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  margin-top: 5%;
`;
const ValueBox = styled.div`
  width: 400px;
`;
const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //   border: 1px solid red;
  font-size: 1.3em;
  font-weight: 600;
`;

const Bday = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //   border: 1px solid red;
  font-size: 1.3em;
  font-weight: 600;
`;
const Email = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //   border: 1px solid red;
  font-size: 1.3em;
  font-weight: 600;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  width: 100%;
  margin-top: 10%;
`;

export default InfoForm;
