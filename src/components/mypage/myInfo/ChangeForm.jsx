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
    try {
      const response = await request.patch("/mypage/me/update/", formData, {
        "Content-Type": "multipart/form-data",
      });
      if ("data" in response.data) {
        if ("nickname" in response.data.data) {
          //nickname이 변경된 경우, localStorage에 저장
          console.log('changed');
          localStorage.setItem("nickname", response.data.data.nickname);
        }
      }
      alert("변경되었습니다.");
    }
    catch (err) {
      if (
        err.response.status == 400
      ) {
        alert("이미 사용 중인 닉네임입니다.");
      }
      else {
        alert("닉네임 변경 중 오류가 발생하였습니다.");
      }
    }
    navigate("/mypage");
  };
  return (
    <>
      <>
        <Section>
          <form style={{ width: '100%', height: '100%' }}>
            <div style={{ height: '30%', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <ImageBox profile={state.profile_image} />
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
              </div>
            </div>
            <Grid container sx={{ height: '70%' }} >
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <InfoContainer>
                  <LabelWrapper>
                    <Label>이메일</Label>
                    <Text value={state.email} readOnly />
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label>닉네임</Label>
                    <Text type="text" placeholder={state.nickname}
                      onKeyDown={(event) => {
                        if (event.code == "Space") {
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setInfo({
                          ...info,
                          nickname: event.target.value,
                        });
                      }}
                      name="nickname" />
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label>생년월일</Label>
                    <Text type="date"
                      max="9999-12-31"
                      defaultValue={state.birthdate}
                      onChange={(event) => {
                        setInfo({
                          ...info,
                          birthdate: event.target.value,
                        });
                      }}
                      name="birthdate" />
                  </LabelWrapper>
                  <LabelWrapper>
                    <Label style={{ opacity: "0" }}>저장하기</Label>
                    <Label onClick={SaveInfo} style={{ fontSize: '0.75rem', cursor: 'pointer' }}>저장하기</Label>
                    <Label style={{ opacity: "0" }}>저장하기</Label>
                  </LabelWrapper>
                </InfoContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <DetailContainer>

                </DetailContainer>
              </Grid>
            </Grid>
          </form>
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
  height:100%;
  width: 100%;
`;

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
const AppStyle = styled.div`
  position: absolute;
  width: 30px;
  z-index: 4;
  right:0;
  bottom:0;
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

const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Label = styled.div`
  width: 10vw;
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
  @media screen and (max-width: 768px) {
    width: 30vw;
  }
`
const Text = styled.input`
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
export default ChangeForm;
