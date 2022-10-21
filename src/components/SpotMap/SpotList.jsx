import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import SearchBar from "../common/SearchBar.js";
import nothingIcon from "../../assets/img/nothing.svg";
import Pagination from "../common/Pagination";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";

const SpotListSection = styled.div`
  // background-color: blue;
  position: relative;
  margin: 15px 0px 15px 15px;
  grid-area: spotlist;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const SearchFilterBar = styled.div`
  // background-color: red;
  width: 100%;
  min-height: 5%;
  border: 1px solid #99a0b0;
  box-sizing: border-box;
`;
const FilterOptions = styled.div`
  width: 100%;
  min-height: 30%;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
  display: flex;
`;
const CategoryTitle = styled.div`
  width: 30%;
  min-height: 30%;
  margin: 4.3% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;
const CategoryCheckBox = styled.div`
  width: 100%;
  min-height: 30%;
  // margin: 7% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CategoryLabel = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 5%;
  height: 14%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2%;
`;
const NothingSearched = styled.div`
  // background-color: yellow;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
const RecommendTitle = styled.div`
  width: 100%;
  min-height: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
`;
const SpotsWrapper = styled.div`
  // background-color: yellow;
  width: 100%;
  min-height: 30%;
  // height: 90%;
  overflow: auto;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

const SpotList = (props) => {
  const { latitude, longitude } = props.Location; //현재 위치
  const [item, setItem] = useState([]);
  const [pagecount, setPagecount] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const navigate = useNavigate();
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);

  // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const CATEGORY_LIST = [
    { id: 0, data: "식당 및 카페" },
    { id: 1, data: "전시 및 체험공간" },
    { id: 2, data: "제로웨이스트 샵" },
    { id: 3, data: "도시 재생 및 친환경 건축물" },
    { id: 4, data: "복합 문화 공간" },
    { id: 5, data: "녹색 공간" },
  ];

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle);
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // page가 변경될 때마다 page를 붙여서 api 요청하기
  useEffect(() => {
    handleSearchToggle();
    checkSasmAdmin(token, setLoading).then((result) => setIsSasmAdmin(result));
  }, [page]);

  //검색 요청 api url
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearchToggle(true);
    console.log(search, checkedList);
    setLoading(true);
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }
    let headerValue;
    if (token === null || undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }
    let searched;
    if (search === null || search === "") {
      //검색어 없을 경우 전체 리스트 반환
      searched = null;
    } else {
      //검색어 있는 경우
      searched = search;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/places/place_search/",
        {
          params: {
            left: latitude, //현재 위치
            right: longitude, //현재 위치
            page: newPage,
            search: searched,
            filter: checkedList,
          },

          headers: {
            Authorization: headerValue,
          },
        }
      );

      // console.log("response??", response);
      setItem(response.data.data.results);
      setPagecount(response.data.data.count);
      setLoading(false);
    } catch (err) {
      const refreshtoken = cookies.name; // 쿠키에서 id 를 꺼내기
      // 토큰이 만료된 경우
      if (
        err.response.data.message == "Given token not valid for any token type"
      ) {
        //만료된 토큰 : "Given token not valid for any token type"
        //없는 토큰 : "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."

        localStorage.removeItem("accessTK"); //기존 access token 삭제
        //refresh 토큰을 통해 access 토큰 재발급
        const response = await axios.post(
          "http://127.0.0.1:8000/users/token/refresh/",
          {
            refresh: refreshtoken,
          },
          {
            headers: {
              Authorization: "No Auth",
            },
          }
        );

        console.log("!!", response);

        localStorage.setItem("accessTK", response.data.access); //새로운 access token 따로 저장
      } else {
        console.log("Error >>", err);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SpotListSection>
          <SearchFilterBar>
            <SearchBar
              search={search}
              onChangeSearch={onChangeSearch}
              handleFilterToggle={handleFilterToggle}
              handleSearchToggle={handleSearchToggle}
              placeholder="지속가능한 장소를 검색해보세요!"
            />
          </SearchFilterBar>

          {filterToggle ? (
            <FilterOptions>
              <CategoryTitle>카테고리</CategoryTitle>
              <CategoryCheckBox>
                {CATEGORY_LIST.map((item) => {
                  return (
                    <CategoryLabel key={item.id}>
                      <input
                        type="checkbox"
                        // 이때 value값으로 data를 지정해준다.
                        value={item.data}
                        // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                        onChange={(e) => {
                          onCheckedElement(e.target.checked, e.target.value);
                        }}
                        // 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                        checked={checkedList.includes(item.data) ? true : false}
                      />
                      <div>{item.data}</div>
                    </CategoryLabel>
                  );
                })}
              </CategoryCheckBox>
            </FilterOptions>
          ) : null}

          {/* 데이터 없을때 장소가 없습니다 띄우기 */}
          <RecommendTitle>이런 장소는 어떠세요?</RecommendTitle>
          <SpotsWrapper>
            {item.length === 0 ? (
              <NothingSearched>
                <img src={nothingIcon} style={{ marginBottom: "10px" }} />
                해당하는 장소가 없습니다
              </NothingSearched>
            ) : (
              item.map((itemdata, index) => {
                return (
                  <ItemCard
                    key={index}
                    id={itemdata.id}
                    ImageURL={itemdata.rep_pic}
                    StoreName={itemdata.place_name}
                    StoreType={itemdata.category}
                    open_hours={itemdata.open_hours}
                    Address={itemdata.address}
                    place_review={itemdata.place_review}
                    place_like={itemdata.place_like}
                  />
                );
              })
            )}

            <Pagination
              total={pagecount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            {isSasmAdmin ? (
              <AdminButton
                style={{ margin: "auto", width: "20%" }}
                onClick={() => {
                  navigate("/admin/place");
                }}
              >
                장소 생성
              </AdminButton>
            ) : (
              <></>
            )}
          </SpotsWrapper>
        </SpotListSection>
      )}
    </>
  );
};
export default SpotList;
