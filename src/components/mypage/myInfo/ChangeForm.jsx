import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
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

const ChangeForm = (props) => {
  const navigate = useNavigate();

  const { state } = useLocation(); //placeholer 값 가져오기

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
          <MyplaceSection>
            <ImageBox>
              <img src={state.profile_img_url} />
            </ImageBox>
            <form>
              <InfoBox>
                <Name>
                  <p>닉네임</p>

                  <ValueBox>
                    <InputWithLabel
                      placeholder={state.nickname}
                      onChange={(event) => {
                        setInfo({
                          ...info,
                          nickname: event.target.value,
                        });
                      }}
                      name="nickname"
                    />
                  </ValueBox>
                </Name>
                <Bday>
                  <p>생년월일</p>
                  <ValueBox>
                    <InputWithLabel
                      placeholder={state.birthdate}
                      onChange={(event) => {
                        setInfo({
                          ...info,
                          birthdate: event.target.value,
                        });
                      }}
                      name="birthdate"
                    />
                  </ValueBox>
                </Bday>
                <Email>
                  <p>이메일</p>
                  <ValueBox>
                    <InputWithLabel
                      placeholder={state.email}
                      onChange={(event) => {
                        setInfo({
                          ...info,
                          email: event.target.value,
                        });
                      }}
                      name="email"
                    />
                  </ValueBox>
                </Email>
              </InfoBox>
            </form>
            <ButtonBox>
              <ProfileButton onClick={SaveInfo}>저장하기</ProfileButton>
              <LeftAlignedLink to="./feedback">의견 보내기</LeftAlignedLink>
            </ButtonBox>
          </MyplaceSection>
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

const MyplaceSection = styled.div`
  display: flex;
  //   justify-content: center;
  //   align-items: center;
  flex-direction: column;
  width: 60%;
  height: 80%;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 100px;
  width: 180px;
  height: 180px;
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
  display: flex;
  width: 400px;
`;
const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.3em;
  font-weight: 600;
`;

const Bday = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.3em;
  font-weight: 600;
`;
const Email = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

export default ChangeForm;
