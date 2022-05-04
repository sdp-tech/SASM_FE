import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styled from 'styled-components';



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

export default function Navibar() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handlePageRedirection = () => {
    window.location.href = '/auth';
  }
  
  const handlePageGoToIntro = () => {
    window.location.href = '/';
  }
  const handlePageGoToHome = () => {
    window.location.href = '/home';
  }
  const handlePageGoToStory = () => {
    window.location.href = '/story';
  }
  const handlePageGoToAuth = () => {
    window.location.href = '/auth';
  }
  const handlePageGoToAbout = () => {
    window.location.href = '/';
  }
  // 프로필 아이콘 클릭시 팝업 메뉴 모달
  const menuId = 'menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handlePageRedirection}>Login</MenuItem>
      <MenuItem onClick={handlePageRedirection}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box 
      sx={{  flexGrow: 1, height: "204px",  minHeight: "204px", maxHeight: "204px", width: '100%', position:'fixed'}}
    >
      <AppBar>
        <Toolbar>

          {/* 로고 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              onClick={handlePageGoToIntro}
            >
              SASM
            </Typography>
        </Box>

         {/* 메뉴 */}
        <NavBox sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
              onClick={handlePageGoToHome}
            >
              MAP
            </Typography>

        
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
              onClick={handlePageGoToStory}
            >
              STORY
            </Typography>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToAuth}
            >
              MY PAGE____
            </Typography> */}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
              onClick={handlePageGoToAbout}
            >
              ABOUT
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
              onClick={handlePageGoToAbout}
            >
              MY PICK
            </Typography>
          </NavBox>
          
          {/* 중간 공백용 */}
          <Box sx={{ flexGrow: 1 }} />

        </Toolbar>
      </AppBar>

      {/* 프로필 클릭 시 anchor값 설정되서 프로필 메뉴 팝업 */}
      {renderMenu}
    </Box>
  );
}