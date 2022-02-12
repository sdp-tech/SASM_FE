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
    window.location.href = '/about';
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
      sx={{ flexGrow: 1, height: "64px",  minHeight: "64px", maxHeight: "64px", width: '100%', position:'fixed'}}
    >
      <AppBar>
        <Toolbar>

          {/* 타이틀(페이지 이름) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
              }}
              // onClick={handlePageBackToIntro}
            >
              SASM_____
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToIntro}
            >
              HOME____
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToHome}
            >
              MAP____
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToStory}
            >
              STORY____
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToAuth}
            >
              MY PAGE____
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handlePageGoToAbout}
            >
              ABOUT____
            </Typography>
          </Box>
          
          {/* 중간 공백용 */}
          <Box sx={{ flexGrow: 1 }} />

        </Toolbar>
      </AppBar>

      {/* 프로필 클릭 시 anchor값 설정되서 프로필 메뉴 팝업 */}
      {renderMenu}
    </Box>
  );
}