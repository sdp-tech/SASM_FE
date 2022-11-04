import { useState, useRef, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import Request from "../../../functions/common/Request";
import {
  AuthContent,
  InputWithLabel,
  ProfileButton,
  LeftAlignedLink,
} from "../../Auth/module";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Edit_profileimage from "../../../assets/img/Edit_profileimage.png";

const ChangeForm = (props) => {
  const navigate = useNavigate();

  const { state } = useLocation(); //placeholder 값 가져오기

  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  const onChangeImage = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(file);

    setInfo({
      ...info,
      profile_image: file,
    });
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      // console.log("이미지주소", reader.result);
    };
  };

  // 저장하기 버튼 클릭 -> 서버에 변경 요청
  const SaveInfo = async () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(info)) {
      if (key === "profile_image") {
        //파일의 경우 value 자체
        formData.append(`${key}`, value);
      } else {
        //문자열의 경우 변환
        formData.append(`${key}`, `${value}`);
      }
    }

    //fordata 확인용!!
    for (let key of formData.keys()) {
      console.log(key, "::", formData.get(key));
    }

    const response = await request.post("/users/me/", formData, {
      "Content-Type": "multipart/form-data",
    });
    if ("data" in response.data && "nickname " in response.data.data) {
      //nickname이 변경된 경우, localStorage에 저장
      localStorage.setItem("nickname", response.data.data.nickname);
    }
    alert("변경되었습니다.");
    navigate("/mypage");
  };
  return (
    <>
      <>
        <Section>
          <MyplaceSection>
            <ImageBox>
              <img
                src={imageUrl ? imageUrl : state.profile_image}
                alt="profile"
                height="180px"
                width="180px"
              ></img>
            </ImageBox>
            <AppStyle>
              <label htmlFor="ex_file">
                <div>
                  <img
                    src={Edit_profileimage}
                    alt="edit"
                    height="30px"
                    width="30px"
                  />
                </div>
              </label>
              <input
                type="file"
                id="ex_file"
                accept="image/*"
                onChange={onChangeImage}
              />
            </AppStyle>

            {/* <input
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={onChangeImage}
            ></input> */}
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
  border-radius: 100px;
  width: 180px;
  height: 180px;
  flex-direction: column;
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
const AppStyle = styled.div`
  position: absolute;
  width: 30px;
  margin-top: 140px;
  margin-left: 140px;
  z-index: 4;
  img {
    max-width: 30px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default ChangeForm;
