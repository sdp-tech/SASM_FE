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
import SearchWhite from '../../assets/img/Map/Search_white.svg';
import CategorySelector, { CATEGORY_LIST, MatchCategory } from '../common/Category'
import { Pc, Tablet, Mobile } from "../../device"

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 15px;
  overflow : hidden;
  @media screen and (min-width: 769px) {
    margin-left: 15px;
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

    const [filterToggle, setFilterToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [isSasmAdmin, setIsSasmAdmin] = useState(false);
    const [page, setPage] = useState(1);
    //tempSearch, tempCheckedList 검색 버튼을 누르기 전에 적용 방지 
    const [search, setSearch] = useState('');
    const [tempSearch, setTempSearch] = useState('');
    const [checkedList, setCheckedList] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const request = new Request(cookies, localStorage, navigate);
    const [total, setTotal] = useState(0);
    const [zoom, setZoom] = useState(14);
    const [state, setState] = useState({
        loading: false,
        ItemList: [],
        MapList: [],
    });
    //지도의 현재 위치 고정
    const [temp, setTemp] = useState({
        center: {
            lat: 37.551229,
            lng: 126.988205,
        },
        zoom: 14,
    });
    const [searchHere, setSearchHere] = useState({
        center: {
            lat: Location.latitude,
            lng: Location.longitude,
        },
        zoom: 14,
    });
    const params = useParams();
    // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, item) => {
        if (checked) {
            setCheckedList([...checkedList, item]);
        } else if (!checked) {
            setCheckedList(checkedList.filter((el) => el !== item));
        }
    };

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
        setLoading(false);
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
        document.getElementById('wrapper').scrollTo(0, 0);
        getItem(searchHere.center, page, search, checkedList);
    }, [searchHere, page, search, checkedList, params]);
    //초기 map 데이터 가져오기
    const getItem = async (location, page, search, checkedList) => {
        setLoading(true);
        let response;
        if (params.place) {
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
        setState({
            loading: true,
            MapList: response.data.data.results,
        });
        setTotal(response.data.data.count);
        setLoading(false);
    };
    return (
        <>
            <Mobile><Map mapList={state.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage} zoom={zoom} setZoom={setZoom} /></Mobile>
            <ListWrapper>
                <SearchFilterBar>
                    <SearchBar
                        search={tempSearch}
                        onChangeSearch={onChangeSearch}
                        handleFilterToggle={handleFilterToggle}
                        handleSearchToggle={handleSearchToggle}
                        placeholder="지속가능한 장소를 검색해보세요!"
                        searchIcon={SearchWhite}
                        background="#44ADF7"
                        color="white"
                    />
                </SearchFilterBar>
                <FilterOptions>
                    <CategorySelector checkedList={checkedList} onCheckedElement={onCheckedElement}/>
                </FilterOptions>

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
            <Pc><Map mapList={state.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage} zoom={zoom} setZoom={setZoom} /></Pc>
            <Tablet><Map mapList={state.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage} zoom={zoom} setZoom={setZoom} /></Tablet>
        </>
    )
}