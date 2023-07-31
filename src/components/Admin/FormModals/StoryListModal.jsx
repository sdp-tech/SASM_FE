import React, { Dispatch, SetStateAction, useEffect, useState, useMemo, useRef, useCallback } from "react";
import styled from "styled-components";
import Request from "../../../functions/common/Request";
import { useNavigate, useLocation } from "react-router-dom";
import {useCookies} from "react-cookie";
import qs from "qs";

const StorySelectButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding:0;
  position: absolute;
  right: 0;
  background-color: #FFF;
`
const CardSection = styled.div`

`

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-color:rgba(112, 112, 112, 0.15);
  border-bottom-width: 1px;
  width: 45vw;
  height: 30vh;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`
const TextBox = styled.div`
  color: #000;
  position: relative;
  width: 50%;
  height: 75%;
`
const View = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 70%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-top: 5px;
`
const MoreView = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
`

export default function StoryListModal({ selectedStory, setSelectedStory, item}) {

  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const handleSelectedStory = (id, rep_pic) => {
    if (selectedStory.filter(el => el.id == id).length > 0) {
      setSelectedStory(selectedStory.filter(el => el.id != id));
    }
    else {
      setSelectedStory([...selectedStory, { id: id, rep_pic: rep_pic }]);
    }
  }

  return (
    <View>
      <View>
        <View style={{ marginTop: 10}}>
          <CardSection>
            {item.map((info, index) => (
              <ItemCard>
                <img src={ info.rep_pic } style={{ width: 150, height: 150, margin: 'auto', marginRight: 20, position:"absolute", left:-20, borderRadius:15 }} />
                <TextBox>
                  <p style={{fontWeight:700, fontSize: 'px'}}>{info.place_name}</p>
                  <p style={{color: '#6C6C6C'}}>{info.title}</p>
                  <p style={{fontWeight:600}}>{info.category}</p>
                  <p style={{fontSize:'12px', fontWeight:600, color: '#6C6C6C',   paddingLeft: '1%', borderLeft: '2px solid #000000'}}>{info.semi_category}</p>
                  <p style={{fontSize:'14px', fontWeight:600, color: '#6C6C6C'}}>{info.preview}</p>
                  <MoreView style={{marginTop:'10px'}} onClick={()=>{window.open(`/story/${info.id}`)}}>더보기</MoreView>
                  <StorySelectButton style={{marginTop:'10px'}} onClick={()=>{handleSelectedStory(info.id, info.rep_pic)}}>스토리 선택</StorySelectButton>
                </TextBox>
              </ItemCard>
            ))}
          </CardSection>
        </View>
      </View>
    </View>
  )
}

