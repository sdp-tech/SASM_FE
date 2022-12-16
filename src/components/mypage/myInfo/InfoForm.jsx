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
  overflow: hidden;
  height: 100%;
  width: 100%
`;
const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Label = styled.div`
  width: 12vw;
  display: flex;
  align-items: center;
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
`
const Text = styled.div`
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: left;
  border: none;
  border-radius; 2px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
  padding: 2% 1vw;
`
const InfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  border-right: 2px #44ADF7 solid;
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
            <div style={{ width: '100%', height: '30%', display: 'flex', alignItems: 'center' }}>
              <ImageBox>
                <img
                  src={profile_image}
                  alt="profile"
                  height="180px"
                  width="180px"
                />
              </ImageBox>
            </div>
            <Grid container sx={{ height: '70%' }} >
              <Grid item xs={5} sm={5} md={5} lg={5}>
                <InfoContainer style={{paddingLeft:'10vw', paddingRight:'5vw'}}>
                  <LabelWrapper>
                    <Label>이메일</Label>
                    <Text>{email}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label>닉네임</Label>
                    <Text>{nickname}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label>생년월일</Label>
                    <Text>{birthdate}</Text>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label onClick={EditProfile} style={{fontSize: '0.75rem', cursor: 'pointer'}}>프로필 편집</Label>
                    <Label style={{fontSize: '0.75rem'}}>
                      <Link to='/auth/find/SetNewPassword' style={{color:'#000000', textDecoration: 'none'}}>비밀번호 변경</Link>
                    </Label>
                    <Label style={{fontSize: '0.75rem'}}>
                      <Link to='./feedback' style={{color:'#000000', textDecoration: 'none'}}>의견 보내기</Link>
                    </Label>
                  </LabelWrapper>
                </InfoContainer>
              </Grid>
              <Grid item xs={7} sm={7} md={7} lg={7}>
                <InfoContainer style={{paddingLeft:'5vw', paddingRight:'10vw'}}>
                  
                </InfoContainer>
              </Grid>
            </Grid>
          </Section>
        </>
      )}
    </>
  );
};

