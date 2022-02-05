import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";

import Navibar from '../components/Home/Navibar';
import SpotList from '../components/Home/SpotList';
import Map from '../components/Home/Map';

const SpotMapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 0;
`;

const Home = () => {
  
  const [state, setState] = useState({
    loading: false,
    ItemList: [] // 처음 Itemlist는 있는 상태로 기획 []
  });

  const loadItem = async () => {
    // Json Data 불러오기
    axios // axios를 이용해
      .get("./SearchJson.json") // json을 가져온다음
      .then(({ data }) => {
        // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
        setState({
          loading: true, // load되었으니 true,
          ItemList: data.Item // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
        });
      })
      .catch(e => {
        // json이 로드되지않은 시간엔
        console.error(e); // 에러표시
        setState({
          loading: false // 이때는 load 가 false 유지
        });
      });
  };

  loadItem();

  return (
    <>
    <SpotMapWrapper>
      <Map/>
    </SpotMapWrapper>
    <Navibar/>
    <SpotList Itemcard={state.ItemList}/>
    </>
  );
};

export default Home;