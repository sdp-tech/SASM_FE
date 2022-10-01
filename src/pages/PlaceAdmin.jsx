import { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import DaumPostcode from 'react-daum-postcode';
import {
    AuthContent,
    InputWithLabel,
    ProfileButton,
    LeftAlignedLink,
} from "../../src/components/Auth/module";
import { useNavigate } from "react-router-dom";

const PlaceAdmin = (props) => {
    const [info, setInfo] = useState([]);
    const [openPostcode, setOpenPostcode] = useState([]);
    const [address, setAddess] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const imgRef = useRef();
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const PlaceCategory = [
        { value: "식당 및 카페", name: "식당 및 카페" },
        { value: "전시 및 체험공간", name: "전시 및 체험공간" },
        { value: "제로웨이스트 샵", name: "제로웨이스트 샵" },
        { value: "도시 재생 및 친환경 건출물", name: "도시 재생 및 친환경 건출물" },
        { value: "복합 문화 공간", name: "복합 문화 공간" },
        { value: "녹색 공간", name: "녹색 공간" },
        { value: "그 외", name: "그 외" },
    ];
    const VeganCategory = [
        { value: "", name: "없음" },
        { value: "비건", name: "비건" },
        { value: "락토", name: "락토" },
        { value: "오보", name: "오보" },
        { value: "페스코", name: "페스코" },
        { value: "폴로", name: "폴로" },
        { value: "그 외", name: "그 외" },
    ];
    const BooleanChoice = [
        { value: null, name: "없음" },
        { value: "TRUE", name: "가능" },
        { value: "FALSE", name: "불가능" },
    ];
    const onChangeImage = async (e, image_type) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        // console.log(file);

        setInfo({
            ...info,
            [image_type]: file,
        });
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            // console.log("이미지주소", reader.result);
        };
    };
    const selectAddress = async (data) => {

        console.log("data!!!", info, data)

        // setInfo({
        //     // ...info,
        //     address: data.address,
        // });
        setAddess(data.address);
        setOpenPostcode(false);
    }
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            // setOpenPostcode(current => !current);
            setOpenPostcode(true);
        },

        // // 주소 선택 이벤트
        // selectAddress: async (data) => {

        //     setInfo({
        //         ...info,
        //         address: data.address,
        //     });
        //     setAddess(data.address);
        //     setOpenPostcode(false);

        // },
    };
    const SaveInfo = async () => {
        console.log(info)
        const formData = new FormData();

        for (let [key, value] of Object.entries(info)) {
            if (key === "rep_pic" || key === "placephoto1") {
                //파일의 경우 value 자체
                formData.append(`${key}`, value);
            } else {
                //문자열의 경우 변환
                formData.append(`${key}`, `${value}`);
            }
        }
        for (let key of formData.keys()) {
            console.log(key, "::", formData.get(key));
        }
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/users/me/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: (data, headers) => {
                        return data;
                    },
                }
            );
        } catch (err) {
            console.log("Error >>", err);
        }
    };
    const handleChange = (e, type) => {
        console.log(type);
        console.log(e.target.value);
        if (e.target.value == '') {
            setInfo({
                ...info,
                [type]: null,
            });
        }
        else {
            setInfo({
                ...info,
                [type]: e.target.value,
            });
        }
    };
    return (
        <form>
            <InfoBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="장소 이름"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                place_category: "식당 및 카페",
                                vegan_category: null,
                                tumblur_category: null,
                                reusable_con_category: null,
                                pet_category: null,
                                place_name: event.target.value,
                            });
                            console.log(info.place_name);
                        }}
                        label="장소이름"
                        name="place_name"
                    />
                </ValueBox>
                <ValueBox>
                    <p>장소 카테고리</p>
                    <select onChange={(event) => handleChange(event, 'place_category')}>
                        {PlaceCategory.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>비건 카테고리</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'vegan_category')}>
                        {VeganCategory.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>텀블러 할인(가능/불가능)</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'tumblur_category')}>
                        {BooleanChoice.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>용기내(가능/불가능)</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'reusable_con_category')}>
                        {BooleanChoice.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>반려동물 출입(가능/불가능)</p>
                    <select defaultValue="없음" onChange={(event) => handleChange(event, 'pet_category')}>
                        {BooleanChoice.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="월요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                mon_hours: event.target.value,
                            });
                        }}
                        label="월요일 영업시간"
                        name="mon_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="화요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                tues_hours: event.target.value,
                            });
                        }}
                        label="화요일 영업시간"
                        name="tues_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="수요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                wed_hours: event.target.value,
                            });
                        }}
                        label="수요일 영업시간"
                        name="wed_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="목요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                thurs_hours: event.target.value,
                            });
                        }}
                        label="목요일 영업시간"
                        name="thurs_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="금요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                fri_hours: event.target.value,
                            });
                        }}
                        label="금요일 영업시간"
                        name="fri_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="토요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                sat_hours: event.target.value,
                            });
                        }}
                        label="토요일 영업시간"
                        name="sat_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="일요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                sun_hours: event.target.value,
                            });
                        }}
                        label="일요일 영업시간"
                        name="sun_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="영업시간 기타 정보를 적어주세요"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                etc_hours: event.target.value,
                            });
                        }}
                        label="영업시간 기타"
                        name="etc_hours"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="예 : 맛 좋은 비건 샌드위치"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                place_review: event.target.value,
                            });
                        }}
                        label="장소한줄평"
                        name="place_review"
                    />
                </ValueBox>
                <ValueBox>
                    <div>
                        <button onClick={handle.clickButton}>주소</button>
                        {openPostcode &&
                            <DaumPostcode
                                onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                            />
                        }

                    </div>


                    <div> {address}</div>
                    {/* <InputWithLabel
                        placeholder="주소(도로명)"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                address: event.target.value,
                            });
                        }}
                        label="주소"
                        name="address"
                    /> */}
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="짧큐"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                short_cur: event.target.value,
                            });
                        }}
                        label="짧큐"
                        name="short_cur"
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="연락처"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                phone_num: event.target.value,
                            });
                        }}
                        label="연락처"
                        name="phone_num"
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl}
                            alt="장소 대표 사진"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept="image/*"
                        onChange={(event) => onChangeImage(event, 'rep_pic')}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl}
                            alt="장소 사진 1"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept="image/*"
                        onChange={(event) => onChangeImage(event, 'placephoto1')}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl}
                            alt="장소 사진 2"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept="image/*"
                        onChange={(event) => onChangeImage(event, 'placephoto2')}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl}
                            alt="장소 사진 3"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept="image/*"
                        onChange={(event) => onChangeImage(event, 'placephoto3')}
                    />
                </ValueBox>
            </InfoBox>
            <ButtonBox>
                <ProfileButton onClick={SaveInfo}>저장하기</ProfileButton>
            </ButtonBox>
        </form>

    )
}
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  width: 100%;
  margin-top: 10%;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-color : tomato;
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
export default PlaceAdmin;