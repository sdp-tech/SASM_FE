
import * as React from 'react';
import styled from "styled-components";
// import Button from '@mui/material/Button';

const Wrapper = styled.div` /*박스*/
background: white;
width: 800px;
// height: 800px;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); /* 그림자 */ 
margin: 0 auto; /* 페이지 중앙 정렬 */
margin-top: 4rem;
`;

const Image = styled.div`
width: 800px;
height:200px;
font-size: 2.5rem;
text-align: center;
font-weight: 100;
background: #D3D3D3;
color: white;
margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const MainTitleBox = styled.div`
// border: 1px solid RED;
width: 800px;
height:50px;
font-size: 2.5rem;
font-weight: 900;
color: #000000;
margin: 0 auto; /* 페이지 중앙 정렬 */
display:flex;

`;

const MainTitle = styled.div`
// border: 1px solid RED;
width: 800px;
height:50px;
font-size: 2.5rem;
font-weight: 700;
color: #000000;
display:flex;

`;

const SubTitle = styled.div`
padding-top: 1rem;
width: 800px;
height:50px;
font-size: 1rem;
font-weight: 500;
color: #000000;
margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const Content = styled.div`
padding-top: 1rem;
width: 800px;
font-size: 1rem;
font-weight: 500;
color: #000000;
margin: 0 auto; /* 페이지 중앙 정렬 */
`;

const ButtonDiv = styled.div`
// border: 1px solid RED;
height: 30px;
width: 300px;
display:flex;
justify-content : flex-end;
align-items:flex-end;
margin:7px;
`;

const Button = styled.button`
background-color: #FCF16E;
padding: 0px 13px;
font-size: 1rem;
font-weight: 800;
color: #000000;
border-radius:5px;
border-color: #FCF16E;
justify-content : flex-end;
`;

const MapButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#000000',
    padding: '0 30px',
  });


const BlogContent = (  ) => {

    return (
        
        <>
            <Wrapper>
                <Image><h3> image </h3></Image>
                <MainTitleBox>
                    <MainTitle>(제목)..마음을 돌보는 </MainTitle>
                    <ButtonDiv>
                        <Button>Go To Map</Button>
                    </ButtonDiv>
                </MainTitleBox>
                <SubTitle>(장소이름)..[비건식당] 칙피스</SubTitle>
                <Content>(내용)..코로나19 장기화로 해외 및 국내 여행이 어려워진 시기에 향수와 갈증을 느끼는 사람이 늘면서 여행을 못 간 아쉬움을 달래 줄 한때 추억을 떠올릴 수 있는 장소가 주목받고 있다. 이에 파리, 이태리, 발리 등 나라별 도시를 모티브로 전개한 카페 4곳을 소개한다.
                <br/><br/>
#드로우지 

강남 한복판 파리 감성을 물씬 풍기는 드로우지는 이름처럼 나른한 오후의 분위기를 선보이는 뷰 맛집이다. 프랑스 파리 지역을 모티브로 한 내부는 따뜻한 햇살과 어우러져 마치 현지 길거리를 거니는 듯한 느낌을 자아낸다.

특히 잔디가 넓게 깔린 공간을 통해 피크닉을 즐길 수 있다는 점에서 프랑스 노천카페를 떠올리게 한다. 이는 방문객들에게 색다른 경험을 제공할뿐더러 애견 동반 또한 가능해 도심을 벗어나기 힘든 사람들에게 기분 좋은 힐링을 선사할 희소식이다.
<br/><br/>
#웨이크앤베이크

도산 공원 한가운데 위치한 웨이크앤베이크는 모래해변 앞에 있을 법한 카페 외관을 자랑한다. 입구에는 이탈리아 남부 도시 이름이 쓰인 우드 팻말이 세워져 있으며 식물과 화이트, 우드 톤의 심플하고 모던한 공간이 특징인 내부는 이태리 휴양지를 연상케 한다.

또한 2층 창가 테이블은 창문을 통해 들어오는 햇빛과 식물 등이 자연스럽게 어우러져 숲속 정취를 고스란히 느낄 수 있다. 이에 사전 예약 방식을 진행할 정도로 큰 인기를 끌고 있다.</Content>
            </Wrapper>
            
        </>
        
    );
}

export default BlogContent;

