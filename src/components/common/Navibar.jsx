import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const NavibarSection = styled.div`
background-color: red;
grid-area: navibar;
`
const NavBox = styled(Box)`
  // background : green;
  color: black;
  // height: 48px;
  // height: 70px;
  width:1000px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  margin-left : 400px;
  // border:1px solid red;
`;

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
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      onClick={()=>handlePageRedirection(title)}
    >
      {title}
    </Typography>
  )
}

export default function Navibar() {

  return (
    <NavibarSection>
      <Box 
        sx={{ flexGrow: 1, height: "100%",  minHeight: "204px", width: '100%', position:'fixed'}}
        >
        <AppBar>
          <Toolbar>
            {/* 로고 */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <PageTitle title='SASM'></PageTitle>
            </Box>

            {/* 메뉴 */}
            <NavBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <PageTitle title='MAP'></PageTitle>
              <PageTitle title='STORY'></PageTitle>
              <PageTitle title='MY PICK'></PageTitle>
            </NavBox>
            
            {/* 중간 공백용 */}
            <Box sx={{ flexGrow: 1 }} />
            
            {/* 로그인 및 회원가입 */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <PageTitle title='LOG IN'></PageTitle>
              <PageTitle title='JOIN'></PageTitle>
            </Box>

          </Toolbar>
        </AppBar>
      </Box>
    </NavibarSection>
  );
}