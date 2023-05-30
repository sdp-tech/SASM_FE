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
import { useLocation, useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: 100%
`;
const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Label = styled.div`
  width: 10vw;
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  border: 2px solid rgba(171, 239, 194, 0.1);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5vw;
  padding: 2% 0;
  font-size: 1rem;
  font-weight: 400;
  & + & {
    margin-left: 2vw;
  }
  @media screen and (max-width: 768px) {
    width: 30vw;
  }
`
const Text = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  justify-content: left;
  border: none;
  border-radius; 2px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
  padding: 2% 1vw;
  @media screen and (max-width: 768px) {
    width: 50vw;
  }
`
const InfoContainer = styled.div`
  height: calc(100vh - 64px - 0.3 * (100vh - 64px));
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding-left: 10vw;
  padding-right: 5vw;
  border-right: 2px #44ADF7 solid;
  @media screen and (max-width: 768px) {
    padding: 2vw;
    border: none;
    border-bottom : 2px #44ADF7 solid;
  }
`
const DetailContainer = styled.div`
  height: calc(100vh - 64px - 0.3 * (100vh - 64px));
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding-left: 5vw;
  padding-right: 10vw;
`
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  border: 1px black solid;
  margin-left: 10vw;
  background-image: url(${props => props.profile});
  background-size: cover;
  @media screen and (max-width: 768px) {
    width: 35vw;
    height: 35vw;
  }
`;

export default function InfoForm(props) {
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
    const response = await request.get("/mypage/me/", null, null);
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
            <div style={{ width: '100%', height: '30%', display: 'flex', alignItems: 'center' }}>
              <ImageBox profile={profile_image} />
            </div>
            <Grid container sx={{ height: '70%' }} >
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <InfoContainer>
                  <LabelWrapper>
                    <Label backgroundColor={"#AAEFC2"}>이메일</Label>
                    <Text>{email}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label backgroundColor={"#AAEFC2"}>닉네임</Label>
                    <Text>{nickname}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label backgroundColor={"#AAEFC2"}>생년월일</Label>
                    <Text>{birthdate}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label onClick={EditProfile} style={{ fontSize: '0.75rem', cursor: 'pointer' }}>프로필 편집</Label>
                    <Label style={{ fontSize: '0.75rem' }}>
                      <Link to='/mypage/changepassword' style={{ color: '#000000', textDecoration: 'none' }}>비밀번호 변경</Link>
                    </Label>
                    <Label style={{ fontSize: '0.75rem' }}>
                      <Link to='./feedback' style={{ color: '#000000', textDecoration: 'none' }}>의견 보내기</Link>
                    </Label>
                  </LabelWrapper>
                </InfoContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
              </Grid>
            </Grid>
          </Section>
        </>
      )}
    </>
  );
};

