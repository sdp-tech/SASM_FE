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
  
  const handlePageBackToRoot = () => {
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
      sx={{ flexGrow: 1, height: "64px",  minHeight: "64px", maxHeight: "64px", width: '100%', position:'fixed'}}
    >
      <AppBar>
        <Toolbar>

          {/* 햄버거 메뉴 */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* 타이틀(페이지 이름) */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={handlePageBackToRoot}
          >
            SASM
          </Typography>

          {/* 중간 공백용 */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 아이콘 3개 모음 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            {/* 메일함 아이콘 */}
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            
            {/* 공지함 아이콘 */}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* 프로필 아이콘 */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 프로필 클릭 시 anchor값 설정되서 프로필 메뉴 팝업 */}
      {renderMenu}
    </Box>
  );
}