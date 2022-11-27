import React, { useEffect, useState } from 'react'
import Request from '../../functions/common/Request';
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import Map from './Map';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import SpotList from './SpotList';
import Pagination from '../common/Pagination';
import checkSasmAdmin from '../Admin/Common';
import AdminButton from '../Admin/components/AdminButton';

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 15px;
  margin-top: 15px;
  overflow : hidden;
`
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

export default function DataContainer({ Location}) {

    const [filterToggle, setFilterToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [isSasmAdmin, setIsSasmAdmin] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [tempSearch, setTempSearch] = useState('');
    const [checkedList, setCheckedList] = useState('');
    const [tempCheckedList, setTempCheckedList] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const request = new Request(cookies, localStorage, navigate);
    const [total, setTotal] = useState(0);
    const [state, setState] = useState({
        loading: false,
        ItemList: [],
        MapList: [],
    });
    const [temp ,setTemp] = useState({
        center: {
          lat: 37.551229,
          lng: 126.988205,
        },
        zoom: 13,
      });
    const [searchHere, setSearchHere] = useState({
        center: {
            lat: Location.latitude,
            lng: Location.longitude,
          },
          zoom: 13,
    });
    const params = useParams();
    // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, item) => {
        if (checked) {
            setTempCheckedList([...tempCheckedList, item]);
        } else if (!checked) {
            setTempCheckedList(tempCheckedList.filter((el) => el !== item));
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
        setTempSearch(e.target.value);
    };
    const handleSearchToggle = async (e) => {
        setPage(1);
        if (e) {
            e.preventDefault();
        } //초기화 방지
        setSearchToggle(true);
        setLoading(true);

        let headerValue;
        if (token === null || undefined) {
            headerValue = `No Auth`;
        } else {
            headerValue = `Bearer ${token}`;
        }
        if (tempSearch === null || tempSearch === "") {
            //검색어 없을 경우 전체 리스트 반환
            setSearch('');
        } else {
            //검색어 있는 경우
            setSearch(tempSearch);
        }
        setFilterToggle(false);
        setCheckedList(tempCheckedList);
        setLoading(false);
        if(params.place) {
            navigate('/map');
        }
    };
    //admin 여부 체크
    useEffect(()=>{
        checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
    },[])
    //page, 검색어, 체크리스트 변경시 작동
    useEffect(() => {
        document.getElementById('wrapper').scrollTo(0,0);
        getItem(searchHere.center, page, search, checkedList);
    }, [searchHere,page, search, checkedList, params]);
    //초기 map 데이터 가져오기
    const getItem = async (location, page, search, checkedList) => {
        setLoading(true);
    let response;
    if(params.place) {
        response = await request.get("/places/place_search/", {
            left: location.lat, //현재 위치
            right: location.lng, //현재 위치
            page: page,
            search: params.place,
            filter: checkedList
        }, null);
    }
    else {
        response = await request.get("/places/place_search/", {
            left: location.lat, //현재 위치
            right: location.lng, //현재 위치
            page: page,
            search: search,
            filter: checkedList
        }, null);
    }
        console.log(response.data.data.results)
        setState({
            loading: true,
            MapList: response.data.data.results,
        });
        setTotal(response.data.data.count);
        setLoading(false);
    };
    return (
        <>
            <ListWrapper>
                <SearchFilterBar>
                    <SearchBar
                        search={tempSearch}
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
                                            checked={tempCheckedList.includes(item.data) ? true : false}
                                        />
                                        <div>{item.data}</div>
                                    </CategoryLabel>
                                );
                            })}
                        </CategoryCheckBox>
                    </FilterOptions>
                ) : null}
                <SpotList mapList={state.MapList} setTemp={setTemp}></SpotList>
                <Pagination
                    total={total}
                    limit={20}
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
            </ListWrapper>
            <Map mapList={state.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage}/></>
    )
}
