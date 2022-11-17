import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Request from '../../functions/common/Request';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Map from './Map';

export default function Map_Container({Location, page}) {
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const request = new Request(cookies, localStorage, navigate);
    const [state, setState] = useState({
        loading: false,
        ItemList: [],
        MapList: [],
    });
    useEffect(() => {
        console.log(Location, page);
        getItem(Location, page);
      }, [page]);
    //초기 map 데이터 가져오기
    const getItem = async (location, page) => {
        setLoading(true);
        const response = await request.get("/places/place_search/", {
            left: location.latitude, //현재 위치
            right: location.longitude, //현재 위치
            page: page
        }, null);
        console.log("data?", response.data.data.results);
        setState({
            loading: true,
            MapList: response.data.data.results,
        });
        setLoading(false);

    };
    return (
        <Map mapList={state.MapList} />
    )
}
