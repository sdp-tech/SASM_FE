import React, { useEffect, useState } from 'react'
import Request from '../../functions/common/Request';
import { useNavigate, useParams } from "react-router";
import { useLocation, useSearchParams } from "react-router-dom";
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
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    width: 95%;  
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 90%;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    width: 90%;
  }
  @media screen and (min-width: 1200px) {
    width: 95%;
  }
`;
const FilterOptions = styled.div`
  box-sizing: border-box;
  display: flex;
  margin : 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;  
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    
    width: 100%;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    width: 100%;
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
  }
`;

export default function DataContainer({ Location }) {
    const [categoryNum, setCategoryNum] = useState(0);
    const location = useLocation();
    const queryString = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
    const [isSasmAdmin, setIsSasmAdmin] = useState(false);
    //tempSearch, tempCheckedList 검색 버튼을 누르기 전에 적용 방지 
    const [search, setSearch] = useState('');
    const [tempSearch, setTempSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [checkedList, setCheckedList] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const request = Request(navigate);
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

    // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, item) => {
        checked ? setCheckedList([...checkedList, item]) : setCheckedList(checkedList.filter((el) => el !== item));
    };

    const onChangeSearch = (event) => {
        setTempSearch(event.target.value);
    };

    const handleSearchToggle = (event) => {
        if (event) {
            //초기화 방지
            event.preventDefault();
        }        setSearch(tempSearch);
    };

    //초기 map 데이터 가져오기
    const getList = async () => {
        const queryParams = {
            left: location.state?.lat || searchHere.lat,
            right: location.state?.lng || searchHere.lng,
            page: queryString.page,
            search: location.state?.name || localStorage.getItem("place_name") || search.trim(),
            filter: checkedList
        }    
        const response_list = await request.get("/places/place_search/", { 
                left: queryParams.left, //현재 위치
                right: queryParams.right, //현재 위치
                page: queryParams.page,
                search: queryParams.search, // gotomap으로 넘어왔을 때
                filter: queryParams.filter
            });

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
        const urlParams = {
            page: queryString.page
        }
        if (search) urlParams.search = search;
        if (location.state?.name) urlParams.search = location.state.name;
        if (checkedList) urlParams.checkedList = checkedList;
        setSearchParams(urlParams);
    }; 

    //admin 여부 체크
    useEffect(() => {
        checkSasmAdmin(token, setLoading, navigate).then((result) => setIsSasmAdmin(result));
    }, []);
    
    useEffect(() => {
        document.getElementById('wrapper').scrollTo(0, 0);
    }, [searchHere, checkedList, queryString.page]);

    useEffect(() => {
        queryString.page = 1
    },[checkedList]);

    //page, 검색어, 체크리스트 변경시 작동
    useEffect(() => {
        setCategoryNum(checkedList.length);
        if (search) {
            setCategoryNum(7);
        }
        getList();
    }, [searchHere, search, checkedList, queryString.page]);

    return (
        <>
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
                        style={{ margin: "auto", width: "20%", fontSize: "13px", fontFamily: "pretendard", fontWeight: 500}}
                        onClick={() => {
                            navigate("/admin/place");
                        }}
                    >
                        장소 생성
                    </AdminButton>
                }
            </ListWrapper>
            <Map categoryNum={categoryNum} placeData={placeData.MapList} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} />
        </>
    )
}