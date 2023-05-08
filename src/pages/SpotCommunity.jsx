import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CommunityDetail from '../components/Community/CommunityDetail';
import Request from '../functions/common/Request';
import CommunityList from '../components/Community/CommunityList';
import Loading from '../components/common/Loading';

const CommunitySection = styled.div`
  height: calc(100vh - 64px);
  display: grid;
  grid-template-areas: 
    "title header"
    "menu content";
  grid-template-rows: 0.2fr 0.8fr;
  grid-template-columns: 0.25fr 0.75fr;
`
const Menu = styled.div`
  grid-area: menu;
`
const Content = styled.div`
  gird-area: content;
  padding: 3vh 3vw;
  position: relative;
`
const BackButton = styled(NavLink)`
  font-size: 1.2rem;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
`
const Board = styled.div`
  grid-area: header;
  font-size: 2rem;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MenuTitle = styled.div`
  grid-area: title;
  font-Size: 1.5rem;
  text-align: center;
  min-height: calc((100vh - 64px) * 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledLink = styled(NavLink)`
  display: 'block';
  textDecoration: 'none';
  width: '100%';
  padding: '3%';
  textAlign: 'center';
  color: #000000;
  &.selected {
    color: #FFFFFF;
    background-color: #44ADF7;
	}
`
export default function SpotCommunity() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const request = new Request(cookies, localStorage, navigate);
  const [format, setFormat] = useState();
  const getFormat = async () => {
    const response = await request.get(`/community/boards/${params.board}/`);
    setFormat(response.data);
    setLoading(false);
  }
  const ActiveStyle = (isActive) => {
    
  }
  useEffect(() => {
    getFormat();
  }, [params.board]);
  return (
    <>
      {loading ?
        <Loading /> : <CommunitySection>
          <MenuTitle>
            Community
          </MenuTitle>
          <Menu>
            <NavLink style={({ isActive }) => ({ color: isActive ? '#FFFFFF' : '#000000', display: 'block', textDecoration: 'none', width: '100%', padding: '3%', textAlign: 'center', backgroundColor: isActive ? '#44ADF7' : '#FFFFFF' })} to={`/community/1?page=1`}>자유게시판</NavLink>
            <NavLink style={({ isActive }) => ({ color: isActive ? '#FFFFFF' : '#000000', display: 'block', textDecoration: 'none', width: '100%', padding: '3%', textAlign: 'center', backgroundColor: isActive ? '#44ADF7' : '#FFFFFF', borderTop: '1px rgba(0,0,0,0.5) solid' })} to={`/community/2?page=1`}>장소 추천</NavLink>
            <NavLink style={({ isActive }) => ({ color: isActive ? '#FFFFFF' : '#000000', display: 'block', textDecoration: 'none', width: '100%', padding: '3%', textAlign: 'center', backgroundColor: isActive ? '#44ADF7' : '#FFFFFF', borderTop: '1px rgba(0,0,0,0.5) solid' })} to={`/community/3?page=1`}>홍보게시판</NavLink>
            <NavLink style={({ isActive }) => ({ color: isActive ? '#FFFFFF' : '#000000', display: 'block', textDecoration: 'none', width: '100%', padding: '3%', textAlign: 'center', backgroundColor: isActive ? '#44ADF7' : '#FFFFFF', borderTop: '1px rgba(0,0,0,0.5) solid' })} to={`/community/4?page=1`}>모임게시판</NavLink>
          </Menu>
          <Board>
            {
              {
                "1": "자유게시판",
                "2": "장소 추천",
                "3": "홍보게시판",
                "4": "모임게시판"
              }[params.board]
            }
            {
              params.id && <BackButton to={`/community/${params.board}?page=1`}>목록 보기</BackButton>
            }
          </Board>
          <Content>
            {
              params.id ?
                <CommunityDetail format={format} board={params.board} id={params.id}></CommunityDetail>
                :
                <CommunityList format={format} board={params.board}></CommunityList>
            }
          </Content>
        </CommunitySection>

      }
    </>
  )
}