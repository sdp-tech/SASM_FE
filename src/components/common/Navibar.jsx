import React, { useContext } from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/sasm_logo.svg';
import { LoginContext } from '../../contexts/LoginContexts';

const NavibarSection = styled.div`
  position: relative;
  grid-area: navibar;
`
const Bar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 4px 4px -4px black;
  z-index: 4;
`
const LogoBox = styled.div`
  height: 100%;
  width: 20%;
  // background-color: red;
  display: flex;
  align-items: center;
`
const Logo = styled.img`
  display: block;
  width: auto;
  height: 80%;
  position: absolute;
  left: 5%;
`
const PagesBox = styled.div`
  position: absolute;
  height: 100%;
  width: 40%;
  // background-color: yellow;
  left: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const AuthBox = styled.div`
  position: absolute;
  height: 100%;
  width: 10%;
  // background-color: green;
  right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
`


// 페이지 이동을 위한 정보와 기능
const urlHash = {
  'SASM': '',
  'MAP': 'map',
  'STORY': 'story',
  'MY PICK': 'mypage',
  'LOG IN': 'auth',
  'JOIN': 'auth/register'
}
const handlePageRedirection = (title) => {
  window.location.href = '/' + urlHash[title];
}

// 페이지 이름 받아서 해당 페이지로 이동하는 링크 타이틀 컴포넌트
const PageTitle = ({title}) => {
  return (
    <div style={{fontSize: '150%'}}
      onClick={()=>handlePageRedirection(title)}
    >
      {title}
    </div>
  )
}

export default function Navibar() {

  const [login, setLogin] = useContext(LoginContext)

  return (
    <NavibarSection>
      <Bar>
        {/* 로고 */}
        <LogoBox>
          <Logo src={logo} onClick={()=>handlePageRedirection('SASM')}></Logo>
        </LogoBox>

        {/* 메뉴 */}
        <PagesBox>
          <PageTitle title='MAP'></PageTitle>
          <PageTitle title='STORY'></PageTitle>
          <PageTitle title='MY PICK'></PageTitle>
        </PagesBox>
        
        
        {/* 로그인 및 회원가입 */}
        <AuthBox>
          {
            !login.loggedIn ? 
              <>
                <PageTitle title='LOG IN'></PageTitle>
                <div style={{padding: '5%'}}>|</div>
                <PageTitle title='JOIN'></PageTitle>
              </>
            :
              <>
                <PageTitle title="SDP님"></PageTitle>
                <div style={{padding: '5%'}}>|</div>
                <PageTitle title='LOG OUT'></PageTitle>
              </>
          }
        </AuthBox>
      </Bar>
    </NavibarSection>
  );
}