import React, { useEffect, useState } from 'react'
import Request from '../../functions/common/Request';
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Map from './Map';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import SpotList from './SpotList';
import Pagination from '../common/Pagination';
import checkSasmAdmin from '../Admin/Common';
import AdminButton from '../Admin/components/AdminButton';
import SearchWhite from '../../assets/img/Map/Search_white.svg';
import CategorySelector from '../common/Category';
import { Pc, Tablet, Mobile } from "../../device";
import qs from 'qs';

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  overflow : hidden;
  @media screen and (min-width: 769px) {
  }
`
const SearchFilterBar = styled.div`
  // background-color: red;
  margin : 0 auto;
  width: 95%;
  box-sizing: border-box;
`;
const FilterOptions = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
`;

export default function DataContainer({ Location }) {
    const [categoryNum, setCategoryNum] = useState(0);
    const location = useLocation();
    const queryString = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
    const [detail, setDetail] = useState({});
    const [like, setLike] = useState(false);
    const [isSasmAdmin, setIsSasmAdmin] = useState(false);
    //tempSearch, tempCheckedList 검색 버튼을 누르기 전에 적용 방지 
    const [search, setSearch] = useState('');
    const [tempSearch, setTempSearch] = useState('');
    const [checkedList, setCheckedList] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const request = new Request(cookies, localStorage, navigate);
    const [placeData, setPlaceData] = useState({
        total: 0,
        MapList: [],
    });
    //지도의 현재 위치 고정
    const [temp, setTemp] = useState({
        lat: 37.551229,
        lng: 126.988205,
    });
    //현재 위치에서 검색 
    const [searchHere, setSearchHere] = useState({
        lat: Location.latitude,
        lng: Location.longitude,
    });
    const params = useParams();
    // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, item) => {
        navigate('/map?page=1');
        if (checked) {
            setCheckedList([...checkedList, item]);
        } else if (!checked) {
            setCheckedList(checkedList.filter((el) => el !== item));
        }
    };

    const onChangeSearch = (event) => {
        setTempSearch(event.target.value);
    };
    const handleSearchToggle = (event) => {
        if (event) {
            //초기화 방지
            event.preventDefault();
        }
        if(tempSearch === '') {
            navigate('/map?page=1');
            if (location.state?.name) {
                window.location.reload();
            }
        }
        else {
            navigate(`/map?page=1&search=${tempSearch}`);
        }
        setSearch(tempSearch);
        if (params.place) {
            navigate('/map');
        }
    };
    //admin 여부 체크
    useEffect(() => {
        checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
    }, [])
    //page, 검색어, 체크리스트 변경시 작동
    useEffect(() => {
        setCategoryNum(checkedList.length);
        if (search != "") {
            setCategoryNum(7);
        }
        document.getElementById('wrapper').scrollTo(0, 0);
        getList();
    }, [searchHere, search, checkedList, queryString.page]);
    //초기 map 데이터 가져오기
    const getList = async () => {
        let response_list;
        if(location.state?.name) {
            response_list = await request.get("/places/place_search/", {
                left: searchHere.lat, //현재 위치
                right: searchHere.lng, //현재 위치
                page: queryString.page,
                search: location.state.name, // gotomap으로 넘어왔을 때
                filter: checkedList
            });
        }
        else{
            response_list = await request.get("/places/place_search/", {
                left: searchHere.lat, //현재 위치
                right: searchHere.lng, //현재 위치
                page: queryString.page,
                search: search,
                filter: checkedList
        });
    }
        setPlaceData({
            total: response_list.data.data.count,
            MapList: response_list.data.data.results,
        });
        if (checkedList.length != 0 || search != "") {
            setTemp({
                lat: response_list.data.data.results[0].latitude,
                lng: response_list.data.data.results[0].longitude,
            });
        }
    }; 
    return (
        <>
            <Mobile><Map categoryNum={categoryNum} placeData={placeData.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere}/></Mobile>
            <ListWrapper>
                <SearchFilterBar>
                    <SearchBar
                        search={tempSearch}
                        onChangeSearch={onChangeSearch}
                        handleSearchToggle={handleSearchToggle}
                        placeholder="지속가능한 장소를 검색해보세요!"
                        searchIcon={SearchWhite}
                        background="#44ADF7"
                        color="white"
                    />
                </SearchFilterBar>
                <FilterOptions>
                    <CategorySelector checkedList={checkedList} onCheckedElement={onCheckedElement} />
                </FilterOptions>
                <SpotList categoryNum={categoryNum} placeData={placeData.MapList} setTemp={setTemp}></SpotList>
                <Pagination total={placeData.total} limit={20} page={queryString.page}/>
                {
                    isSasmAdmin &&
                    <AdminButton
                        style={{ margin: "auto", width: "20%" }}
                        onClick={() => {
                            navigate("/admin/place");
                        }}
                    >
                        장소 생성
                    </AdminButton>
                }
            </ListWrapper>
            <Pc><Map categoryNum={categoryNum} placeData={placeData.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} /></Pc>
            <Tablet><Map categoryNum={categoryNum} placeData={placeData.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} /></Tablet>
        </>
    )
}