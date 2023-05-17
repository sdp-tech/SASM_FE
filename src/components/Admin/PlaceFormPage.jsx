import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import DaumPostcode from 'react-daum-postcode';
import {
    InputWithLabel,
} from "../Auth/module";
import { useNavigate } from "react-router-dom";
import AdminButton from "../Admin/components/AdminButton";
import DetailList from "../Admin/components/DetailList";
import CheckRepetition from "../../functions/Auth/CheckRepetition";
import Request from "../../functions/common/Request";

const PlaceFormPage = (props) => {
    //장소 id 가져오기
    const id = props.id;
    //장소 이미지 가져오기
    const [imageUrl, setImageUrl] = useState([]);
    //저장 끝나면 map페이지로 이동
    const navigate = useNavigate();
    //정보 담기
    const [info, setInfo] = useState([]);
    //주소
    const [openPostcode, setOpenPostcode] = useState([]);
    const [address, setAddess] = useState([]);
    //쿠키
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기 // 쿠키에서 id 를 꺼내기
    //글자수 count를 위한 변수값
    const [countText, setCountText] = useState([0]);
    const [countEtcHours, setCountEtcHours] = useState([0]);
    const [countPlaceReview, setCountPlaceReview] = useState([0]);
    //유효성 검사를 위한 변수값
    const [message, setMessage] = useState([]);
    //snstype, snsurl을 위한 변수값
    const [countList, setCountList] = useState([0]);
    //sns수정을 위한 변수값
    const [snsData, setSnsData] = useState([0]);
    const [snsselect, setSnsselect] = useState([]);
    const request = new Request(cookies, localStorage, navigate);
    const openHourArray = ['mon_hours', 'tues_hours', 'wed_hours', 'thurs_hours', 'fri_hours', 'sat_hours', 'sun_hours'];
    //장소 카테고리
    const PlaceCategory = [
        { value: "식당 및 카페", name: "식당 및 카페" },
        { value: "전시 및 체험공간", name: "전시 및 체험공간" },
        { value: "제로웨이스트 샵", name: "제로웨이스트 샵" },
        { value: "도시 재생 및 친환경 건축물", name: "도시 재생 및 친환경 건축물" },
        { value: "복합 문화 공간", name: "복합 문화 공간" },
        { value: "녹색 공간", name: "녹색 공간" },
        { value: "그 외", name: "그 외" },
    ];
    //비건 카테고리
    const VeganCategory = [
        { value: "", name: "없음" },
        { value: "비건", name: "비건" },
        { value: "락토", name: "락토" },
        { value: "오보", name: "오보" },
        { value: "페스코", name: "페스코" },
        { value: "폴로", name: "폴로" },
        { value: "그 외", name: "그 외" },
    ];
    //나머지 카테고리
    const BooleanChoice = [
        { value: "", name: "없음" },
        { value: true, name: "가능" },
        { value: false, name: "불가능" },
    ];
    //글자수 체크
    const checkLength = (num, length) => {
        if (length > num) {
            alert(num + "자 이상 작성할 수 없습니다")
        }
    }
    //text문자열에 check가 포함되는지 확인
    const checkInclude = (type, text, check) => {
        if (text)
            if (!text.includes(check)) {
                alert(type + " 표시는 " + check + " 로 해주세요");
                return 1;
            }
    }
    const checkOpenHours = (openHours) => {
        if (openHours.includes("~"))
            if (!openHours.includes(" ~ "))
                alert("영업시간의 ~ 앞 뒤로 빈칸을 넣어주세요");
        if (openHours.includes("휴무"))
            if (openHours.includes("정기휴무"))
                alert("가게가 쉬는 날은 휴무라고 적어주세요");
    }
    //장소 중복 체크
    const CheckPlaceRepetition = async () => {
        const response = await request.get("/sdp_admin/places/check_name_overlap/", {
            'place_name': info['place_name'],
        }, null);
        if (response.data['data']['overlap'] === true) {
            alert('이미 존재하는 장소입니다');
        }
        else {
            alert('존재하지 않는 장소입니다');
        }
    };
    //DetailList에서 snstype이 변경되었을 때
    const getSnstype = (a, b) => {
        console.log(a, b);
        //직접 입력을 선택한 경우
        if (b == "0") {
            setSnsData({
                ...snsData,
                [a]: {
                    ...snsData[a],
                    ['snstype']: b,
                    ['snstype_name']: "직접 입력",
                },
            })
        }
        //선택했을 때
        else if (Number.isInteger(Number(b)) && Number(b) != 0) {
            setSnsData({
                ...snsData,
                [a]: {
                    ...snsData[a],
                    ['snstype']: b,
                    ['snstype_name']: snsselect[b - 1]['name'],
                },
            })
            //입력하는 경우
        } else {
            setSnsData({
                ...snsData,
                [a]: {
                    ...snsData[a],
                    ['snstype_name']: b,
                },
            })
        }
    }
    //DetailList에서 snsurl이 변경되었을 때
    const getSnsurl = (a, b) => {
        console.log(a, b);
        setSnsData({
            ...snsData,
            [a]: {
                ...snsData[a],
                ['url']: b
            },
        })
    }
    //snsurl&type 추가
    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
        setSnsData({
            ...snsData,
            [counter]: {
                ...snsData[counter],
                ['url']: "",
                ['snstype']: 0,
            },
        })
    }
    //snsurl&type 삭제
    const onDeleteDetailDiv = () => {
        let countArr = [...countList]
        countArr.pop()
        setCountList(countArr)
        snsData.pop()
    }
    //이미지 변경 시
    const onChangeImage = async (e, image_type) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        let result = 0;
        //info 배열에 파일 자체 담기
        setInfo({
            ...info,
            [image_type]: file,
        });
        reader.readAsDataURL(file);
        //읽어서 url 따로 저장하기
        reader.onloadend = () => {
            setImageUrl({
                ...imageUrl,
                [image_type]: reader.result,
            })
        };
        return result;
    };
    //주소 관련 함수
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: async (data) => {
            setAddess(data.address);
            setOpenPostcode(false);
        },
    };
    //select 함수
    const handleChange = (e, type) => {
        console.log(type);
        console.log(e.target.value);
        //없음 선택 시 null 값 입력 - 나중에 백에서 처리
        if (e.target.value === '') {
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
    //place update 기능을 위해 장소 load
    const loadPlace = async () => {
        if (!id) {
            return;
        }
        const response = await request.get(`/sdp_admin/places/${id}`, null, null);
        setInfo(response.data.data);
        setAddess(response.data.data['address']);
        imageUrl['rep_pic'] = response.data.data['rep_pic'];
    };
    //place update 기능을 위해 장소 이미지 load
    const loadPlacePhoto = async () => {
        if (!id) {
            return;
        }
        const resphoto = await request.get(`/sdp_admin/placephoto/${id}`, null, null);
        setImageUrl({
            ...imageUrl,
            'placephoto1': resphoto.data.data[0]['image'],
            'placephoto2': resphoto.data.data[1]['image'],
            'placephoto3': resphoto.data.data[2]['image'],
        });
    };
    //snsurl load 하기
    const loadSnsUrl = async () => {
        if (!id) {
            return;
        }
        const ressnsurl = await request.get(`/sdp_admin/snsurl/${id}`, null, null);
        console.log(ressnsurl.data.data);
        if (ressnsurl.data.data.length !== 0) {
            setSnsData(ressnsurl.data.data);
        }
        //몇개를 생성할 지 정해주기 위해
        let newCountArr = [];
        for (var i = 0; i < ressnsurl.data.data.length; i++) {
            newCountArr.push(i);
        }
        setCountList(newCountArr);
    };
    //select box를 위해 snstype 불러오기
    const loadSns = async () => {
        const response = await request.get(`/sdp_admin/snstypes/`, null, null);
        setSnsselect(response.data.data);
    };
    const SaveInfo = async () => {
        let cnt = 0;
        if (checkInclude('장소한줄평', info['place_review'], '"')
            || checkInclude('연락처', info['phone_num'], '-')) {
            return;
        }
        for (var i = 0; i < openHourArray.length; i++) {
            checkOpenHours(info[openHourArray[i]]);
        }
        info['longitude'] = 0;
        info['latitude'] = 0;
        info['address'] = address;
        info['snscount'] = countList.length;
        if (id) {
            info['id'] = id;
        }
        const formData = new FormData();
        if (address.length > 0) {
            cnt++;
        }
        //snsdata 
        for (var i = 0; i < countList.length; i++) {
            formData.append(i, [snsData[i]['snstype'], snsData[i]['snstype_name'], snsData[i]['url']]);
        }
        //info
        console.log(info);
        for (let [key, value] of Object.entries(info)) {
            if (key === "rep_pic" || key === "placephoto1"
                || key === "placephoto2" || key === "placephoto3") {
                //파일의 경우 value 자체
                formData.append(`${key}`, value);
                cnt++;
            }
            else if (key === 'etc_hours' || key === 'address'
                || key === 'longitude' || key === 'latitude' || key === 'snscount') {
                formData.append(`${key}`, `${value}`);
            } else {
                //문자열의 경우 변환
                formData.append(`${key}`, `${value}`);
                cnt++;
            }
        }
        if (!id && cnt < 21) {
            alert('입력하지 않은 값이 있습니다');
            return;
        } else if (id && cnt < 18) {
            alert('입력하지 않은 값이 있습니다');
            return;
        }
        //formdata 최종 확인
        for (let key of formData.keys()) {
            console.log(key, "::", formData.get(key));
        }
        try {
            if (!id) {
                const response = await request.post("/sdp_admin/places/save_place/", formData, { "Content-Type": "multipart/form-data" });
                console.log(response);
            }
            else {
                console.log(formData);
                const response = await request.put("/sdp_admin/places/update_place/", formData, { "Content-Type": "multipart/form-data" });
                console.log(response);
            }
            alert('장소 생성 성공');
            navigate("/map?page=1");
        }
        catch (err) {
            console.log("Error >>", err.response.data.message);
            alert("장소 생성 실패", err.response.data.message);
        }
    };
    useEffect(async () => {
        setInfo({
            ...info,
            category: "식당 및 카페",
            reusable_con_category: "null",
            pet_category: "null",
            vegan_category: "null",
            tumblur_category: "null",
        })
        await loadPlace();
        await loadPlacePhoto();
        await loadSnsUrl();
        await loadSns();
    }, []);
    return (
        <form>
            <InfoBox>
                <ValueBox>
                    <InputWithLabel
                        style={{ width: "95%" }}
                        placeholder="장소 이름"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                place_name: event.target.value,
                            });
                        }}
                        label="장소이름"
                        name="place_name"
                        value={info['place_name']}
                    />
                    <AdminButton
                        style={{ height: "70%", marginTop: "auto", marginBotton: "auto" }}
                        onClick={CheckPlaceRepetition}
                    >
                        중복확인
                    </AdminButton>
                </ValueBox>
                <ValueBox>
                    <p>장소 카테고리</p>
                    <select onChange={(event) => handleChange(event, 'category')}>
                        {PlaceCategory.map((option) => (
                            <option
                                value={option.value}
                                selected={option.value === info['category']}
                            >{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>비건 카테고리</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'vegan_category')}>
                        {VeganCategory.map((option) => (
                            <option
                                value={option.value}
                                selected={option.value === info['vegan_category']}
                            >{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>텀블러 할인(가능/불가능)</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'tumblur_category')}>
                        {BooleanChoice.map((option) => (
                            <option
                                value={option.value}
                                selected={option.value === info['tumblur_category']}
                            >{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>용기내(가능/불가능)</p>
                    <select defaultValue='없음' onChange={(event) => handleChange(event, 'reusable_con_category')}>
                        {BooleanChoice.map((option) => (
                            <option
                                value={option.value}
                                selected={option.value === info['reusable_con_category']}
                            >{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <ValueBox>
                    <p>반려동물 출입(가능/불가능)</p>
                    <select defaultValue="없음" onChange={(event) => handleChange(event, 'pet_category')}>
                        {BooleanChoice.map((option) => (
                            <option
                                value={option.value}
                                selected={option.value === info['pet_category']}
                            >{option.name}</option>
                        ))}
                    </select>
                </ValueBox>
                <p>영업시간 사이의 간격은 '~'로 표시해주세요</p>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="월요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                mon_hours: event.target.value,
                            });
                        }}
                        label="월요일 영업시간"
                        name="mon_hours"
                        value={info['mon_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="화요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                tues_hours: event.target.value,
                            });
                        }}
                        label="화요일 영업시간"
                        name="tues_hours"
                        value={info['tues_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="수요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                wed_hours: event.target.value,
                            });
                        }}
                        label="수요일 영업시간"
                        name="wed_hours"
                        value={info['wed_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="목요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                thurs_hours: event.target.value,
                            });
                        }}
                        label="목요일 영업시간"
                        name="thurs_hours"
                        value={info['thurs_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="금요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                fri_hours: event.target.value,
                            });
                        }}
                        label="금요일 영업시간"
                        name="fri_hours"
                        value={info['fri_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="토요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                sat_hours: event.target.value,
                            });
                        }}
                        label="토요일 영업시간"
                        name="sat_hours"
                        value={info['sat_hours']}
                    />
                </ValueBox>
                <ValueBox>
                    <textarea
                        maxLength={100}
                        style={{ width: "100%" }}
                        placeholder="일요일 영업시간"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                sun_hours: event.target.value,
                            });
                        }}
                        label="일요일 영업시간"
                        name="sun_hours"
                        value={info['sun_hours']}
                    />
                </ValueBox>
                <p>영업시간 기타 {countEtcHours} / 500 (빈칸 가능)</p>
                <ValueBox>
                    <textarea
                        style={{ width: "100%", height: "200px" }}
                        maxLength={500}
                        placeholder="영업시간 기타 정보를 적어주세요"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                etc_hours: event.target.value,
                            });
                            setCountEtcHours(event.target.value.length);
                            checkLength(500, event.target.value.length);
                        }}
                        label="영업시간 기타"
                        name="etc_hours"
                        value={info['etc_hours']}
                    />
                </ValueBox>
                <p>장소 한줄평 {countPlaceReview} / 200 (쌍따옴표 " 포함 필수)</p>
                <ValueBox>
                    <textarea
                        style={{ width: "100%", height: "100px" }}
                        maxLength={200}
                        placeholder='예 : "맛 좋은 비건 샌드위치"'
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                place_review: event.target.value,
                            });
                            setCountPlaceReview(event.target.value.length);
                            checkLength(200, event.target.value.length);
                        }}
                        label="장소한줄평"
                        name="place_review"
                        value={info['place_review']}
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder={"아래 창에서 주소를 선택하세요"}
                        label="주소"
                        name="address"
                        disabled={true}
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                address: event.target.value,
                            });
                        }}
                        value={address}
                    />
                </ValueBox>
                <ValueBox>
                    <DaumPostcode
                        onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />
                </ValueBox>
                <p>짧큐 {countText} / 500</p>
                <ValueBox>
                    <textarea
                        maxLength={500}
                        style={{ width: "100%", height: "200px" }}
                        placeholder="짧큐"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                short_cur: event.target.value,
                            });
                            setCountText(event.target.value.length);
                            checkLength(500, event.target.value.length);
                        }}
                        label="짧큐"
                        name="short_cur"
                        value={info['short_cur']}
                    />
                </ValueBox>
                <ValueBox>
                    <InputWithLabel
                        placeholder="ex)02-0000-0000"
                        onChange={(event) => {
                            setInfo({
                                ...info,
                                phone_num: event.target.value,
                            });
                        }}
                        label="연락처"
                        name="phone_num"
                        value={info['phone_num']}
                    />
                </ValueBox>
                <hr></hr>
                <div>
                    <button type="button" onClick={onAddDetailDiv}>
                        추가
                    </button>
                    <button type="button" onClick={onDeleteDetailDiv}>
                        삭제
                    </button>
                </div>
                <DetailList
                    countList={countList}
                    snsselect={snsselect}
                    snsData={snsData}
                    getSnstype={getSnstype}
                    getSnsurl={getSnsurl}
                />
                <br></br>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl['rep_pic']}
                            alt="장소 대표 사진"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept=".jpeg, .jpg, .png"
                        onChange={(event) => {
                            onChangeImage(event, 'rep_pic');
                        }}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl['placephoto1']}
                            alt="장소 사진 1"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept=".jpeg, .jpg, .png"
                        onChange={(event) => onChangeImage(event, 'placephoto1')}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl['placephoto2']}
                            alt="장소 사진 2"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept=".jpeg, .jpg, .png"
                        onChange={(event) => onChangeImage(event, 'placephoto2')}
                    />
                </ValueBox>
                <ValueBox>
                    <ImageBox>
                        <img
                            src={imageUrl['placephoto3']}
                            alt="장소 사진 3"
                            height="180px"
                            width="180px"
                        ></img>
                    </ImageBox>
                    <input
                        type="file"
                        id="ex_file"
                        accept=".jpeg, .jpg, .png"
                        onChange={(event) => onChangeImage(event, 'placephoto3')}
                    />
                </ValueBox>
            </InfoBox>
            <FooterSection>
                <AdminButton onClick={SaveInfo}>장소 저장</AdminButton>
            </FooterSection>
        </form>

    )
}
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  // overflow: hidden;
  // grid-area: story;
  height: 100%;
  justify-content: center;
  align-items: center;
  // background: black;
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
const Button = styled.div`
  background-color: rgba(84, 128, 229, 1);
  height: 100%;
  text-align: center;
  line-height: 3;
  border-radius: 4px;
  font-size: 16px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em;
  cursor: pointer;
  flex-grow: 0.5;
  margin-left: 1em;
`;

export default PlaceFormPage;
