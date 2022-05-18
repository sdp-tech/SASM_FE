import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import logo from '../../assets/img/logo.png';

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
          <PageTitle title='LOG IN'></PageTitle>
          <div style={{padding: '1%'}}>|</div>
          <PageTitle title='JOIN'></PageTitle>
        </AuthBox>
      </Bar>
    </NavibarSection>
  );

  // return (
  //   <NavibarSection>
  //     <Box 
  //       sx={{ flexGrow: 1, height: "100%",  minHeight: "204px", width: '100%', position:'absolute'}}
  //       >
  //       <AppBar>
  //         <Toolbar>
  //           {/* 로고 */}
  //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  //             <PageTitle title='SASM'></PageTitle>
  //           </Box>

  //           {/* 메뉴 */}
  //           <NavBox sx={{ display: { xs: 'none', md: 'flex' } }}>
  //             <PageTitle title='MAP'></PageTitle>
  //             <PageTitle title='STORY'></PageTitle>
  //             <PageTitle title='MY PICK'></PageTitle>
  //           </NavBox>
            
  //           {/* 중간 공백용 */}
  //           <Box sx={{ flexGrow: 1 }} />
            
  //           {/* 로그인 및 회원가입 */}
  //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  //             <PageTitle title='LOG IN'></PageTitle>
  //             <PageTitle title='JOIN'></PageTitle>
  //           </Box>

  //         </Toolbar>
  //       </AppBar>
  //     </Box>
  //   </NavibarSection>
  // );
}